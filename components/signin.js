import React, { useEffect, useRef, useCallback } from 'react';
import useInput from './hooks/useInput';
import Router from 'next/router';
import axios from '../utils/axios-config';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_REQUEST } from '../modules/user';

const Signin = () => {
  const uid = useInput('');
  const password = useInput('');
  const { isLogin, token, loginFailure } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const refMount = useRef(false);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    dispatch({
      type: LOG_IN_REQUEST,
      data: {
        uid: uid.value, password: password.value,
      }
    });
  }, [uid.value, password.value]);

  useEffect(() => {
    if(!refMount.current) refMount.current=true;
    // console.log('dispatch', isLogin);
    if (isLogin) {
    // if (data.status == 200) {
      alert('로그인에 성공하였습니다.');
      localStorage.clear();
      localStorage.setItem('token', token);
      const expireTime = (+ new Date()) + (1000 * 60 * 60 * 1); // Timestamp로 저장

      localStorage.setItem('time', expireTime);
      console.log('signin', localStorage);
      Router.push('/');
    } 

    if(loginFailure) {
      alert('아이디 혹은 비밀번호가 다릅니다.');
    }
  }, [isLogin, loginFailure]);

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