import React, { useEffect, useState } from 'react';
import axios from '../utils/axios-config';
import { getPagination } from '../utils/pagenation';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const MyPage = () => {
  const [ purchases, setPurchases ] = useState([]);
  const [ pages, setPages ] = useState([]);
  const { userId } = useSelector(state => state.user);

  const getData = async () => {
    const result = await axios.get(`/purchase?userId=${userId}`);
    const { purchases, totalCount, limit, currentPage } = result.data;
    setPurchases(purchases);
    console.log(purchases);
    setPages(
      getPagination({ currentPage, totalCount, limit })
    )
  }

  const getPage = async () => {
    const result = await axios.get(`/purchase?page=${page}`);
    const { purchases, totalCount, limit, currentPage } = result.data;
    setPurchases(purchases);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1>마이페이지</h1>
      <h2></h2>
      
      <h2>도서 구매 내역</h2>
      <table>
        <thead>
          <tr>
            <th>도서명</th>
            <th>가격</th>
            <th>수량</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map(purchase => (
            <tr key={purchase['id']}>
              <td>
              <Link as={`/book/${purchase['BookId']}`} href={`/book/detail?bookId=${purchase['BookId']}`} passHref>
                <a>
                  {purchase['Book.name']}
                </a>
              </Link>
              </td>
              <td>{purchase['Book.price']}원</td>
              <td>{purchase['count']}개</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {pages.map(page => (
          <button key={page} onClick={() => getPage(page)}>{page + 1}</button>
        ))}
      </div>
    </>
  );
};

export default MyPage;