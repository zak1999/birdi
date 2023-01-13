import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Map from './components/Map'
import List from './components/List'
import ActiveCard from './components/ActiveCard'

import { Box, Container, Flex } from '@chakra-ui/react'


export default function Explore() {

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

  //given a list of sightings, we output a list of geoJSON points
  function convertToGeoJSON(list){ 
    if (!list) return undefined;
    const tempArr = [];
    for (let x of list) {
      const lat = x.lat;
      const lng = x.lng;
      const GeoJSON = {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates":[lng,lat]
        },
        "properties":{...x}
      }
      tempArr.push(GeoJSON)
    }
    return {"type":"FeatureCollection","features":tempArr}
  }
  

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
  async function handleClick(){
    
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
          <ActiveCard bird={{
          "speciesCode": "mallar3",
          "comName": "Mallard",
          "sciName": "Anas platyrhynchos",
          "locId": "L12107838",
          "locName": "Thames Chase Community Forest",
          "obsDt": "2023-01-12 16:34",
          "howMany": 24,
          "lat": 51.5528198,
          "lng": 0.2850011,
          "obsValid": true,
          "obsReviewed": false,
          "locationPrivate": false,
          "subId": "S125995859"
          }}/>
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
          <Map sightings={convertToGeoJSON(data[0])} coords={{setLat,setLng,handleRecollect}}/>
        </Box>
      </Flex>
    </Container>
    {/* <Upload/> */}
    </>
  )
}
