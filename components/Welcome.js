import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Button, VStack, HStack, Icon, Image, Badge } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import axios from 'axios';
import { FaPlay, FaPlus } from 'react-icons/fa';

SwiperCore.use([Navigation, Pagination, Autoplay]);

const Welcome = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=b5cd7be9dadc74b33077bede84a87bc0`);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const mainMovie = movies[0]; // Assume the first movie as the main movie

  return (
    <Box width="100%" height="100vh" overflow="hidden" position="relative">
      {mainMovie && (
        <Box
          bgImage={`url(https://image.tmdb.org/t/p/original/${mainMovie.backdrop_path})`}
          bgPosition="center"
          bgSize="cover"
          width="100%"
          height="60vh"
          position="relative"
        >
          <Box bg="rgba(0, 0, 0, 0.6)" position="absolute" top="0" left="0" width="100%" height="100%" />
          <VStack
            spacing={4}
            align="start"
            position="absolute"
            bottom="20%"
            left="10%"
            bg="rgba(0, 0, 0, 0.7)"
            p={8}
            borderRadius="md"
            backdropFilter="blur(10px)"
            maxWidth="40%"
            color="white"
          >
            <Heading size="2xl" fontWeight="bold">
              {mainMovie.title}
            </Heading>
            <HStack>
              <Badge colorScheme="yellow" fontSize="1em">{mainMovie.vote_average}</Badge>
              <Text>{mainMovie.release_date}</Text>
            </HStack>
            <Text fontSize="lg" noOfLines={4}>
              {mainMovie.overview}
            </Text>
            <HStack spacing={4}>
              <Button leftIcon={<FaPlay />} colorScheme="teal" variant="solid" size="lg">
                Watch Now
              </Button>
              <Button leftIcon={<FaPlus />} colorScheme="teal" variant="outline" size="lg">
                Add to List
              </Button>
            </HStack>
          </VStack>
        </Box>
      )}
      
    </Box>
  );
};

export default Welcome;
