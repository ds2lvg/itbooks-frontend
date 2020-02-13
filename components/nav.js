import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from './../utils/axios-config';

const Nav = () => {
  const [isLogin, setIsLogin] = useState(false);

  const checkToken = async () => {
    // let data = await axios.get('/users/session-check');
    const token = localStorage.getItem('token');
    if(token !== null) {
      let data = await axios({
        method: "get",
        url: "/users/tokken-check",
        headers: { Authorization: token },
      })
      
      console.log('checkToken ', data.isLogin);
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }
  
  const handleSignout = () => {
    setIsLogin(false);
    localStorage.removeItem('token');
    alert("로그아웃 되었습니다.");
  }

  useEffect(() => {
    checkToken();
  }, []);

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