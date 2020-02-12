import React, { useState } from 'react';
import axios from '../../utils/axios-config';
import valid from '../../utils/validator';
import useInput from '../hooks/useInput';

const Registry = () => {
  const categories = ['프로그래밍', '소설']; // 나중에 DB에서 받아오는걸로 변경
  const [fileObj, setFileObj] = useState(null);
  const validMaxLen10 = valid.MaxLen10;
  const validOnlyNum = valid.OnlyNum;
  const name = useInput('', [validMaxLen10]);
  const price = useInput('', [validMaxLen10, validOnlyNum]);
  const category = useInput(categories[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(fileObj.files[0], name.value , price.value , category.value);

    let formData = new FormData();
    if(name.value && price.value && category.value && fileObj.files[0]){
      formData.append("img", fileObj.files[0]);
      formData.append("name", name.value);
      formData.append("price", price.value);
      formData.append("category", category.value);
      try {
        let data = await axios.post('/admin/books/registry', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(data);
        alert('제품이 정상적으로 등록되었습니다.');
        // $nuxt.$router.replace({ path: '/admin' })
      } catch (e) {
        console.error(e);
      }

    }else{
        alert('빈 양식이 있습니다.')
    }
  }

  const fileHandler = (e) => {
    setFileObj(event.target);
  }

  return (
    <div className="container">
      <form method="POST" onSubmit={handleSubmit} encType="multipart/form-data" action="http://localhost:3333/api/v1.0/admin/books/registry">
        <label htmlFor="이름">이름</label>
        <input type="text" name="name" {...name} />
        <label htmlFor="가격">가격</label>
        <input type="text" name="price" {...price} />
        <label htmlFor="카테고리">카테고리</label>
        <select name="category" {...category}>
          {categories.map(cate => (
          <option key={cate}>{cate}</option>)
          )}
        </select>
        <label htmlFor="이미지">이미지</label>
        <input type="file" name="img" onChange={() => fileHandler()} />
        <button type="submit" >등록하기</button>
      </form>
    </div>
  );
};

export default Registry;