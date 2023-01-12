import React, { useEffect, useRef, useState } from 'react'

import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiemFrOTkiLCJhIjoiY2w0ZmlncG4zMDBhaTNpbWxtbm4wOHF2bSJ9.o1xqvp-4s8EBhiwSo6nlYQ';




export default function Map({sightings}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  
  const [currentLng, setCurrentLng] = useState(-76.933492720127)
  const [currentLat, setCurrentLat] = useState(39)
  const [currentZoom, setCurrentZoom] = useState(9)
  

  function popUpCreation(point) {
    const popUps = document.getElementsByClassName('mapboxgl-popup');
    if (popUps[0]) popUps[0].remove();

    const popUp = new mapboxgl.Popup({closeOnClick:false})
      .setLngLat(point.geometry.coordinates)
      .setHTML(`<p>${point.properties.address}</p>`)
      .addTo(map.current)
  }

  //function that, given a point, moves the map to focus on 
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
          data:sightings
        }
      })
    })
  }, [])
  
  //handle mapclick 
  useEffect(() => {
    map.current.on('click',(e)=>{
      const listOfPoints = map.current.queryRenderedFeatures(e.point,{layers:['locations']})
      console.log(listOfPoints)
      if (listOfPoints.length > 0) {//if a point is actually clicked
        focusPoint(listOfPoints[0])
        popUpCreation(listOfPoints[0])
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
