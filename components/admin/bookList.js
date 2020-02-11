import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getPagination } from '../../utils/pagenation';

const BookList = () => {
  const [ books, setBooks ] = useState([]);
  const [ pages, setPages ] = useState([]);

  const getData = async () => {
    const result = await axios.get('/admin/books');
    const { bookList, totalCount, limit, currentPage } = result.data;
    // console.log(result.data);
    setBooks(bookList);
    setPages(
      getPagination({ currentPage, totalCount, limit })
    );
  };

  const getPage = async page => {
    const url = `/admin/books?page=${page}`;
    const result = await axios.get(url);
    const { bookList, totalCount, limit, currentPage } = result.data;
    setBooks(bookList);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="container">
          <table>
            <thead>
              <tr>
                <th>제품번호</th>
                <th>분류</th>
                <th>도서명</th>
                <th>가격</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book['id']}>
                  <td>{book['id']}</td>
                  <td>{book['category']}</td>
                  <td>{book['name']}</td>
                  <td>{book['price']}</td>
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
    </>
  );
};

export default BookList;