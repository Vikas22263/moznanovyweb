import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';

const MovieCard = ({ movie }) => {
  return (
    <Box
      width="100px"
      height="150px"
      bg-"gray"
      position="relative"
    >
      <Image
        src={`normal: $https://image.tmdb.org/t/w500/${movie.poster_path}`}
        alt={movie.title}
        objectFit="cover"
      />
      <Box p="2" position="absolute" bottom="0" width="100%" bg="rgba(0, 0, 0, 0.7)" padding="2" borderRadius="lg">
        <Text color="white" fontSize="sm" fontWeight="bold">
          {{movie.title}}
        </Text>
      </Box>
    </Box>
  );
};

export default MovieCard;
