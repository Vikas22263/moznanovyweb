import React from 'react';
import { ChakraProvider, Box, extendTheme } from '@chakra-ui/react';
import Header from '../components/Header';
import Welcome from '../components/Welcome';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'black',
        color: 'white'
      }
    }
  }
});

const Index = () => {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Box>
        <Welcome />
      </Box>
    </ChakraProvider>
  );
};

export default Index;
