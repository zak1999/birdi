import { Box, Container, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ListItem from './ListItem'

export default function List({data}) {
  
  const [list, setList] = useState([])

  useEffect(() => {
    setList(data[0])
  }, [data])
  

  return (
    <Box overflow='auto'>
      <Heading as='h4' size='md'>
        Recent Sightings
      </Heading>
      <Box>
        <ul>
        {list && list.length > 0 && list.map(item=>{
        return(
          <ListItem bird={item} onClick={()=>console.log("clicked",item)} />
        )})}
        </ul>
      </Box>
    </Box>
  )
}
