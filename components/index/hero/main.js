import React, { useEffect, useState } from "react";
import { Button, Card, Chip, Tooltip } from "@nextui-org/react";
import { Bookmark, Play } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@nextui-org/skeleton";

const Main = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        // Fetch the movie list from the provided API
        const response = await fetch(
          `https://storage.filmovyraj.com/api/public/displayMovies?page=1&limit=1`
        );
        const data = await response.json();

        if (data.movies && data.movies.length > 0) {
          const firstMovie = data.movies[0];
          const tmdbId = firstMovie.tmdbId;

          // Fetch the movie details from TMDB API using the tmdbId
          const tmdbResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=b5cd7be9dadc74b33077bede84a87bc0&language=cs-CZ`
          );
          const tmdbData = await tmdbResponse.json();
          setMovie(tmdbData);
        }
      } catch (error) {
        console.error("Error fetching the movie:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, []);

  if (loading) {
    return (
      <div>
        <div>
          <Card className="w-full h-[600px] flex flex-col justify-end p-10">
            <div className="flex flex-col">
              <Skeleton className="w-[100px] h-[25px] rounded-full" />
              <Skeleton className="w-[200px] h-[35px] rounded-full mt-3" />
              <Skeleton className="w-[350px] h-[10px] rounded-full mt-5" />
              <Skeleton className="w-[300px] h-[10px] rounded-full mt-2" />
              <div className="flex flex-row gap-5 mt-10">
                <Button
                  className="bg-white text-black px-4 py-2 rounded-3xl w-1/2 lg:w-fit"
                  variant="flat"
                  startContent={<Play size={16} color="black" fill="black" />}
                >
                  Watch Now
                </Button>

                <Tooltip content="Již brzy!" placement="bottom">
                  <Button
                    className="px-4 py-2 rounded-3xl w-1/2 lg:w-fit"
                    variant="bordered"
                    startContent={
                      <Bookmark size={16} color="white" fill="white" />
                    }
                  >
                    My List
                  </Button>
                </Tooltip>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (!movie) {
    return <div>
    <div>
      <Card className="w-full h-[600px] flex flex-col justify-end p-10">
        <div className="flex flex-col">
          <Skeleton className="w-[100px] h-[25px] rounded-full" />
          <Skeleton className="w-[200px] h-[35px] rounded-full mt-3" />
          <Skeleton className="w-[350px] h-[10px] rounded-full mt-5" />
          <Skeleton className="w-[300px] h-[10px] rounded-full mt-2" />
          <div className="flex flex-row gap-5 mt-10">
            <Button
              className="bg-white text-black px-4 py-2 rounded-3xl w-1/2 lg:w-fit"
              variant="flat"
              startContent={<Play size={16} color="black" fill="black" />}
            >
              Watch Now
            </Button>

            <Tooltip content="Již brzy!" placement="bottom">
              <Button
                className="px-4 py-2 rounded-3xl w-1/2 lg:w-fit"
                variant="bordered"
                startContent={
                  <Bookmark size={16} color="white" fill="white" />
                }
              >
                My List
              </Button>
            </Tooltip>
          </div>
        </div>
      </Card>
    </div>
  </div>;
  }

  const truncateOverview = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  return (
    <div className="">
      <div className=" relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat max-h-[600px] lg:max-h-[800px] xl:max-h-[1000px] 2xl:max-h-[1200px]"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#101010] to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#10101070] to-transparent"></div>
        </div>
        <div className="relative z-10 text-white p-5 flex flex-col gap-2 bottom-0 pt-[300px] lg:pt-[400px] xl:pt-[500px] 2xl:pt-[600px] lg:pb-[100px] lg:pl-[50px]">
          <Chip>Naposledy přidané</Chip>
          <h1 className="text-3xl lg:text-5xl font-semibold ">{movie.title}</h1>
          <p className="opacity-80 lg:max-w-3xl">
            {truncateOverview(movie.overview, 40)}
          </p>
          <div className="flex flex-row gap-5 justify-center lg:justify-start mt-5">
            <Link href={`/film/${movie.id}/${movie.title}`}>
              <Button
                className="bg-white text-black px-4 py-2 rounded-3xl w-1/2 lg:w-fit"
                variant="flat"
                startContent={<Play size={16} color="black" fill="black" />}
              >
                Watch Now
              </Button>
            </Link>
            <Tooltip content="Již brzy!" placement="bottom">
              <Button
                className="px-4 py-2 rounded-3xl w-1/2 lg:w-fit"
                variant="bordered"
                startContent={<Bookmark size={16} color="white" fill="white" />}
              >
                My List
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
