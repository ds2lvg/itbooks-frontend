import React from 'react';
import Nav from '../../components/admin/nav';
import UserList from '../../components/admin/userList';
const userList = () => {
  return (
    <>
      <Nav></Nav>
      <UserList />
    </>
  );
};

export default userList;