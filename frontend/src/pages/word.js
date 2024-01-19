import Head from 'next/head'
import Graph from '../components/Graph'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

import axios from 'axios';

const Home = ({ word, error }) => {

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
      <Graph></Graph>
      
      ID {word.data.attributes.kanji}
      
      {/* <li key={word.id}>{word.attributes.kanji} - {word.attributes.english}</li> */}
         
    </Layout>
  </>
  );
};

Home.getInitialProps = async ctx => {
  console.log("tut")
  // const router = useRouter()
  // console.log(router.query.word)
  try {
    const res = await axios.get('http://127.0.0.1:1337/api/words/27885');

    const word = res.data;
    return { word };
  } catch (error) {
    return { error };
  }
};

export default Home;
