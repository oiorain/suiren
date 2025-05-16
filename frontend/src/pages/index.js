import Head from 'next/head'
import Layout from '../components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


const Home = ({ }) => {
  return (<>
    <Head>
      <title>Suiren - a Kanji Relationship Explorer</title>
      <meta name='description' content='Suiren - a kanji relationship Explorer' />
    </Head>

    <Layout>
      <div class="start">
        <img src="/start-screen-img.svg" />
        <p>Suiren <Link href="/word/睡蓮">睡蓮</Link> is a fun way to explore the Japanese language using Kanji to hop from one word to another, creating memorable connections. </p>
        <p>To start exploring, select a word below or search for one with at least one Kanji in it:</p>
        <div className="start-link-list">
          <Link href="/word/木" className="start-link">木</Link>
          <Link href="/word/大切" className="start-link">大切</Link>
          <Link href="/word/休息" className="start-link">休息</Link>
          <Link href="/word/満足" className="start-link">満足</Link>
          <Link href="/word/睡蓮" className="start-link">睡蓮</Link>
        </div>
        <p><small>Made by <a href="http://twitter.com/oiorain" target="_blank" rel="noopener noreferrer">Marion Kamoike-Bouguet</a> with <a href="http://aqworks.com" target="_blank" rel="noopener noreferrer">AQ</a>.<br/>
        Running on <a href='http://strapi.io' target='_blank' rel="noopener noreferrer">Strapi.io</a>, Hosted on <a href='https://strapi.io/cloud' target='_blank' rel="noopener noreferrer">StrapiCloud</a>.</small></p>
      </div>
    {/* <%= render "partials/graph", hide: true %> */}

    </Layout>
  </>
  );
};

export default Home;
