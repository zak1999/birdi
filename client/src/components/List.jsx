import {
  Box, Container, 
  Heading, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ListItem from './ListItem'

export default function List({data}) {
  
  const [list, setList] = useState([])

  useEffect(() => {
    setList(data[0])
  }, [data])
  

  return (
  <Box maxH='79%' p='0px' display='flex' flexDir='column'>
    <Heading as='h4' size='md' pb='10px'>Recent Sightings</Heading>
    <Box overflow='auto' pr='5px'>
      <Stack spacing='2'>
        {list && list.length > 0 && list.map(bird=>{
        return(
        <ListItem key={bird.id} bird={bird} onClick={()=>console.log("clicked",bird)} />
        )})}
      </Stack>
    </Box>
  </Box>
  )
}
