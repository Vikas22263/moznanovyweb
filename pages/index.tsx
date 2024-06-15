import React from 'react';
import Head from 'next/head';
import Header from '../components/header/main';
import Hero from '../components/index/hero/main';
import LatestAdded from '../components/index/movies/latestadded';

const Index = () => {
  return (
    <>
      <Head>
        <title>❤️Filmový ráj - Online filmy zdarma ke zhlédnutí</title>
        <meta name="description" content="Discover the latest movies and watch them online. Stay updated with the newest additions to our movie database." />
        <meta name="keywords" content="movies, latest movies, watch movies online, movie database" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Movie Database - Watch Latest Movies Online" />
        <meta property="og:description" content="Discover the latest movies and watch them online. Stay updated with the newest additions to our movie database." />
 
      </Head>
      <Header />
      <Hero />
      <LatestAdded />
    </>
  );
};

export default Index;
