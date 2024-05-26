import React from 'react';
import { Box, Flex, Button, useColorMode, useColorModeValue, IconButton, Heading, HStack, Link, Spacer } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FiMenu } from 'react-icons/fi';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'black');
  const color = useColorModeValue('black', 'white');
  const hoverBg = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box bg={bg} px={4} borderBottom="1px" borderColor={useColorModeValue('gray.200', 'gray.700')}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={<FiMenu />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          bg={bg}
          color={color}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Heading as="h1" size="lg" color={color}>
            MovieStream
          </Heading>
          <HStack
            as={'nav'}
            spacing={4}
            display={{ base: 'none', md: 'flex' }}
          >
            <Link
              px={3}
              py={2}
              rounded={'md'}
              _hover={{ textDecoration: 'none', bg: hoverBg }}
              href={'#'}
              fontWeight="bold"
              color={color}
            >
              Home
            </Link>
            <Link
              px={3}
              py={2}
              rounded={'md'}
              _hover={{ textDecoration: 'none', bg: hoverBg }}
              href={'#'}
              fontWeight="bold"
              color={color}
            >
              Movies
            </Link>
            <Link
              px={3}
              py={2}
              rounded={'md'}
              _hover={{ textDecoration: 'none', bg: hoverBg }}
              href={'#'}
              fontWeight="bold"
              color={color}
            >
              Series
            </Link>
            <Link
              px={3}
              py={2}
              rounded={'md'}
              _hover={{ textDecoration: 'none', bg: hoverBg }}
              href={'#'}
              fontWeight="bold"
              color={color}
            >
              My List
            </Link>
          </HStack>
        </HStack>
        <Spacer />
        <Flex alignItems={'center'}>
          <Button onClick={toggleColorMode} ml={4}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
          <Button ml={4} variant="solid" colorScheme="teal">
            Login
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
