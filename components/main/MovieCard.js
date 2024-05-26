import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';

const MovieCard = () => {
  const movie = {
    title: "An Interesting Movie",
    poster_path: "a/test-image.jpg",
    overview: "An engaging and thought-provoking movie...",
    release_date: "2024-05-26",
    vote_average: (8.5)
};
  return (
    <Box
      width="100px"
      height="150px"
      bg="gray"
      position="relative"
    >
      <Image
        src='https://image.tmdb.org/t/w500/a/test-image.jpg'
        alt='An Interesting Movie'
        objectFit="cover"
      />
      <Box p="2" position="absolute" bottom="0" width="100%" bg-"rgba(0, 0, 0, 0.7)" padding="2" borderRadius="lg">
        <Text color="white" fontSize="sm" fontWeight="bold">
          {movie.title}
        </Text>
      </Box>
    </Box>
  );
};

export default MovieCard;
