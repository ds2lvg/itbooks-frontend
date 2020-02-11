import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookList = () => {
  const [ books, setBooks ] = useState([]);
  const getData = async () => {
    let result = await axios.get('/admin/books');
    console.log(result.data);
    setBooks(result.data);
    return result.data;
  };


  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="container">
          <table>
            <thead>
              <tr>
                <th>분류</th>
                <th>도서명</th>
                <th>가격</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book['id']}>
                  <td>{book['category']}</td>
                  <td>{book['name']}</td>
                  <td>{book['price']}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            {/* <a href="#" onClick='getPage(p)' v-for="p in pagination" :key="p">{{p + 1}}</a> */}
          </div>
      </div>      
    </>
  );
};

export default BookList;