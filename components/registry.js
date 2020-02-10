import React from 'react';

const Registry = () => {
  const categories = ['프로그래밍', '소설'];
  const handleSubmit = (e) => {
    // e.preventDefault();
  }
  return (
    <div class="container">
        <form method="POST" onSubmit={handleSubmit} encType="multipart/form-data" action="http://localhost:3333/api/v1.0/admin/books/registry">
            <label for="이름">이름</label>
            <input type="text" name="name" />
            <label for="가격">가격</label>
            <input type="text" name="price" />
            <label for="카테고리">카테고리</label>
            <select name="category">
              {categories.map(cate => (
              <option>{cate}</option>)
              )}
            </select>
            <label for="이미지">이미지</label>
            <input type="file" name="img" />
            <button type="submit" >등록하기</button>
        </form>
    </div>
  );
};

export default Registry;

// INSERT INTO books (name,price,category,img,createdAt,updatedAt) VALUES ('한국어등록','850','프로그래밍','깃헙페이지.PNG','2020-02-10 11:50:30','2020-02-10 11:50:30');