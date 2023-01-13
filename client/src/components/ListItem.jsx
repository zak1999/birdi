// import {Card, CardBody, Image } from '@chakra-ui/react'
import React from 'react'
import { useEffect, useState } from 'react'

import {
  Box, 
  Card, 
  Text} from '@chakra-ui/react'

export default function ListItem({bird}) {
  
  
  async function handleClick(){
    // Update state in redux "Active card" 
  }

  return (
    <Card>
      <h2>
        <Box as="span" flex='1' textAlign='left'>
          <Text pl='2px'>{bird.comName}</Text>
          <Text pl='2px'>{bird.sciName}</Text>
          <Text pl='2px'>Observed at {bird.obsDt}</Text>


          
        </Box>
      </h2>
    </Card>
  )
}
