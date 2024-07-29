class chatDataStructor {
  constructor() {
    this.chatTXT;
    this.imagePathList;
  }

  /**
   * 이 함수를 부르면 사용가능한 데이터가 생길겁니다.
   *
   * @param {string} folderPath - 카카오톡 채팅방 zip 압축해제 폴더의 경로
   * @returns {object[]} 사용가능한 데이터구조로 변형한 채팅 데이터를 리턴합니다.
   */
  start(folderPath) {
    let { chatFilePath, imagePathList } = dictionaryFileLister(folderPath);

    let parsedChatData = chatParser(chatFilePath); // chat Info 저장하기
    let parsedImageData = imagePathParser(imagePathList); // image Info 저장하기

    let resultData = chatDataMerger(parsedImageData, parsedChatData); // image와 chat 데이터 연동하기
    return resultData;
  }

  /**
   * 폴더에 있는 파일이름들을 분석해줍니다.
   *
   * @param {string} folderPath - 카카오톡 채팅방 zip 압축해제 폴더의 경로
   * @returns {{ chatFilePath: string , imagePathList: string[] }} 파일 이름들 분류 데이터
   */
  dictionaryFileLister(folderPath) {
    // 폴더 리스트 쭈루룩 뽑아와서 image들 append하고 날짜 데이터 따로 저장하고 txt파일 찾아서 경로 저장하기
    return { chatFilePath: "", imagePathList: "" };
  }

  /**
   * 구조화된 chatData를 드디어 리턴해줍니다.
   *
   * @param {string} chatFilePath - chat backup txt file path
   * @param {string[]} imagePathList - image path 모음
   * @returns {Array  <{
   *   timestamp: "2024-07-22T14:36:00.000Z",
   *   sender: string,
   *   message: string,
   *   imageInfo: {
   *     imageTF: boolean,
   *     imagePath: string[],
   *     imageCnt: number
   *   }
   * }>} 구조화된 chat 데이터
   */

  chatParser(chatFilePath) {}
  imagePathParser(imagePathList) {}
  chatDataMerger(parsedImageDaarsedChatData) {}
}
