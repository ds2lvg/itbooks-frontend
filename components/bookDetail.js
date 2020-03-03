import React, { useState, useEffect } from 'react';
import axios from '../utils/axios-config';
import { useRouter } from 'next/router';

const BookDetail = () => {
  const [ name, setName ] = useState([]);
  const [ price, setPrice ] = useState([]);
  const [ imgSrc, setImgSrc ] = useState([]);
  const router = useRouter();

  const getDetail = async () => {
    const url = `/books/detail?bookId=${router.query.bookId}`;
    const result = await axios.get(url);
    // console.log('BookDetail', result)

    setName(result.data.name);
    setPrice(result.data.price);
    setImgSrc(result.data.img);
  };

  const buyBook = () => {
    // 구매 로직 추가할 것
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