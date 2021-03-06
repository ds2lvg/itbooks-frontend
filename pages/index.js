import React from 'react';
import Head from 'next/head';
import Nav from '../components/nav';

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Nav />

    <div className="hero">
      <h1 className="title">IT BOOKS</h1>
      <p className="description">
        IT인들을 위한 도서몰
        IT Books 입니다.
      </p>
    </div>

    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
      }
    
    `}</style>
  </div>
)

export default Home
