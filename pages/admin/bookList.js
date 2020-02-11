import React from 'react';
import Nav from '../../components/admin/nav';
import BookList from '../../components/admin/bookList';

const bookList = () => {
  return (
    <>
      <Nav></Nav>
      <BookList />
    </>
  );
};

export default bookList;