import React from 'react';
import Head from 'next/head';
import Nav from '../../components/admin/nav';

const AdminHome = () => {
  return (
    <div>
    <Head>
      <title>IT BOOKS Admin</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Nav />

    <div className="hero">
      <h1 className="title">IT BOOKS Admin</h1>
      <p className="description">
        I'll make it alone!
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
  );
};

export default AdminHome;