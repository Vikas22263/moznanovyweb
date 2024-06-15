import React, { useEffect, useState } from "react";
import { Button, Card, Skeleton } from "@nextui-org/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const LatestAdded = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const skeletons = Array.from({ length: 14 });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://storage.filmovyraj.com/api/public/displayMovies?page=1&limit=14`
        );
        const data = await response.json();

        if (data.movies) {
          const movieDetails = await Promise.all(
            data.movies.map(async (movie) => {
              const tmdbResponse = await fetch(
                `https://api.themoviedb.org/3/movie/${movie.tmdbId}?api_key=b5cd7be9dadc74b33077bede84a87bc0&language=cs-CZ`
              );
              return await tmdbResponse.json();
            })
          );
          setMovies(movieDetails);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <>
    <div>
      <h2 className="text-xl font-semibold mt-5">Naposledy přidané</h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 mt-5">
        {skeletons.map((_, index) => (
          <Card key={index} className="flex flex-col justify-end items-center h-[300px]">
            <Skeleton className="w-[100px] h-[20px] rounded-full" />
            <Skeleton className="w-full h-[30px] rounded-full mt-2" />
          </Card>
        ))}
      </div>
    </div>
      </>
    ); // Use your skeleton loader here
  }

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold">Naposledy přidané</h2>
      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="rounded-md relative flex flex-col w-full h-[350px] sm:h-[300px] bg-cover bg-center bg-no-repeat justify-top hover:translate-y-[-10px] transition-all ease-in-out duration-300 "
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
                href={`/film/${movie.id}/${movie.title}`}
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
    </div>
  );
};

export default LatestAdded;
