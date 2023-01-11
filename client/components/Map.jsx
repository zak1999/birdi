import React, { useEffect, useRef, useState } from 'react'

import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiemFrOTkiLCJhIjoiY2w0ZmlncG4zMDBhaTNpbWxtbm4wOHF2bSJ9.o1xqvp-4s8EBhiwSo6nlYQ';


const stores = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.043929,
          38.910525
        ]
      },
      "properties": {
        "phoneFormatted": "(202) 387-9338",
        "phone": "2023879338",
        "address": "1512 Connecticut Ave NW",
        "city": "Washington DC",
        "country": "United States",
        "crossStreet": "at Dupont Circle",
        "postalCode": "20036",
        "state": "D.C."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.0672,
          38.90516896
        ]
      },
      "properties": {
        "phoneFormatted": "(202) 337-9338",
        "phone": "2023379338",
        "address": "3333 M St NW",
        "city": "Washington DC",
        "country": "United States",
        "crossStreet": "at 34th St NW",
        "postalCode": "20007",
        "state": "D.C."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.002583742142,
          38.887041080933
        ]
      },
      "properties": {
        "phoneFormatted": "(202) 547-9338",
        "phone": "2025479338",
        "address": "221 Pennsylvania Ave SE",
        "city": "Washington DC",
        "country": "United States",
        "crossStreet": "btwn 2nd & 3rd Sts. SE",
        "postalCode": "20003",
        "state": "D.C."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -76.933492720127,
          38.99225245786
        ]
      },
      "properties": {
        "address": "8204 Baltimore Ave",
        "city": "College Park",
        "country": "United States",
        "postalCode": "20740",
        "state": "MD"
      }
    }
  ]
};

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  
  const [currentLng, setCurrentLng] = useState(-76.933492720127)
  const [currentLat, setCurrentLat] = useState(39)
  const [currentZoom, setCurrentZoom] = useState(9)
  
  function focusPoint(point){
    map.current.flyTo({
      center:point.geometry.coordinates,
      zoom:15
    })
  }
  //initializing the map on render
  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container:mapContainer.current, //ID of the container element
      style:'mapbox://styles/zak99/clcdg42u7002416o4vrxtxjc6',
      center: [currentLng,currentLat],
      zoom:currentZoom
    })
  }, [])
  
  // keeps track of lat, lng & zoom
  useEffect(() => {
    if (!map.current) return;
    map.current.on('move',()=>{
      const center = map.current.getCenter()
      setCurrentLng(center.lng)
      setCurrentLat(center.lat)
      setCurrentZoom(map.current.getZoom())
    })
  }, [])

  // plots the data  
  useEffect(() => {
    // only runs if there is a current map and the locations layer does't exists
    if (!map.current || map.current.getLayer('locations')) return;
    map.current.on('load',()=>{
      map.current.addLayer({
        id:'locations',
        type:'circle',
        source:{
          type:'geojson',
          //need to check that data ('stores') actually exists
          data:stores
        }
      })
    })
  }, [])
  
  //handle mapclick 
  useEffect(() => {
    map.current.on('click',(e)=>{
      const listOfPoints = map.current.queryRenderedFeatures(e.point,{layers:['locations']})
      console.log(listOfPoints)
      if (listOfPoints.length > 0) {
        focusPoint(listOfPoints[0])
      }
    })
  }, [])
  

  return (
    <>
    <p>lat:{currentLat}</p>
    <p>lng:{currentLng}</p>
    <p>Zoom:{currentZoom}</p>


    <div>THer be a map hereeeeee</div>
    <div ref={mapContainer} style={{height:'70vh'}}></div>
    </>
  )
}
