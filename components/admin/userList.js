import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios-config';
import { getPagination } from '../../utils/pagenation';

const userList = () => {
  const [ users, setUsers ] = useState([]);
  const [ pages, setPages ] = useState([]);

  const getData = async () => {
    const result = await axios.get('/admin/users');
    const { userList, totalCount, limit, currentPage } = result.data;
    console.log(result.data);
    setUsers(userList);
    setPages(
      getPagination({ currentPage, totalCount, limit })
    );
  };

  const getPage = async page => {
    const url = `/admin/users?page=${page}`;
    const result = await axios.get(url);
    const { userList, totalCount, limit, currentPage } = result.data;
    setUsers(userList);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>아이디</th>
              <th>보유금액</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user['id']}>
                <td>{user['id']}</td>
                <td>{user['uid']}</td>
                <td>{user['balance']}</td>
                <td>{user['status'] ? '일반유저': '관리자'}</td>
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

export default userList;