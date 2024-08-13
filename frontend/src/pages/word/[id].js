import Head from 'next/head'
import Graph from '../../components/Graph'
import Legend from '../../components/Legend'
import Layout from '../../components/Layout'
import { useState } from 'react'
import axios from 'axios';

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

const Home = ({ word, data, error }) => {
  let [ wordData, setWord ] = useState(word)

  if (error) {
    return <div>An error occured: {error.message}</div>;
  }

  return (<>
    <Head>
      <title>Suiren - a Kanji Relationship Explorer</title>
      <meta name='description' content='Suiren - a kanji relationship Explorer' />
    </Head>

    <Layout>
      <Graph wordData={wordData} data={data}></Graph>
      <Legend word={word}></Legend>
      <button type="button" onClick={() => router.push('/word/27919')}>
      Click me
    </button>
    </Layout>
  </>
  );
};

Home.getInitialProps = async ctx => {
  try {
    const res = await axios.get(`http://127.0.0.1:1337/api/words/${ctx.query.id}/graph-data`);

    const word = res.data.word;
    const data = res.data.data;

    return { word, data };
  } catch (error) {
    return { error };
  }
};

export default Home;
