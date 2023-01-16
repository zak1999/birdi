import { Box, Container, Text, Input, SimpleGrid, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'
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
    return <Navigate to={'/'} replace />
  }


  return (
    <Box>
      <Navbar/>    
      <Container minW='2xl' bg='brand.whiteish.def'>
        <form onSubmit={(e)=>handleSubmit(e)}>
        <SimpleGrid columns={2} spacing={2}>
          <label>Common Name</label>
          <Input
            required
            size='sm' 
            type="text" 
            name='comName' 
            placeholder='Common Name'
            border='1px' _hover={{bg:'brand.whiteish.hover'}}/>
          <label>Scientific Name</label>
          <Input 
            required 
            size='sm' 
            type="text" 
            name='sciName' 
            placeholder='Scientific Name'
            border='1px' _hover={{bg:'brand.whiteish.hover'}}/>
          <label>observed at</label>
          <Input _hover={{bg:'brand.whiteish.hover'}} required size='sm' type="datetime-local" id="obsDt" name="obsDt" border='1px'/>
          <label>file</label>
          <Input  border='1px' _hover={{bg:'brand.whiteish.hover'}} required size='sm' type="file" name='file'/>
        </SimpleGrid>
          <Button
            type='submit'
            justifySelf='end'
            bg='brand.whiteish.def'
            _hover={{bg:'brand.whiteish.hover'}}
            mr='10px' 
            my='10px'>Submit
          </Button>
        </form>
        <Box >
          <Text>lat: {lat.toFixed(4)} &bull; lng: {lng.toFixed(4)}</Text>
        </Box>
        <Box maxH='75vh'>
          <Map coords={{setLng,setLat}} dot/>
        </Box>
    </Container>


    </Box>
  )
}
