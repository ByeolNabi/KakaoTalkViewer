# 문제사항

카카오톡에서 채팅방 내보내기를 하면 사진과 txt가 분리되어서 나간다.

- 사진과 채팅을 연결해준 상태로 보여주는 것이 있으면 편하겠다.

# 분석

## 파일 구조

```
.
├── 20240719_131309_55.jpeg
├── 20240719_131339_56.jpeg
└── Talk_2024.7.23 13:49-1.txt
```

```
컨텐츠 이름 형식
- YYYYMMDD_HHMMSS_{idx}.{type}

채팅 이름 형식
- Talk_YYYY.MM.DD HH:MM-1.txt
- 마지막 채팅 시간
```

# txt파일(채팅) 형식

```
2024년 7월 7일
2024. 7. 7. 16:34, 김대규 : 그러면
화욜 식재료 채우기 및 시내 모시꺵
수욜 핑핑이랜드
목욜 몰라
금욜 푸핑투어
토욜 판랑사막
일욜 굿바이 투어 및 10시까지 자유시간
월욜 새벽 1시 비행기

2024년 7월 22일 월요일
2024. 7. 22. 01:57, 김대규 : 사진
```

```
YYYY년 M월 D일
📍 월 일 앞에 0패딩 없음

YYYY. M. D. HH:MM, {이름} : {text}
📍 월 일 앞에 0패딩 없음
📍 text에 줄바꿈을 그대로 사용함
📍 사진은 '사진'이라고 표현함
📍 {이름}에는 '나'라고 직접적으로 표현하지 않음
```

# 구현

## 스택

프론트엔드 : 웹 react  
데이터 파싱 : node.js

## 데이터구조

### 채팅

```javascript
[
  {
    timestamp: "2024-07-22T14:36:00.000Z",
    sender: string,
    message: string,
      imageInfo: {
        imageTF: boolean,
        imagePath: Array <string>,
        imageQuantity: number
      },
  },
];
```

### 이미지

```javascript
[
  {
    path: string,
    timestamp: "2024-07-22T14:36:00.000Z",
  },
];
```

## 체크리스트

### 데이터

- [x] 정규형으로 파싱하기
- [x] 사진 연결하기
- [x] 동영상도 이미지로 분류하기

### 프론트엔드

- [x] react build tool 선택(vite)
- [x] 파일 및 폴더구조 미리 설계하기
- [x] 텍스트 메시지 먼저 출력해보기
- [x] Home에서 Viewer로 chat data 넘기기, Context이용
- [ ] Home에서 chat.txt parsing하기, (image연결은 나중에)
  - 파싱은 하겠는데 이미지와 채팅 연결을 어떻게 해야할까. path로 연결하는게 아닌데...
- [ ] Viewer에서 일단 채팅 출력하기