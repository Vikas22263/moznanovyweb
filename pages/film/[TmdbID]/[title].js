import React from 'react';
import Head from 'next/head';
import { Image } from "@nextui-org/image";
import Header from '@/components/header/main';
import Actors from '@/components/film/actors'; // Ensure the correct path to the actors component
import Details from '@/components/film/details';
import Collection from '@/components/film/collection'; // Ensure the correct path to the collection component
import dynamic from 'next/dynamic';
import { Card } from '@nextui-org/react';

const VideoPlayer = dynamic(() => import('@/components/film/VideoPlayer'), { ssr: false });

const MovieDetail = ({ movie, sources }) => {
  const liveSource = sources.find(source => source.status === 'Live');

  return (
    <>
      <Head>
        <title>{movie.title} - Online zdarma ke zhlédnutí</title>
        <meta name="description" content={movie.overview} />
        <meta name="keywords" content={`watch ${movie.title}, ${movie.title} online, latest movies, ${movie.title} streaming`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={`${movie.title} - Watch Online`} />
        <meta property="og:description" content={movie.overview} />
        <meta property="og:image" content={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/path/to/your/default-image.jpg'} />

      </Head>
      <Header />
      <div className='mt-[70px] px-5'>
        
        {liveSource ? (
          <VideoPlayer src={liveSource.url} status={liveSource.status} tmdbId={movie.id} />
        ) : (
          <div className="w-full relative w-4/5">
            <Image
              width={1920}
              alt="Movie ready"
              src="/missingmovie.webp"
              className="object-cover"
            />
            <div className="flex row justify-center items-center absolute left-0 top-0 w-full h-full z-10 ">
              <Card className='px-5 py-2'>
                <p>FIlm není dostupný, ale můžeš si o něj požádat!</p>
              </Card>
            </div>
          </div>
        )}
        <div className='mt-5'>
          
          <h1 className='font-bold text-xl'>{movie.title}</h1>
          <p className='text-sm opacity-70 mb-5'>Horror, Komedie, Thriller</p>
          <p className='text-sm opacity-80'>{movie.overview}</p>
          <Collection tmdbId={movie.id} />
          <div className='grid grid-cols-1 md:grid-cols-2'>
            <Details tmdbId={movie.id} />
            <Actors tmdbId={movie.id} />
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { TmdbID } = context.params;

  try {
    // Fetch movie details from TMDB
    const movieRes = await fetch(`https://api.themoviedb.org/3/movie/${TmdbID}?api_key=b5cd7be9dadc74b33077bede84a87bc0&language=cs-CZ`);
    const movieData = await movieRes.json();

    // Fetch movie sources from your API
    const sourcesRes = await fetch('https://storage.filmovyraj.com/api/public/getMovieSource', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tmdbId: TmdbID })
    });
    const sourcesData = await sourcesRes.json();

    return {
      props: {
        movie: movieData,
        sources: sourcesData.movie.sources || [],
      },
    };
  } catch (error) {
    console.error("Error fetching movie or sources:", error);
    return {
      props: {
        movie: null,
        sources: [],
      },
    };
  }
}

export default MovieDetail;
