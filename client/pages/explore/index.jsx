import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Map from '../../components/Map'
import List from '../../components/List'
import { Box, Container, Flex } from '@chakra-ui/react'


export default function Explore() {

  const [data, setData] = useState([])// list of lists : [apiData, dbData]

  const [lng, setLng] = useState(0)
  const [lat, setLat] = useState(0)
  
  
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
  // initial data collect
  useEffect(() => {
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(async (pos)=>{
        handleRecollect(pos.coords.longitude, pos.coords.latitude)
      })
    }else{
      handleRecollect(pos.coords.longitude, pos.coords.latitude)
    }
  }, [])
  
  
  
  async function handleRecollect(lng,lat){
    const APIData = await collectBirdLocationsFromAPI(lng,lat)
    const dbData = await collectBirdLocationsFromDB();
    setData([APIData,dbData])
    // console.log("data in explore comp",data)
  }
  return (
    <>
    <Navbar/>
    <Container bg='teal.400' minW='75vw' minH='85vh'>
      <Flex >
        <Box w='35%' p='10px'>
          <List data={data} />
        </Box>
        <Box w='65%'>
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
