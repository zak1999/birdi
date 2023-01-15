import { Box, Container, Text, Input, SimpleGrid } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Map from './Map'
import Navbar from './Navbar'

import {sendBirdSightingToDB} from '../API/dbFunctions'

export default function Upload() {
  const [lng, setLng] = useState(0)
  const [lat, setLat] = useState(0)

  async function handleSubmit(e){
    e.preventDefault();
    let d = new FormData(e.target)
    d.set('comName',d.get('comName'))
    d.set('sciName',d.get('sciName'))
    d.set('obsDt',d.get('obsDt'))
    d.set('lat',lat)
    d.set('lng',lng)
    d.append('file',d.get('file')[0])
    const x  = await sendBirdSightingToDB(d)
    console.log(x.json())
  }


  return (
    <Box>
      <Navbar/>
  <div>
    <Container>

      <form onSubmit={(e)=>handleSubmit(e)}>
      <SimpleGrid columns={2} spacing={2}>
        <label>Common Name</label>
        <Input 
          size='sm' 
          type="text" 
          name='comName' 
          placeholder='Common Name'
          variant='filled'/>
        <label>Scientific Name</label>
        <Input 
          size='sm' 
          type="text" 
          name='sciName' 
          placeholder='Scientific Name'
          variant='filled'/>
        <label>obsDt</label>
        <Input size='sm' type="datetime-local" id="obsDt" name="obsDt" variant='filled'/>
        <label>file</label>
        <Input size='sm' type="file" name='file' variant='filled'/>
        <button> Submit?</button>
      </SimpleGrid>
      </form>
      <Box >
        <Text>lat: {lat} &bull; lng: {lng}</Text>
      </Box>
        <Map coords={{setLng,setLat}}/>
    </Container>

    </div>

    </Box>
  )
}
