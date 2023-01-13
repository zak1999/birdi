// import {Card, CardBody, Image } from '@chakra-ui/react'
import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {Box,Card,Text} from '@chakra-ui/react'

export default function ListItem({bird}) {
  
  const dispatch = useDispatch()

  async function handleBirdClick(){
    console.log("clicked",bird)
    // Update state in redux "Active card" 
    dispatch({type:'UPDATE_EXPLORE_BIRD',bird:bird})
  }

  return (
    <Card px='10px' py='5px' onClick={handleBirdClick}>
      <Box as="span" flex='1' textAlign='left'>
        <Text fontSize='lg' as={'b'} pl='2px'>{bird.comName}</Text>
        <Text >{bird.sciName}</Text>
        <Text as='sub'>Observed at {bird.obsDt}</Text>
      </Box>
    </Card>
  )
}
