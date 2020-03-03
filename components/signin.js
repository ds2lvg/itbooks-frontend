import React, { useEffect, useRef } from 'react';
import useInput from './hooks/useInput';
import Router from 'next/router';
import axios from '../utils/axios-config';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_REQUEST } from '../modules/user';

const Signin = () => {
  const uid = useInput('');
  const password = useInput('');
  const { isLogin, token } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // let data = await axios.post('/users/signin', data = {
    //   uid: uid.value, password: password.value,
    // });
    dispatch({
      type: LOG_IN_REQUEST,
      data: {
        uid: uid.value, password: password.value,
      }
    });
  }

  useEffect(() => {
    console.log('dispatch', isLogin);
    if (isLogin) {
    // if (data.status == 200) {
      alert('로그인에 성공하였습니다.');
      console.log('signin', token);
      localStorage.removeItem('token');
      localStorage.setItem('token', token)
      
      Router.push('/');
    } else {
    // } else if (data.status == 204) {
      // alert('잘못된 정보입니다.');
    }
  }, [isLogin]);

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