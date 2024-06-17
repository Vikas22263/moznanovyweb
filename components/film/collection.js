import React, { useEffect, useState } from 'react';
import { Button } from "@nextui-org/react";
import Link from 'next/link';

const Collection = ({ tmdbId }) => {
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=b5cd7be9dadc74b33077bede84a87bc0&language=cs-CZ`
        );
        const movieData = await res.json();
        if (movieData.belongs_to_collection) {
          const collectionRes = await fetch(
            `https://api.themoviedb.org/3/collection/${movieData.belongs_to_collection.id}?api_key=b5cd7be9dadc74b33077bede84a87bc0&language=cs-CZ`
          );
          const collectionData = await collectionRes.json();

          // Sort the collection parts by release year
          collectionData.parts.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

          setCollection(collectionData);
        }
      } catch (error) {
        console.error("Error fetching collection:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [tmdbId]);

  if (loading) return <div>Loading collection...</div>;

  if (!collection) return null;

  return (
    <div className="mt-5">
      <h2 className="text-xl font-semibold">Kolekce</h2>
      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
        {collection.parts.map(movie => (
          <div key={movie.id} className="rounded-md relative flex flex-col w-full h-[350px] sm:h-[300px] bg-cover bg-center bg-no-repeat justify-top hover:translate-y-[-10px] transition-all ease-in-out duration-300 cursor-pointer" style={{
            backgroundImage: `url(https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path})`,
          }}>
            <div className="absolute inset-0 bg-gradient-to-t from-[#10101099] to-transparent"></div>
            <div className="relative flex flex-col justify-end items-center h-full z-10 p-2">
              <p className="text-center font-bold text-white px-2 mb-3">{movie.title}</p>
              <Link className="w-full" href={`/film/${movie.id}/${movie.title}`}>
                <Button variant="flat" size="sm" className="bg-white text-black px-4 py-2 rounded-3xl w-full">Sledovat</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;
