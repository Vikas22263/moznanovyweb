import { Chip, Image } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Flag from "react-world-flags";

const Details = ({ tmdbId }) => {
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [productionCompanies, setProductionCompanies] = useState([]);
  const [budget, setBudget] = useState(0);
  const [releaseDate, setReleaseDate] = useState("");
  const [rating, setRating] = useState(0);
  const [revenue, setRevenue] = useState(0);


  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=b5cd7be9dadc74b33077bede84a87bc0&language=cs-CZ`
        );
        const data = await res.json();
        setCountry(data.production_countries?.[0]?.name || "Unknown");
        setCountryCode(data.production_countries?.[0]?.iso_3166_1 || "");
        setOriginalTitle(data.original_title || "Unknown");
        setProductionCompanies(data.production_companies || []);
        setBudget(data.budget || 0);
        setReleaseDate(data.release_date || "Unknown");
        setRating(data.vote_average || 0);
        setRevenue(data.revenue || 0);

      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [tmdbId]);

  if (loading) return <div>Loading details...</div>;

  return (
    <div className="flex flex-col">
      <div className="w-2/2">
        <h3 className="font-bold text-lg mt-5">Detaily</h3>
        <div className="flex flex-col">
          <div className="flex flex-row text-sm opacity-80 items-center">
            <p className="font-semibold">Země původu: </p>
            {countryCode && (
              <Flag
                code={countryCode}
                className="ml-2"
                style={{ width: "24px", height: "16px" }}
              />
            )}
            <p className="ml-2">{country}</p>
          </div>
          <div className="flex flex-row text-sm opacity-80 items-center">
            <p className="font-semibold">Originální název: </p>
            <p className="ml-2">{originalTitle}</p>
          </div>
          <div className="flex flex-row text-sm opacity-80 items-center">
            <p className="font-semibold">Produkce: </p>
            <div className="ml-2 flex flex-col items-start">
              {productionCompanies.map((company) => (
                <div key={company.id} className="flex items-center ml-2">
                  <p>{company.name}</p>
                  
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-row text-sm opacity-80 items-center">
            <p className="font-semibold">Budget: </p>
            <p className="ml-2">{budget > 0 ? `${budget.toLocaleString()}$` : "Unknown"}</p>
          </div>
          <div className="flex flex-row text-sm opacity-80 items-center">
            <p className="font-semibold">Profit: </p>
            <p className="ml-2">{revenue > 0 ? `${revenue.toLocaleString()}$` : "Unknown"}</p>
          </div>
          <div className="flex flex-row text-sm opacity-80 items-center">
            <p className="font-semibold">Hodnocení: </p>
            <p className="ml-2">{rating}/10</p>
          </div>
          <div className="flex flex-row text-sm opacity-80 items-center">
            <p className="font-semibold">Datum vydání: </p>
            <p className="ml-2">{releaseDate}</p>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Details;
