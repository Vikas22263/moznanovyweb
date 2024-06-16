import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { Pagination } from '@nextui-org/pagination';
import Head from 'next/head';

const Results = ({ movieName, selectedGenres, selectedSource }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let url;
        let isLocalSource = false;

        if (selectedSource === 'wish_me_luck') {
          if (selectedGenres.length > 0) {
            const genreString = selectedGenres.join(',');
            url = `https://api.themoviedb.org/3/discover/movie?api_key=b5cd7be9dadc74b33077bede84a87bc0&language=cs-CZ&page=${page}&with_genres=${genreString}`;
          } else if (movieName) {
            url = `https://api.themoviedb.org/3/search/movie?api_key=b5cd7be9dadc74b33077bede84a87bc0&language=cs-CZ&page=${page}&query=${movieName}`;
          } else {
            url = `https://api.themoviedb.org/3/discover/movie?api_key=b5cd7be9dadc74b33077bede84a87bc0&language=cs-CZ&page=${page}`;
          }
        } else if (selectedSource === 'private_source') {
          const genreString = selectedGenres.join(',');
          if (selectedGenres.length > 0) {
            url = `https://storage.filmovyraj.com/api/public/searchMovieGenre?genre=${genreString}`;
          } else if (movieName) {
            url = `https://storage.filmovyraj.com/api/public/searchMovie?query=${movieName}`;
          } else {
            url = `https://storage.filmovyraj.com/api/public/searchMovie?query=`;
          }
          isLocalSource = true;
        } else {
          setMovies([]);
          setTotalPages(0);
          return;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (isLocalSource) {
          setMovies(Array.isArray(data) ? data : []);
          setTotalPages(1); // Assuming local source doesn't provide pagination
        } else {
          setMovies(data.results || []);
          setTotalPages(data.total_pages || 0);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        setMovies([]);
        setTotalPages(0);
      }
    };

    fetchMovies();
  }, [movieName, selectedGenres, selectedSource, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <Head>
        <title>❤️Filmový ráj - Vyhledávání filmů</title>
        <meta name="description" content={`Výsledky vyhledávání pro ${movieName || 'žánr'} ${selectedGenres.join(', ')}`} />
        <meta name="keywords" content={`movies, latest movies, watch movies online, movie database, online filmy zdarma, ${selectedGenres.join(', ')}, ${movieName}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={`❤️Filmový ráj - Výsledky vyhledávání pro ${movieName || 'žánr'} ${selectedGenres.join(', ')}`} />
        <meta property="og:description" content={`Výsledky vyhledávání pro ${movieName || 'žánr'} ${selectedGenres.join(', ')} na Filmovém ráji. Sledujte online filmy zdarma v HD kvalitě bez registrace.`} />
      </Head>
      <h2>Vyhledávání pro film "{movieName}"</h2>
      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.isArray(movies) && movies.map((movie) => (
          <div
            key={selectedSource === 'private_source' ? movie.tmdbId : movie.id}
            className="rounded-md relative flex flex-col w-full h-[350px] sm:h-[400px] bg-cover bg-center bg-no-repeat justify-top hover:translate-y-[-10px] transition-all ease-in-out duration-300"
            style={{
              backgroundImage: `url(https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#10101099] to-transparent"></div>
            <div className="relative flex flex-col justify-end items-center h-full z-10 p-2">
              <p className="text-center font-bold text-white px-2 mb-3">
                {movie.title}
              </p>
              <Link
                className="w-full"
                href={`/film/${selectedSource === 'private_source' ? movie.tmdbId : movie.id}/${movie.title}`}
              >
                <Button
                  variant="flat"
                  size="sm"
                  className="bg-white text-black px-4 py-2 rounded-3xl w-full"
                >
                  Sledovat
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className='mt-2 flex justify-center'>
        <Pagination 
          total={totalPages} 
          initialPage={1} 
          page={page} 
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Results;
