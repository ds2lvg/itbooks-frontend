import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getPagination } from '../utils/pagenation';
import useInput from './useInput';
import valid from '../utils/validator';

const Purchase = () => {
  const [ purchases, setPurchases ] = useState([]);
  const [ pages, setPages ] = useState([]);

  
  const getData = async () => {
    const result = await axios.get('/admin/purchase');
    const { purchaseList, totalCount, limit, currentPage } = result.data;
    console.log(result.data);
    setPurchases(purchaseList);
    setPages(
      getPagination({ currentPage, totalCount, limit })
    );
  };

  const getPage = async page => {
    const url = `/admin/purchase?page=${page}`;
    const result = await axios.get(url);
    const { purchaseList, totalCount, limit, currentPage } = result.data;
    setPurchases(purchaseList);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div class="container">
      <table>
        <thead>
          <tr>
            <th>구매유저</th>
            <th>도서명</th>
            <th>가격</th>
            <th>구매갯수</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map(purchase => (
            <tr key={purchase['id']}>
              <td>{purchase['user.uid']}</td>
              <td>{purchase['book.name']}</td>
              <td>{purchase['book.price']}원</td>
              <td>{purchase['count']}개</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {pages.map(page => (
          <button key={page} onClick={() => getPage(page)}>{page+1}</button>
        ))}
      </div>
    </div>
  );
};

export default Purchase;