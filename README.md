- 프론트 개발서버:  yarn dev
- 동적라우팅 지원 개발서버:  yarn ssr

# Technologies Use
## frontend
- Reouter : next.js
- state : redux-saga
- API Module : axios

## Backend
- WAS: express.js
- ORM: sequalize5(mysql)
- JWT: Tokken Sever

--------------------------

# DB Modeling

## 유저정보 users
|field|type|description|
|--|--|--|
|id|INT|PK|
|uid|VARCHAR|아이디|
|password|VARCHAR|비밀번호|
|balance|INT|보유금액|
|status|INT|권한 0:관리자, 1:일반유저|

## 책정보 테이블 book
|field|type|description|
|--|--|--|
|id|INT|PK|
|name|VARCHAR|도서명|
|price|INT|가격|
|category|VARCHAR|카테고리|
|img|VARCHAR|책 이미지|

## 구매 기록 purchase
|field|type|description|
|--|--|--|
|id|INT|PK|
|count|INT|구매개수|
|userId|INT|FK 유저정보 id|
|bookId|INT|FK 책정보 id|

--------------------------

# 추가할 테이블

## 책분류 category
## 책정보 테이블 book
|field|type|description|
|--|--|--|
|id|INT|PK|
|name|VARCHAR|카테고리 한글|
|code|VARCHAR|카테고리 영어|

--------------------------