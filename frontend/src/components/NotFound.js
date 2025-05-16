import Link from 'next/link';

const NotFound = ({searchTerm}) => {
    return (
      <div className="start">
      <img src="/start-screen-img.svg" />
      <p>We couldn&apos;t find the page you were looking for: {searchTerm}</p>
      <p>Try searching for a word or check out these examples:</p>
      <div className="start-link-list">
        <Link href="/word/木" className="start-link link-button">木</Link>
        <Link href="/word/大切" className="start-link link-button">大切</Link>
        <Link href="/word/休息" className="start-link link-button">休息</Link>
        <Link href="/word/満足" className="start-link link-button">満足</Link>
        <Link href="/word/睡蓮" className="start-link link-button">睡蓮</Link>
      </div>
      <p><small>Made by <a href="http://twitter.com/oiorain" target="_blank" rel="noopener noreferrer">Marion Kamoike-Bouguet</a> with <a href="http://aqworks.com" target="_blank" rel="noopener noreferrer">AQ</a>.<br/>
      Running on <a href='http://strapi.io' target='_blank' rel="noopener noreferrer">Strapi.io</a>, Hosted on <a href='https://strapi.io/cloud' target='_blank' rel="noopener noreferrer">StrapiCloud</a>.</small></p>
    </div>
    )
  }
  
  export default NotFound