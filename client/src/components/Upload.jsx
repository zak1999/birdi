import { Box, Container, Text, Input, SimpleGrid, Button, Card } from '@chakra-ui/react'
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
      <Container minW='2xl' bg='brand.darkish2' overflow='hidden' display='flex' flexDir='column' justifyContent='center' my='auto'>
        <Card bg='brand.whiteish.def' p='10px'>
        <form onSubmit={(e)=>handleSubmit(e)} style={{display:'flex',flexDirection:'column'}}>
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
          <label>Observed At</label>
          <Input _hover={{bg:'brand.whiteish.hover'}} required size='sm' type="datetime-local" id="obsDt" name="obsDt" border='1px'/>
          <label>File</label>
          <Input border='1px' _hover={{bg:'brand.whiteish.hover'}} required size='sm' type="file" name='file'/>
        </SimpleGrid>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
        <Text as={'b'}>lat: {lat.toFixed(4)} &bull; lng: {lng.toFixed(4)}</Text>
          <Button
            type='submit'
            bg='brand.darkish'
            color='brand.whiteish.def'
            _hover={{bg:'brand.whiteish.hover'}}
            mr='10px' 
            my='10px'>Submit
          </Button>
        </Box>
        </form>
        </Card>
        <Box mt='20px'>
        </Box>
        <Box maxH='80vh' >
          <Map coords={{setLng,setLat}} dot/>
        </Box>
    </Container>


    </Box>
  )
}
