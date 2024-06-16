import React, { useState, useEffect } from "react";
import { MediaOutlet, MediaPlayer } from "@vidstack/react";
import { Image } from "@nextui-org/image";
import { Button, Card, Chip } from "@nextui-org/react";
import { Play } from "lucide-react";
import axios from "axios";

const VideoPlayer = ({ src, status, tmdbId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sources, setSources] = useState([]);
  const [selectedSourceId, setSelectedSourceId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSources = async () => {
      try {
        const response = await axios.post(
          `https://storage.filmovyraj.com/api/public/getMovieSource`,
          { tmdbId }
        );
        const sources = response.data.movie.sources;
        const uniqueTags = {};
        sources.forEach((source, index) => {
          const tag = source.tag;
          if (uniqueTags[tag]) {
            uniqueTags[tag]++;
            source.tag = `${tag} ${uniqueTags[tag]}`;
          } else {
            uniqueTags[tag] = 1;
          }
        });
        setSources(sources);
        if (sources.length > 0) {
          setSelectedSourceId(sources[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch movie sources:", error);
        setError('Failed to fetch movie sources.');
      }
    };

    if (tmdbId) {
      fetchSources();
    }
  }, [tmdbId]);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const handleSourceClick = (sourceId) => {
    setSelectedSourceId(sourceId);
  };

  const selectedSource = sources.find(source => source.id === selectedSourceId);

  if (!isPlaying && status === "Live") {
    return (
      <div className="flex flex-col md:flex-row gap-2">
        <div className="w-full relative md:w-4/5">
          <Image
            width={1920}
            alt="Movie ready"
            src="/movieready.webp"
            className="object-cover"
          />
          <div className="flex row justify-center items-center absolute left-0 top-0 w-full h-full">
            <Button
              isIconOnly
              className="bg-white text-black z-10 rounded-full"
              onClick={handlePlayClick}
            >
              <Play fill="black" />
            </Button>
          </div>
        </div>
        <Card className="md:w-1/5 p-2" isFooterBlurred>
          <div className="text-center">
            <p className="font-semibold text-xl">Zdroj</p>
          </div>
          <div className="mt-5 flex flex-col gap-2">
            {sources.map((source) => (
              <div
                key={source.id}
                className={`flex flex-row items-center gap-1 px-5 py-2 rounded-md justify-center cursor-pointer transition-all ease-in-out ${
                  selectedSourceId === source.id ? 'bg-green-400' : 'hover:bg-green-400'
                }`}
                onClick={() => handleSourceClick(source.id)}
              >
                <p
                  className={`${
                    selectedSourceId === source.id
                      ? 'text-black'
                      : 'text-white group-hover:text-black'
                  }`}
                >
                  {source.tag}
                </p>
                <Chip
                  variant="shadow"
                  color="danger"
                  size="sm"
                >
                  {source.dabing}
                </Chip>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  if (!src && !selectedSource?.url) {
    return <>
    <div className="flex flex-col md:flex-row gap-2">
    <div className="relative w-full md:w-4/5">
            <Image
              width={1920}
              alt="Movie ready"
              src="/missingmovie.webp"
              className="object-cover"
            />
            <div className="flex row justify-center items-center absolute left-0 top-0 w-full h-full z-10 ">
              <Card className='px-5 py-2'>
                <p>Bohužel, ani štěstí nepomůže, ale můžeš nám napsat na discord!</p>
              </Card>
            </div>
          </div>
          <Card className="md:w-1/5 p-2" isFooterBlurred>
          <div className="text-center">
            <p className="font-semibold text-xl">Zdroj</p>
          </div>
          <div className="mt-5 flex flex-col gap-2">
            {sources.map((source) => (
              <div
                key={source.id}
                className={`flex flex-row items-center gap-1 px-5 py-2 rounded-md justify-center cursor-pointer transition-all ease-in-out ${
                  selectedSourceId === source.id ? 'bg-green-400' : 'hover:bg-green-400'
                }`}
                onClick={() => handleSourceClick(source.id)}
              >
                <p
                  className={`${
                    selectedSourceId === source.id
                      ? 'text-black'
                      : 'text-white group-hover:text-black'
                  }`}
                >
                  {source.tag}
                </p>
                <Chip
                  variant="shadow"
                  color="danger"
                  size="sm"
                >
                  {source.dabing}
                </Chip>
              </div>
            ))}
          </div>
        </Card>
        </div>
    </>;
  }

  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-2">
      <div className="md:w-4/5">
        <MediaPlayer
          src={selectedSource?.url || src}
          poster="/movieready.webp"
          controls
          autoplay
          width="100%"
          className="w-full h-full"
        >
          <MediaOutlet className="w-full h-full" />
        </MediaPlayer>
      </div>
      <Card className="md:w-1/5 p-2" isFooterBlurred>
          <div className="text-center">
            <p className="font-semibold text-xl">Zdroj</p>
          </div>
          <div className="mt-5 flex flex-col gap-2">
            {sources.map((source) => (
              <div
                key={source.id}
                className={`flex flex-row items-center gap-1 px-5 py-2 rounded-md justify-center cursor-pointer transition-all ease-in-out ${
                  selectedSourceId === source.id ? 'bg-green-400' : 'hover:bg-green-400'
                }`}
                onClick={() => handleSourceClick(source.id)}
              >
                <p
                  className={`${
                    selectedSourceId === source.id
                      ? 'text-black'
                      : 'text-white group-hover:text-black'
                  }`}
                >
                  {source.tag}
                </p>
                <Chip
                  variant="shadow"
                  color="danger"
                  size="sm"
                >
                  {source.dabing}
                </Chip>
              </div>
            ))}
          </div>
        </Card>
    </div>
  );
};

export default VideoPlayer;
