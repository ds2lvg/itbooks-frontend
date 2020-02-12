import React from 'react'
import Link from 'next/link'

const Nav = () => (
  <nav>
    <h1 className="logo">
      <Link href="/">
        <a>
          <img src='/img/itbooks_logo.png' alt=""/>
        </a>
      </Link>
    </h1>
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
        <Link href="/member/signin" passHref>
          <a>로그인</a>
        </Link>
      </li>
      <li>
        <Link href="/member/mypage" passHref>
          <a>마이페이지</a>
        </Link>
      </li>
    </ul>

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
  </nav>
)

export default Nav
