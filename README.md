<p align="center" style="color:gray">
  <img style="margin:50px 0 10px 0" src=https://github.com/user-attachments/assets/d4bbe2f2-977e-435a-b214-1cd37054ea54 width=200 />
  
화살표 두개가 맞물리는 이미지인 싱크를 S에 적용한 SyncManager 프로젝트 이미지입니다.
</p> 

# SyncManager
SyncManager는 저희 팀이 서로 가진 불편함을 동시에 해결하기 위해 시작한 프로젝트입니다.
- 시웅: 웹버전 YoutubeMusic은 자막 싱크가 지원이 안되고 자막을 보기가 불편하다.
- 동연: Spotify pc 버전은 팝송 자막에 번역이 첨부돼있지 않아 아쉽다

둘 다 공통적으로 PC 플랫폼에서 불편함을 느껴 크롬 익스텐션 기능을 확용하기로 결정했습니다.

## Team
이시웅 <a href="https://github.com/silverttthin" target="_blank"><img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white"></a>

김동연 <a href="https://github.com/doongyeon" target="_blank"><img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white"></a>

## Using Stack

JavaScript - 크롬 익스텐션 개발 용도

FastAPI - 가사 DB 및 AI 번역 개발 용도

## Content

### 0. 익스텐션 아이콘을 눌러 팝업창 플로팅
<img width="500" alt="Untitled" src="https://github.com/user-attachments/assets/6fff0209-9081-45a2-b8da-dee7291e190e">

- 크롬 익스텐션란에 있는 SyncManager 버튼을 눌러 다음 팝업창을 띄울 수 있습니다.
    - 윈도우는 기본적으로 화면 우하단에서 생성되며 임의로 크기 및 위치를 조절할 수 있습니다.


### 1. 한국 노래 싱크에 맞게 가사 제공
<img width="500" alt="Untitled (1)" src="https://github.com/user-attachments/assets/56091f1d-8134-4456-ada0-52be7d0ee9ed">

- DB에 존재하는 노래는 다음과 같이 싱크에 맞게 가사를 제공합니다.
    - 뮤직바의 재생시각을 매우 빠르게 동기화하기 때문에 재생 위치를 옮겨도 가사가 정상적으로 출력됩니다.
    - 소절이 존재하지 않는 빈 시간은 간단한 음표 이모지가 출력됩니다.

<img width="500" alt="Untitled (2)" src="https://github.com/user-attachments/assets/ea6eff4a-9cff-4eee-8138-adf0c38959a4">

- DB에 존재하지 않는 노래는 따로 데이터가 없다고 표시합니다.

### 2. 팝송 가사 제공 및 Gemini AI 번역 가사 동시 제공
<img width="500" alt="Untitled (3)" src="https://github.com/user-attachments/assets/581a5689-a104-49d4-9639-21e1de9e52bd">

- 팝송은 DB에 foreign으로 분류돼 자동으로 한국어 문맥에 최대한 자연스럽게 번역됩니다.
- 영어 가사 하단에 한국어 가사가 같이 나오며 번역 AI는 Google Gemini를 사용했습니다.


### 3. 가사 등록, 추천 커뮤니티
여타 가사 제공 프로그램 특성 상 DB에 없는 노래는 가사 지원이 어렵습니다 😓

- 알송, musixmatch 등을 포함한 노래 프로그램들은 유저들의 가사 데이터 지원을 받고 수정해나갑니다.
- SyncManager도 커뮤니티 사이트를 만들어 유저들의 지원을 받고 있습니다.


등록 페이지

<img width="500" alt="Untitled (4)" src="https://github.com/user-attachments/assets/da9cf433-3d85-48eb-a2bb-1e3337246ae6">

- 닉네임, 노래 언어타입, lrc 파일 업로드 기능이 있습니다.
    - 언어 타입으로 AI 번역 지원 여부를 결정합니다.
 
추천 페이지

<img width="500" alt="Untitled (5)" src="https://github.com/user-attachments/assets/847c4bc6-2dd1-40a7-bef7-efca91e7ead4">
<img width="500" alt="Untitled (6)" src="https://github.com/user-attachments/assets/1a60ec42-655f-4106-b0cc-bd2bfcb6e345">

DB에 저장된 노래들의 가사들을 볼 수 있습니다.

- 가사글 및 싱크가 더 정확한 데이터를 추천, 비추천으로 구분합니다. (최다추천 가사채택은 미구현)
- 검색 기능으로 원하는 노래가 현재 DB에 있는지 조회 가능합니다.

