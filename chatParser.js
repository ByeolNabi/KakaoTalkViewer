class chatDataStructor {
  constructor() {
    this.chatTXT;
    this.imageNameList;
    this.dataAbspath;
  }

  /**
   * 이 함수를 부르면 사용가능한 데이터가 생길겁니다.
   *
   * @param {string} folderPath - 카카오톡 채팅방 zip 압축해제 폴더의 경로
   * @returns {object[]} 사용가능한 데이터구조로 변형한 채팅 데이터를 리턴합니다.
   */
  start(folderPath) {
    this.dataAbspath = folderPath;
    let { chatFilePath, imageNameList } = dictionaryFileLister(folderPath);

    let parsedChatData = chatParser(chatFilePath); // chat Info 저장하기
    let parsedImageData = imagePathParser(imageNameList); // image Info 저장하기

    let resultData = chatDataMerger(parsedChatData, parsedImageData); // image와 chat 데이터 연동하기
    return resultData;
  }

  /**
   * 폴더에 있는 파일이름들을 분석해줍니다.
   *
   * @param {string} folderPath - 카카오톡 채팅방 zip 압축해제 폴더의 경로
   * @returns {{ chatFilePath: string , imageNameList: string[] }} 파일 이름들 분류 데이터
   */
  dictionaryFileLister(folderPath) {
    // 폴더 리스트 쭈루룩 뽑아와서 image들 append하고 날짜 데이터 따로 저장하고 txt파일 찾아서 경로 저장하기
    return { chatFilePath: "", imageNameList: "" };
  }

  /**
   * chat txt를 구조화된 chat data로 변경해줍니다. (이미지 경로 포함x)
   *
   * @param {string} chatFilePath - chat backup txt file path
   * @returns {Array  <{
   *   timestamp: "2024-07-22T14:36:00.000Z",
   *   sender: string,
   *   message: string,
   *   imageInfo: {
   *     imageTF: boolean,
   *     imagePath: string[],
   *     imageQuantity: number
   *   }
   * }>} 구조화된 chat 데이터
   */
  chatParser(chatFilePath) {
    // 영차영차 파싱하자

    return parsedChatData;
  }

  /**
   * image파일들의 이름을 분석해서 날짜 데이터를 추가로 저장합니다.
   *
   * @param {Array<string>} imageNameList - path list
   * @return {
   *
   * }
   */
  imagePathParser(imageNameList) {
    // 파싱을 편리를 위해서 image fileName만을 따로 받았음
    parsedImageData = [];
    for (let img_idx = 0; img_idx < imageNameList.length; ++img_idx) {
      imgDate = extractDateFromFilename(imageNameList[img_idx]);
      imageMETA = {
        path: this.dataAbspath + imageNameList[img_idx],
        timestamp: imgDate.toISOString(),
      };
      parsedImageData.push(imageMETA);
    }
    return parsedImageData;
  }

  /**
   * chat data에서 비워져있던 Image path를 날짜에 맞게 연결해줍니다.
   *
   */
  chatDataMerger(parsedChatData, parsedImageData) {
    // 사진이 필요한 채팅을 찾아내고 사진과 매핑해준다.
    // 첫 사진 날짜를 기준으로 뒷 채팅 기록들을 다 쳐낸다. ⛑️
    resultData = parsedChatData;
    imageFirstDate = parsedImageData[0].timestamp.slice(0, 10); // string timestamp에서 minute까지만 자른다.
    let chat_idx = 0;

    // 사진과 매핑할 채팅 시작위치 찾기
    for (; chat_idx < parsedChatData.length; ++chat_idx) {
      let chatDate = parsedChatData[chat_idx].timestamp.slice(0, 10);
      if (
        parsedChatData[chat_idx].imageInfo.imageTF &&
        imageFirstDate == chatDate
      ) {
        break;
      }
    }

    // 매핑 시작
    for (let image_idx; image_idx < parsedImageData.legnth; ++image_idx) {
      let imageDate = parsedImageData[image_idx].timestamp.slice(0, 10);
      for (; chat_idx < parsedChatData.length; ++chat_idx) {
        if (!parsedChatData[chat_idx].imageInfo.imageTF) {
          // 이미지가 없으면 다음 chat으로 넘기기
          continue;
        }
        let chatDate = parsedChatData[chat_idx].timestamp.slice(0, 10);
        if (imageDate == chatDate) {
          let img_cnt = parsedChatData[chat_idx].imageInfo.imageQuantity;
          while (img_cnt--) {
            // chat의 이미지 갯수만큼 chat의 img path에 push하기
            parsedChatData[chat_idx].imagePath.push(
              parsedImageData[image_idx++].path
            );
          }
        }
      }
    }

    return resultData;
  }
}

// util //
function extractDateFromFilename(filename) {
  // 정규식을 사용하여 YYYYMMDD_HHMM 형식을 추출합니다.
  const match = filename.match(/(\d{8})_(\d{4})/);

  if (match) {
    const [, dateStr, timeStr] = match;
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    const hour = timeStr.slice(0, 2);
    const minute = timeStr.slice(2, 4);

    // Date 객체 생성 (월은 0부터 시작하므로 1을 뺍니다)
    return new Date(year, month - 1, day, hour, minute);
  }

  return null; // 매치되지 않으면 null 반환
}