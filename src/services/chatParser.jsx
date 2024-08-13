export class chatDataParser {
  constructor() {
    this.chatTXT;
    this.imageNameList;
    this.dataAbspath;
  }

  /**
   * 폴더에 있는 파일이름들을 분석해줍니다.
   *
   * @param {string} folderPath - 카카오톡 채팅방 zip 압축해제 폴더의 경로
   * @returns {{ chatFilePath: string , imageNameList: string[] }} 파일 이름들 분류 데이터
   */
  dictionaryFileLister(fileList) {
    // 폴더 리스트 쭈루룩 뽑아와서 image들 append하고 날짜 데이터 따로 저장하고 txt파일 찾아서 경로 저장하기
    return {
      imageNameList: fileList.slice(0, fileList.length - 1),
    };
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
  chatParser(chatFile) {
    let parsedChatData = parseMessages(chatFile);

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
    let parsedImageData = [];
    for (let img_idx = 0; img_idx < imageNameList.length; ++img_idx) {
      let imgDate = extractDateFromFilename(imageNameList[img_idx]["name"]);
      let imageMETA = {
        path: img_idx,
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
    let resultData = parsedChatData;
    let imageFirstDate = parsedImageData[0].timestamp.slice(0, 16); // string timestamp에서 minute까지만 자른다.
    let chat_idx = 0;

    // 매핑 시작
    // 사진과 매핑할 채팅 시작위치 찾기
    for (; chat_idx < parsedChatData.length; ++chat_idx) {
      let chatDate = parsedChatData[chat_idx].timestamp.slice(0, 16);
      if (
        parsedChatData[chat_idx].imageInfo.imageTF &&
        imageFirstDate == chatDate
      ) {
        break;
      }
    }

    for (let image_idx = 0; image_idx < parsedImageData.length; ++image_idx) {
      let imageDate = parsedImageData[image_idx].timestamp.slice(0, 16);
      for (; chat_idx < parsedChatData.length; ++chat_idx) {
        if (!parsedChatData[chat_idx].imageInfo.imageTF) {
          // 이미지가 없으면 다음 chat으로 넘기기
          continue;
        }
        let chatDate = parsedChatData[chat_idx].timestamp.slice(0, 16);
        if (imageDate == chatDate) {
          console.log(`chat_idx : ${chat_idx} img_idx : ${image_idx}`);
          console.log(`사진 시간 : ${imageDate} 채팅 시간 : ${chatDate}`);
          let img_quan = parsedChatData[chat_idx].imageInfo.imageQuantity;
          while (img_quan--) {
            // chat의 이미지 갯수만큼 chat의 img path에 push하기
            parsedChatData[chat_idx].imageInfo.imagePath.push(
              parsedImageData[image_idx++].path
            );
          }
          console.log(parsedChatData[chat_idx]);
          ++chat_idx;
          --image_idx;
          break; // 이미지 다 넣었으면 다음 img찾으러 가자
        }
      }
    }

    return resultData;
  }

  /**
   * 이 함수를 부르면 사용가능한 데이터가 생길겁니다.
   *
   * @param {string} folderPath - 카카오톡 채팅방 zip 압축해제 폴더의 경로
   * @returns {object[]} 사용가능한 데이터구조로 변형한 채팅 데이터를 리턴합니다.
   */
  start(chatRaw, fileList) {
    let { imageNameList } = this.dictionaryFileLister(fileList);

    let parsedChatData = this.chatParser(chatRaw); // chat Info 저장하기
    let parsedImageData = this.imagePathParser(imageNameList); // image Info 저장하기

    let resultData = this.chatDataMerger(parsedChatData, parsedImageData); // image와 chat 데이터 연동하기
    return resultData;
  }
}

// util //
/**
 * 정규식을 사용하여 YYYYMMDD_HHMM 형식을 추출합니다.
 *
 */
function extractDateFromFilename(filename) {
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

/**
 * raw채팅 데이터를 파싱한다.
 */
export function parseMessages(input) {
  const lines = input.split("\n");
  const messages = [];

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    // 날짜 라인 체크 (무시)
    if (line.match(/^\d{4}년 \d{1,2}월 \d{1,2}일/)) {
      continue;
    }

    // 메시지 라인 파싱
    const match = line.match(
      /^(\d{4}\. \d{1,2}\. \d{1,2}\. \d{2}:\d{2}), (.+?) : (.+)$/
    );
    if (match) {
      const [, timestamp, sender, message] = match;

      // 날짜 파싱 수정
      const [year, month, day, time] = timestamp.split(".");
      const [hour, minute] = time.trim().split(":");
      const date = new Date(year, month - 1, day, hour, minute);

      let imageInfo = { imageTF: false, imagePath: [], imageQuantity: 0 };

      // 이미지 메시지 체크
      if (message.startsWith("사진")) {
        imageInfo.imageTF = true;
        const quantityMatch = message.match(/사진 (\d+)장/);
        imageInfo.imageQuantity = quantityMatch
          ? parseInt(quantityMatch[1])
          : 1;
      }
      
      // 동영상 체크
      if (message.startsWith("동영상")) {
        imageInfo.imageTF = true;
        imageInfo.imageQuantity = 1;
      }

      messages.push({
        timestamp: date.toISOString(),
        sender,
        message,
        imageInfo,
      });
    } else if (messages.length > 0) {
      // 멀티라인 메시지 처리
      messages[messages.length - 1].message += "\n" + line;
    }
  }

  return messages;
}
