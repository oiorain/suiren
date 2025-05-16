import Head from 'next/head'
import Graph from '../../components/Graph'
import Legend from '../../components/Legend'
import Layout from '../../components/Layout'
import NotFound from '../../components/NotFound'
import { useState, useCallback, useEffect } from 'react'
import axios from 'axios';
import Link from 'next/link'

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

const Home = ({ word, data, error }) => {
  const [wordData, setWord] = useState(word);
  const [hoveredNode, setHoveredNode] = useState(null);

  // Update wordData when data changes
  useEffect(() => {
    if (data?.nodes) {
      const initialNode = data.nodes.find(n => n.id === "0") || word;
      setWord(initialNode);
    }
  }, [data, word]);

  // Memoize the hover handler to prevent unnecessary re-renders
  const handleNodeHover = useCallback((nodeData) => {
    setHoveredNode(nodeData);
  }, []);

  if (error || !data?.nodes || data.nodes.length === 0) {
    return (
      <Layout>
        <NotFound searchTerm={word.kanji} />
      </Layout>
    );
  }

  return (<>
    <Head>
      <title>Suiren - a Kanji Relationship Explorer</title>
      <meta name='description' content='Suiren - a kanji relationship Explorer' />
    </Head>

    <Layout>
      <Graph data={data} onNodeHover={handleNodeHover}></Graph>
      <Legend word={hoveredNode || wordData}></Legend>
    </Layout>
  </>
  );
};

Home.getInitialProps = async ctx => {
  try {
    const apiUrl = process.env.API_URL || 'http://127.0.0.1:1337';
    const res = await axios.get(`${apiUrl}/api/words/${ctx.query.id}/graph-data`);

    const word = res.data.word;
    const data = res.data.data;

    return { word, data };
  } catch (error) {
    return { 
      error: error.response?.data?.message || error.message,
      word: ctx.query.id // Pass the search term for the not found message
    };
  }
};

export default Home;
