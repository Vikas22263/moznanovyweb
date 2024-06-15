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
        <meta name="description" content="Sledujte online filmy zdarma v HD kvalitě bez registrace. Objevte tisíce filmů a seriálů ke sledování na naší stránce. Streamujte bez omezení, kdykoliv a kdekoliv." />
        <meta name="keywords" content="movies, latest movies, watch movies online, movie database, online filmy zdarma, bombuj, kukajto, svetserialu, filmovyraj, filmový ráj, filmovy raj, zdarma filmy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="❤️Filmový ráj - Online filmy zdarma ke zhlédnutí" />
        <meta property="og:description" content="Sledujte online filmy zdarma v HD kvalitě bez registrace. Objevte tisíce filmů a seriálů ke sledování na naší stránce. Streamujte bez omezení, kdykoliv a kdekoliv." />
 
      </Head>
      <Header />
      <Hero />
      <LatestAdded />
    </>
  );
};

export default Index;
