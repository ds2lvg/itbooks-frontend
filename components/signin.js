import React from 'react';
import useInput from './hooks/useInput';
import Router from 'next/router';
import axios from '../utils/axios-config';

const Signin = () => {
  const uid = useInput('');
  const password = useInput('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let data = await axios.post('/users/signin', data = {
      uid: uid.value, password: password.value,
    });

    if (data.status == 200) {
      alert('로그인에 성공하였습니다.');
      console.log('signin', data);

      const checkSession = async () => {
        let data = await axios.get('/users/session-check');
        console.log('check', data);
        return data;
      }

      checkSession();

      // Router.push('/');
    } else if (data.status == 204) {
      alert('잘못된 정보입니다.');
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="아이디">아이디</label>
        <input type="text" name="uid" {...uid} />
        <label htmlFor="패스워드">패스워드</label>
        <input type="password" name="password" {...password} />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Signin;