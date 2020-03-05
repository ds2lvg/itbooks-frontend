import React, { useState, useEffect } from 'react';
import axios from '../utils/axios-config';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const BookDetail = () => {
  const { isLogin, token, userId } = useSelector(state => state.user);
  const [ bookId, setBookId ] = useState([]);
  const [ name, setName ] = useState([]);
  const [ price, setPrice ] = useState([]);
  const [ imgSrc, setImgSrc ] = useState([]);
  const router = useRouter();

  const getDetail = async () => {
    const url = `/books/detail?bookId=${router.query.bookId}`;
    const result = await axios.get(url);
    console.log('BookDetail', result)

    setBookId(result.data.id);
    setName(result.data.name);
    setPrice(result.data.price);
    setImgSrc(result.data.img);
  };

  const buyBook = async () => {
    // 구매 로직 추가할 것
    const result = await axios.post('/purchase', {
      uid: userId, bookId, price,
    });
    console.log(result);

    // 구매테스트 후 리덕스로 변경
    if (result.status == 201) {
      alert('해당 제품 구매를 완료했습니다.')
    } else if (result.status == 400) {
      alert('돈이 부족합니다.')
    } else if (result.status == 401) {
      alert('구매하시려면 로그인을 해야합니다')
    }
  }

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <div className="detail">
      <img src={`http://localhost:3333/uploads/${imgSrc}`} />
      <h3>{name}</h3>
      <h3>{price}</h3>
      <button type="button" onClick={buyBook}>구매하기</button>
    </div>
  );
};

export default BookDetail;