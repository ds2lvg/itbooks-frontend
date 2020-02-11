import React from 'react'
import Link from 'next/link'

const links = [
  { href: 'https://github.com/ds2lvg?tab=repositories', label: 'GitHub' },
].map(link => ({
  ...link,
  key: `nav-link-${link.href}-${link.label}`,
}))

const Nav = () => (
  <nav>
    <h1 className="logo">
      <img src='/img/itbooks_logo.png' alt=""/>
    </h1>
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/admin/registry" passHref>
          <a>도서등록</a>
        </Link>
      </li>
      <li>
        <Link href="/admin/bookList" passHref>
          <a>도서목록</a>
        </Link>
      </li>

      {links.map(({ key, href, label }) => (
        <li key={key}>
          <a href={href} target="blank">{label}</a>
        </li>
      ))}
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
