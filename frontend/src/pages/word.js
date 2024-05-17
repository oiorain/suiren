import Head from 'next/head'
import Graph from '../components/Graph'
import Legend from '../components/Legend'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import { useState } from 'react'
import axios from 'axios';

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

const Home = ({ word, error }) => {
  let [ wordData, setWord ] = useState(word)

  if (error) {
    return <div>An error occured: {error.message}</div>;
  }
  console.log("Home")
  console.log(word)
  return (<>
    <Head>
      <title>Suiren - a Kanji Relationship Explorer</title>
      <meta name='description' content='Suiren - a kanji relationship Explorer' />
    </Head>

    <Layout>      
      <Graph wordData={wordData}></Graph>
      <Legend word={word}></Legend>
      <button type="button" onClick={() => router.push('/word/27919')}>
      Click me
    </button>
    </Layout>
  </>
  );
};

Home.getInitialProps = async ctx => {
  console.log("tut")
  // const router = useRouter()
  // console.log(router.query.word)
  // TODO: find a way to define routes
  try {
    const res = await axios.get('http://127.0.0.1:1337/api/words/27919');

    const word = res.data.data.attributes;
    
    return { word };
  } catch (error) {
    return { error };
  }
};

export default Home;
