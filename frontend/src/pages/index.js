import Head from 'next/head'
import Layout from '../components/Layout'
import Image from 'next/image'
import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'


const inter = Inter({ subsets: ['latin'] })

import axios from 'axios';

const Home = ({ words, error }) => {

  if (error) {
    return <div>An error occured: {error.message}</div>;
  }
  console.log(words.data)
  return (<>
    <Head>
      <title>Suiren - a Kanji Relationship Explorer</title>
      <meta name='description' content='Suiren - a kanji relationship Explorer' />
    </Head>

    <Layout>
      <ul>
        { words.data.map(word => (
          <li key={word.id}>{word.attributes.kanji} - {word.attributes.english}</li>
        )) }
      </ul>
    </Layout>

  </>

  );
};

Home.getInitialProps = async ctx => {
  try {
    const res = await axios.get('http://127.0.0.1:1337/api/words');

    const words = res.data;
    return { words };
  } catch (error) {
    return { error };
  }
};

export default Home;
