import React, { useEffect, useState } from 'react';
import axios from '../utils/axios-config';
import { getPagination } from '../utils/pagenation';
import Link from 'next/link';

const BookList = () => {
  const [ books, setBooks ] = useState([]);
  const [ pages, setPages ] = useState([]);
  const [ category, setCategory ] = useState('');

  const getData = async () => {
    const result = await axios.get(`/books?category=${category}`);
    const { bookList, totalCount, limit, currentPage } = result.data;
    console.log(result.data);
    setBooks(bookList);
    setPages(
      getPagination({ currentPage, totalCount, limit })
    );
  };

  const getPage = async page => {
    const url = `/books?page=${page}&category=${category}`;
    const result = await axios.get(url);
    const { bookList, totalCount, limit, currentPage } = result.data;
    setBooks(bookList);
  };

  const changeCategory  = (category) => {
    setCategory(category);
  };

  useEffect(() => {
    getData();
  }, [category]);

  return (
    <>
      <div className="container">
        <div className="category">
          <button onClick={() => changeCategory('')}>전체</button>
          <button onClick={() => changeCategory('프로그래밍')}>프로그래밍</button>
          <button onClick={() => changeCategory('소설')}>소설</button>
        </div>

        <strong className="category_now">{category ? category : '전체'}</strong>

        <ul className="book-main-list">
          {books.map(book => (
            <li key={book['id']}>
              <Link href={"/book/"+book['id']} passHref>
                <a>
                  <div className="thumnail">
                    <img src={"http://localhost:3333/uploads/"+book['img']} alt=""/>
                  </div>
                  {/* <span>{book['category']}</span> */}
                  <span>{book['name']}</span>
                  <span>{book['price']}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <div className="pagination">
          {pages.map(page => (
            <button key={page} onClick={() => getPage(page)}>{page+1}</button>
          ))}
        </div>
      </div>

      
    <style jsx>{`
      .category{
        margin-bottom 30px;
      }
      .category_now{
        dispaly:block;
        margin-bottom 50px;
      }
      .book-main-list {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
      }
      li {
        width: 32%;
        margin-left: 2%;
      }
      li:nth-child(3n + 1) {
        margin-left: 0;
      }
      .thumnail{
        width: 200px;
        height: 330px;
        line-height: 330px;
        text-align: center;
      }
      .thumnail img{
        height: auto;
      }
      a {
        color: #067df7;
        text-decoration: none;
      }
    `}</style> 
    </>
  );
};

export default BookList;