import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/header/main';
import Footer from '../../components/footer/main';
import { Input, Select, SelectItem, Chip } from '@nextui-org/react';
import Results from '../../components/search/results';

const years = Array.from(new Array(100), (val, index) => 2023 - index);

const dubs = [
  { label: "CZ", value: "cz" },
  { label: "EN", value: "en" },
];

const SearchPage = () => {
  const router = useRouter();
  const { query } = router.query; // Extract query from URL

  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState(new Set());
  const [selectedYear, setSelectedYear] = useState(new Set());
  const [selectedDub, setSelectedDub] = useState(new Set());
  const [movieName, setMovieName] = useState('');
  const [selectedSource, setSelectedSource] = useState('wish_me_luck');

  useEffect(() => {
    // Fetch genres from TMDB
    const fetchGenres = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=b5cd7be9dadc74b33077bede84a87bc0&language=cs-CZ');
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    if (query) {
      setMovieName(query);
    }
  }, [query]);

  useEffect(() => {
    if (selectedGenres.size > 0) {
      setMovieName('');
    }
  }, [selectedGenres]);

  useEffect(() => {
    if (movieName) {
      setSelectedGenres(new Set());
    }
  }, [movieName]);

  return (
    <>
      <Header />
      <div className='mt-[70px] flex flex-col xl:flex-row'>
        <div className='min-w-2/4 p-4'>
          <div className='shadow rounded-lg p-4'>
            <h1 className='text-xl font-semibold text-center'>Vyhledat film</h1>
            <div className='mt-2'>
              <Input 
                type="text" 
                label="Jméno filmu" 
                placeholder="Vyhledej film" 
                value={movieName}
                onChange={(e) => setMovieName(e.target.value)}
                disabled={selectedGenres.size > 0}
              />
            </div>
            <div className='mt-4'>
              <Select
                label="Vybrat Žánr"
                placeholder="Žánr"
                selectionMode="multiple"
                className="mt-2 w-full p-2"
                selectedKeys={selectedGenres}
                onSelectionChange={setSelectedGenres}
              >
                {genres.map((genre) => (
                  <SelectItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            
            
            <div className=''>
              <h2 className='text-sm mb-2'>Zdroje</h2>
              <div className='flex flex-row flex-wrap gap-2'>
                <Chip
                  variant='flat'
                  color={selectedSource === 'wish_me_luck' ? 'success' : 'default'}
                  onClick={() => setSelectedSource('wish_me_luck')}
                >
                  Wish me luck
                </Chip>
                <Chip
                  variant='flat'
                  color={selectedSource === 'private_source' ? 'danger' : 'default'}
                  onClick={() => setSelectedSource('private_source')}
                >
                  Private Source
                </Chip>
              </div>
            </div>
            
          </div>
        </div>
        <div className='md:w-5/5 xl:w-4/5 px-2'>
          <Results 
            selectedGenres={Array.from(selectedGenres)} 
            selectedYear={Array.from(selectedYear)} 
            selectedDub={Array.from(selectedDub)}
            movieName={movieName}
            selectedSource={selectedSource}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SearchPage;
