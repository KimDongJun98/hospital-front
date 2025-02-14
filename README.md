# 병원 예약 시스템 구현 프로젝트
- 기간 : 2024.09 ~ 2025.02 (3개월)
- https://hospital-front-theta.vercel.app/

<br/>

## 🔍 소개
사용자가 원하는 병원과 상품을 선택하여 예약을 진행할 수 있는 시스템을 구현하였습니다. 프론트엔드는 Next.js, React를 사용하여 직관적인 UI/UX를 제공하며, 백엔드는 Node.js, Express, MongoDB를 사용하여 예약 기능과 데이터 관리를 지원합니다. 또한 Vercel과 Fly.io를 활용해 각각 배포하여 원활한 서비스가 운영되도록 하였습니다.

<br/>

## ⭐ 주요 기능
- **메인 페이지** : 병원의 상품 리스트 출력 후 원하는 상품 예약 가능
![상품 리스트](https://github.com/user-attachments/assets/afb5e1ef-00cf-45bc-a0ba-2985b7c0452b)

- **예약 페이지** : 선택 상품 확인 후 날짜 선택하여 사용자의 정보 입력 후 예약
 ![예약](https://github.com/user-attachments/assets/a74faef2-0c5a-4908-a769-9feb870fbc28)

- **예약 조회** : 휴대폰 정보로 예약 조회 가능 -> 없다면 에러 출력
![예약 조회](https://github.com/user-attachments/assets/173d7cda-afc4-4010-983a-40a89cd56313)

- **로그인(병원/관리자)** : 병원/관리자 로그인
![로그인](https://github.com/user-attachments/assets/d019d2d0-0a51-4b47-88c9-c714f284cf7c)

- **예약 리스트(병원/관리자)** : 예약 확인, 취소 가능
![예약 리스트](https://github.com/user-attachments/assets/4bea79e7-69ef-4602-83ab-f7f81db1ffd2)

<br/>

## 🔨 프로젝트 구조
![프로젝트 구조](https://github.com/user-attachments/assets/6d2586b0-9b3c-4032-a384-7675bcfde105)

<br/>

## 📑 페이지 구성
![역할](https://github.com/user-attachments/assets/d57f0dbe-7748-499a-b4b2-f751a782e29e)

<br/>

## 🔧 Stack

**Frontend**
- **Language** : TypeScript
- **Environment** : Next.js
- **Library & Framework** : React, Styled-Components, Axios
- **Deploy** : Vercel

<br/>

**Backend**
- **Language** : TypeScript
- **Environment** : Node.js
- **Library & Framework** : Express
- **Database** : MongoDB
- **Deploy** : Fly.io, MongoDB Atlas(database)

<br/>

## ➕ 추가, 수정 예정

- **본인인증 기능 추가(소셜 로그인 등)**
- **검진 상품과 더불어 추가 상품 추가**
- **시간이 지난 후 데이터 접근할 때 fly.io 활성화 되는데 시간 소요**

<br/>

## ❗회고
프론트엔드로서는 반응형 디자인과 요청이 실패할 시 직관적인 UI 피드백을 통한 사용자 경험 향상에 중점을 두었으며, 헤더와 버튼 등은 컴포넌트화 하여 재사용성과 유지보수성을 향상 시킬 수 있었습니다.
백엔드로서는 초기 타입 지정과 몽고DB 간의 연결, 자동으로 수정 사항이 반영되도록 하는 것이 어려웠으나 몽구스의 여러 메서드를 통해 예약 시스템을 구현할 수 았었습니다.
