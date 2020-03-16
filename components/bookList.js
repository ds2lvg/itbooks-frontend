import React, { useEffect, useState } from 'react';
import axios from '../utils/axios-config';
import { getPagination, getPageInfoForButton } from '../utils/pagenation';
import Link from 'next/link';
import Pagination from './pagination';

const BookList = () => {
  const [ books, setBooks ] = useState([]);
  const [ pages, setPages ] = useState([]);
  const [ category, setCategory ] = useState('');
  const [ pageNum, setPageNum ] = useState(0); // 현재 페이지 숫자
  const [ pageInfo, setPageInfo ] = useState({});

  const getData = async () => { // 초기 데이터
    const result = await axios.get(`/books?category=${category}&limit=9`);
    const { bookList, totalCount, limit, currentPage } = result.data;
    // console.log(result.data);
    setBooks(bookList);
    setPages(
      getPagination({ currentPage, totalCount, limit })
    );
    setPageInfo(
      getPageInfoForButton({ currentPage, totalCount, limit })
    );
  };

  const getPage = async page => { // 페이징별 데이터
    const url = `/books?page=${page}&category=${category}&limit=9`;
    const result = await axios.get(url);
    const { bookList, totalCount, limit, currentPage } = result.data;
    setPageNum(page); // 페이지 번호
    setBooks(bookList); // 도서 목록
    setPageInfo( // 페이징을 위한 정보
      getPageInfoForButton({ currentPage, totalCount, limit })
    );
    // console.log('getPage', { bookList, totalCount, limit, currentPage });
  };

  const changePages  = (afterPages) => {
    setPages(afterPages);
  };

  const changeCategory  = (category) => {
    setCategory(category);
  };

  useEffect(() => { // componentDidMount
    getData();
  }, []);

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
              <Link as={`/book/${book['id']}`} href={`/book/detail?bookId=${book['id']}`} passHref>
                <a>
                  <span style={{color:"red"}}>{book['id']}</span>
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
        
         <Pagination 
         pageInfo={pageInfo} pages={pages} 
         pageNum={pageNum} getPage={getPage} 
         changePages={changePages}
         />
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