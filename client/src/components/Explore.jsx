import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Map from './Map'
import List from './List'
import ActiveCard from './ActiveCard'
import {collectBirdLocationsFromAPI} from '../API/eBirdApiFunctions'
import {collectBirdLocationsFromDB} from '../API/dbFunctions'

import { Box, Container, Flex, Card, Heading, Spinner, useToast,} from '@chakra-ui/react'
import { useSelector } from 'react-redux'

export default function Explore() {
  const toast = useToast();
  
  const SelectedBirdOnExplore = useSelector(state=>state.SelectedBirdOnExplore);
  
  const [data, setData] = useState(null)// list of lists : [apiData, dbData]

  const [lng, setLng] = useState(0)
  const [lat, setLat] = useState(0)
  const [loading, setLoading] = useState(true)

  // initial data collect
  useEffect(() => {
    setLoading(true)
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(async (pos)=>{
        await handleRecollect(pos.coords.longitude, pos.coords.latitude)
      })
    }else{
      handleRecollect(0,0)
    }
  }, [])

  async function handleRecollect(lng,lat){
    try {
      const APIData = await collectBirdLocationsFromAPI(lng,lat)
      const dbData = await collectBirdLocationsFromDB();
      const newArr = []
      if (!dbData || !APIData) return;
      // The following forloop runs through (up to) 100 sightings and collects 
      // the first sighting with unique coordinates(lat,lng), and pushes it 
      // to 'newArr'. This is done so that there isn't a bunch of marks ontop
      // of eachother on map render. Optimization that helps map be less slow/laggy
      for (let i = 0; i < APIData.length; i ++) {
        if (newArr.find((x)=> (x.lat==APIData[i].lat && x.lng == APIData[i].lng ))){}
        else{
          newArr.push(APIData[i])
        } 
      }
      newArr.forEach((bird, i) => {
        bird.id = i;
      });
      dbData.forEach((bird, i) =>{
        bird.id = i + newArr.length;// to make sure there are no duplicates
      });
      // Sort by observed at
      setData([newArr,dbData])
      setLoading(false)
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <>
    <Navbar/>
    <Container
      display='flex'
      bg='brand.darkish2'
      minW='85vw' p='20px' maxH='87vh'>
        <Box className='left-side' 
          w='35%' 
          display='flex' 
          flexDir='column' 
          maxH='90vh' 
          pb='2px'
          pr='3px'
          >
          <Box minH='180px' maxH='180px' pb='10px' pr='10px'>
          {SelectedBirdOnExplore ? 
            <ActiveCard bird={SelectedBirdOnExplore}/>
            :
            <Card 
              minH='180px' maxH='180px' pb='10px'
              bg='brand.whiteish.def'
              direction='row'
              variant='outline'
              display='flex'
              alignContent='center'
              justifyContent='center'>
              <Heading size='sm' alignSelf='center'>Select a bird to view more information.</Heading>
            </Card>
          }
          </Box>
          <Box maxH='10px' minH='75%' display='flex' flexDir='column' pt='4px'>
            <List data={data} />
          </Box>
        </Box>
        <Box className='right-side' w='65%' maxH='100%' display='flex'>
        {loading ? 
        <Spinner margin='auto' boxSize='250px'/>
        :
        <Map sightings={data} coords={{setLat, setLng, handleRecollect}}/>
        }
        </Box>
    </Container>
    </>
  )
}
