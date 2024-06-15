import React, { useEffect, useState } from "react";
import { User, Button } from "@nextui-org/react";

const Actors = ({ tmdbId }) => {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=b5cd7be9dadc74b33077bede84a87bc0&language=cs-CZ&append_to_response=credits`
        );
        const data = await res.json();
        setCast(data.credits?.cast || []);
      } catch (error) {
        console.error("Error fetching cast:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [tmdbId]);

  if (loading) return <div>Loading cast...</div>;

  const castToShow = showAll ? cast : cast.slice(0, 10);

  return (
    <div>
      <h2 className="font-bold text-lg mt-5">Herci</h2>
      <div className="flex flex-row flex-wrap gap-5 mt-2 items-center justify-start ">
        {castToShow.length > 0 ? (
          castToShow.map((actor) => (
            <User
              key={actor.id}
              name={actor.name}
              description={actor.character}
              avatarProps={{
                src: `https://image.tmdb.org/t/p/w300${actor.profile_path}`,
              }}
            />
          ))
        ) : (
          <p className="text-center">Nemáme žádné informace o hercích.</p>
        )}
         {cast.length > 10 && !showAll && (
        
        <Button variant="light" onClick={() => setShowAll(true)}>
          Ukázat všechny herce
        </Button>
      
    )}
      </div>
     
    </div>
  );
};

export default Actors;
