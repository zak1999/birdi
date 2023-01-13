import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Map from './components/Map'
import List from './components/List'
import ActiveCard from './components/ActiveCard'

import { Box, Container, Flex, Card, CardBody, Heading } from '@chakra-ui/react'
import { useSelector } from 'react-redux'


export default function Explore() {
  
  const SelectedBirdOnExplore = useSelector(state=>state.SelectedBirdOnExplore);
  
  const [data, setData] = useState([])// list of lists : [apiData, dbData]

  const [lng, setLng] = useState(0)
  const [lat, setLat] = useState(0)
  
  // initial data collect
  useEffect(() => {
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(async (pos)=>{
        await handleRecollect(pos.coords.longitude, pos.coords.latitude)
      })
    }else{
      handleRecollect(0,0)
    }
  }, [])


  async function collectBirdLocationsFromAPI(lng,lat){
    const APIRes = await fetch(`https://api.ebird.org/v2/data/obs/geo/recent?lat=${lat}&lng=${lng}&maxResults=100`,{
      // mode: 'cors',
      headers:{
        'x-ebirdapitoken':'9erjc094uk1p'
      }
    })
    const data = await APIRes.json()
    return data
  }
  async function collectBirdLocationsFromDB(){
    const dbRes = await fetch(`http://localhost:3001/sightings`)
    const data = await dbRes.json()
    return data
  }

  async function handleRecollect(lng,lat){
    const APIData = await collectBirdLocationsFromAPI(lng,lat)
    const dbData = await collectBirdLocationsFromDB();
    APIData.forEach((bird, i) => {
      bird.id = i;
    });
    dbData.forEach((bird, i) =>{
      bird.id = i;
    });
    setData([APIData,dbData])
  }


  return (
    <>
    <Navbar/>
    <Container bg='teal.400' minW='75vw' p='20px' minH='85vh'>
      <Flex minH='85vh'>
        <Box className='left-side' 
          m='0'
          p='0'
          w='35%' 
          display='flex' 
          flexDir='column' 
          maxH='85vh' 
          pr='10px'
          pb='2px'
          >
          <Box maxH='40%' pb='10px'>
          {SelectedBirdOnExplore ? 
          <ActiveCard bird={SelectedBirdOnExplore}/>
          :
          <Card direction='row'
            overflow='hidden'
            variant='outline'
            p='60px'>
            <Heading size='sm'>Select a bird to view more information.</Heading>
          </Card>
          }
          </Box>

          <Box maxH='100%'>
            <List data={data} />
          </Box>
        </Box>
        <Box className='right-side' w='65%'>
          {/* 
█░█░█ ▄▀█ █ ▀█▀   █▀▀ █▀█ █▀█   █▀ █ █▀▀ █░█ ▀█▀ █ █▄░█ █▀▀ █▀   ▀█▀ █▀█   █▀▀ █▀█ █░░ █░░ █▀▀ █▀▀ ▀█▀
▀▄▀▄▀ █▀█ █ ░█░   █▀░ █▄█ █▀▄   ▄█ █ █▄█ █▀█ ░█░ █ █░▀█ █▄█ ▄█   ░█░ █▄█   █▄▄ █▄█ █▄▄ █▄▄ ██▄ █▄▄ ░█░

▀█▀ █░█ █▀▀ █▄░█   █▀█ █▀▀ █▄░█ █▀▄ █▀▀ █▀█   █▀▄▀█ ▄▀█ █▀█ ▀█
░█░ █▀█ ██▄ █░▀█   █▀▄ ██▄ █░▀█ █▄▀ ██▄ █▀▄   █░▀░█ █▀█ █▀▀ ░▄
          */}
          <Map sightings={data[0]} coords={{setLat,setLng,handleRecollect}}/>
        </Box>
      </Flex>
    </Container>
    {/* <Upload/> */}
    </>
  )
}
