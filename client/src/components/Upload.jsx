import { Box, Container, Text, Input, SimpleGrid } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {sendBirdSightingToDB} from '../API/dbFunctions'

import Map from './Map'
import Navbar from './Navbar'


export default function Upload() {
  const [lng, setLng] = useState(0)
  const [lat, setLat] = useState(0)

  const userInfo = useSelector(state=>state.userInfo);

  async function handleSubmit(e){
    e.preventDefault();
    let d = new FormData(e.target)
    d.set('comName',d.get('comName'))
    d.set('sciName',d.get('sciName'))
    d.set('obsDt',d.get('obsDt'))
    d.set('lat',lat)
    d.set('lng',lng)
    d.set('userID',userInfo._id)
    d.set('userEmail',userInfo.email)
    d.append('file',d.get('file')[0])
    const x  = await sendBirdSightingToDB(d)
    console.log(x)
  }


  return (
    <Box>
      <Navbar/>
  <div>
    <Container minW='2xl'>
      <form onSubmit={(e)=>handleSubmit(e)}>
      <SimpleGrid columns={2} spacing={2}>
        <label>Common Name</label>
        <Input 
          required
          size='sm' 
          type="text" 
          name='comName' 
          placeholder='Common Name'
          variant='filled'/>
        <label>Scientific Name</label>
        <Input 
          required 
          size='sm' 
          type="text" 
          name='sciName' 
          placeholder='Scientific Name'
          variant='filled'/>
        <label>observed at</label>
        <Input required size='sm' type="datetime-local" id="obsDt" name="obsDt" variant='filled'/>
        <label>file</label>
        <Input required size='sm' type="file" name='file' variant='filled'/>
        <button> Submit?</button>
      </SimpleGrid>
      </form>
      <Box >
        <Text>lat: {lat.toFixed(4)} &bull; lng: {lng.toFixed(4)}</Text>
      </Box>
      <Box maxH='75vh'>
        <Map coords={{setLng,setLat}} dot/>
      </Box>
    </Container>

    </div>

    </Box>
  )
}
