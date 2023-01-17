import {Box, Heading, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import ListItem from './ListItem'

export default function List({data}) {
  
  
  const [list, setList] = useState([])



  useEffect(() => {
    if (data){
      setList([...data[0],...data[1]])
    }
  }, [data])
  

  return (
  <>
    <Heading size='md' pb='5px'>Recent Sightings</Heading>
    <Box overflow='auto' pr='5px' maxH='100%'
    css={{
    '&::-webkit-scrollbar': {
      width: '10px',
    },
    '&::-webkit-scrollbar-track': {
      width: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#202f2a',
      borderRadius: '24px',
    },
  }}>
      <Stack spacing='2'>
        {list && list.length > 0 && list.map(bird=>{
        return(
        <ListItem 
          key={bird.id} 
          bird={bird} 
          // onClick={()=>console.log("clicked",bird)} 
          />
        )})}
      </Stack>
    </Box>
  </>
  )
}
