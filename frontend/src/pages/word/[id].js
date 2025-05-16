import Head from 'next/head'
import Graph from '../../components/Graph'
import Legend from '../../components/Legend'
import Layout from '../../components/Layout'
import { useState, useCallback } from 'react'
import axios from 'axios';

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

const Home = ({ word, data, error }) => {
  // Use the first node from data.nodes as the initial word data
  const initialWordData = data.nodes.find(n => n.id === "0") || word;
  const [wordData, setWord] = useState(initialWordData);
  const [hoveredNode, setHoveredNode] = useState(null);

  // Memoize the hover handler to prevent unnecessary re-renders
  const handleNodeHover = useCallback((nodeData) => {
    setHoveredNode(nodeData);
  }, []);

  if (error) {
    return <div>An error occured: {error.message}</div>;
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
    return { error };
  }
};

export default Home;
