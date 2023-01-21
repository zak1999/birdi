// import {Card, CardBody, Image } from '@chakra-ui/react'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Card, Text } from '@chakra-ui/react';

export default function ListItem({ bird }) {
  const SelectedBirdOnExplore = useSelector(
    (state) => state.SelectedBirdOnExplore
  );

  const dispatch = useDispatch();

  async function handleBirdClick() {
    // Update state in redux "Active card"
    dispatch({ type: 'UPDATE_EXPLORE_BIRD', bird: bird });
  }

  return (
    <Card
      shadow=''
      px='10px'
      py='5px'
      onClick={handleBirdClick}
      className='act-as-btn'
      _hover={{ bg: 'brand.whiteish.hover' }}
      bg={
        SelectedBirdOnExplore && bird.id === SelectedBirdOnExplore.id
          ? 'brand.whiteish.hover'
          : 'brand.whiteish.def'
      }
      transition='0.2s'
    >
      <Box as='span' flex='1' role='list-item' textAlign='left'>
        <Text fontSize='lg' as={'b'} pl='2px'>
          {bird.comName}
        </Text>
        <Text>{bird.sciName}</Text>
        <Text as='sub'>Observed at {bird.obsDt}</Text>
      </Box>
    </Card>
  );
}
