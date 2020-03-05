import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from './../utils/axios-config';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_CHECK_REQUEST, LOG_OUT_REQUEST } from '../modules/user';
import Router from 'next/router';

const Nav = () => {
  // 로그인 상태 체크 로직 전역 부분으로 옮길 것
  const { isLogin, token } = useSelector(state => state.user);
  const dispatch = useDispatch();
  
  const checkToken = async () => {
    // let data = await axios.get('/users/session-check');
    const token = localStorage.getItem('token');
    const expireTime = localStorage.getItem('time');
    const currentTime = + new Date();
    
    // 로그인 유효시간 경과시
    if(currentTime >= parseInt(expireTime)){
      handleSignout("로그인 시간이 만료되었습니다. 다시 로그인 해주세요.");
      return Router.push('/member/signin');
    }

    // 현재 로그인 상태인지 체크
    if(token) {
      dispatch({
        type: LOG_IN_CHECK_REQUEST,
        data: token
      });
    }
  }
  
  const handleSignout = (msg) => {
    localStorage.clear();
    dispatch({
      type: LOG_OUT_REQUEST,
    });
    if(!msg) {
      alert("로그아웃 되었습니다.");
    } else {
      alert(msg);
    }
  }

  useEffect(() => {
    checkToken();
  }, [isLogin]);

  return (
    <>
      <header className="header">
        <h1 className="logo">
          <Link href="/">
            <a><img src='/img/itbooks_logo.png' alt=""/></a>
          </Link>
        </h1>
        <nav>
          <ul>
            <li>
              <Link href="/book/list" passHref>
                <a>도서</a>
              </Link>
            </li>
            <li>
              <Link href="/member/signup" passHref>
                <a>회원가입</a>
              </Link>
            </li>
            <li>
              {!isLogin 
              ? (
                <Link href="/member/signin" passHref>
                  <a>로그인</a>
                </Link>
              )
              : (
                <a onClick={handleSignout}>로그아웃</a>
              )}
            </li>
            <li>
            {!isLogin 
              ? (
                <Link href="/member/signin" passHref>
                  <a>마이페이지</a>
                </Link>
              )
              : (
                <Link href="/member/mypage" passHref>
                  <a>마이페이지</a>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </header>
      <style jsx>{`
        :global(body) {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
            Helvetica, sans-serif;
        }
        nav {
          text-align: center;
        }
        ul {
          display: flex;
          justify-content: space-between;
        }
        nav > ul {
          padding: 4px 16px;
        }
        li {
          display: flex;
          padding: 6px 8px;
        }
        a {
          color: #067df7;
          text-decoration: none;
          font-size: 13px;
        }
      `}</style>
    </>
  );
};

export default Nav;