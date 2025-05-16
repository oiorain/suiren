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
        <div class="start-link-list">
          <a href="/word/木" class="start-link">木</a>
          <a href="/word/大切" class="start-link">大切</a>
          <a href="/word/休息" class="start-link">休息</a>
          <a href="/word/満足" class="start-link">満足</a>
          <a href="/word/睡蓮" class="start-link">睡蓮</a>
        </div>
        <p><small>Made by <a href="http://twitter.com/oiorain" target="_blank">Marion Kamoike-Bouguet</a> with <a href="http://aqworks.com" target="_blank">AQ</a>.<br/>
        Running on <a href='http://strapi.io' target='_blank'>Strapi.io</a>, Hosted on <a href='https://strapi.io/cloud' target='_blank'>StrapiCloud</a>.</small></p>
      </div>
    {/* <%= render "partials/graph", hide: true %> */}

    </Layout>
  </>
  );
};

export default Home;
