import React, { useEffect, useRef, useState } from 'react'

import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiemFrOTkiLCJhIjoiY2w0ZmlncG4zMDBhaTNpbWxtbm4wOHF2bSJ9.o1xqvp-4s8EBhiwSo6nlYQ';




export default function Map({sightings,uploadCoords}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  
  const [userCoords, setUserCoords] = useState(undefined) //[lng, lat]
  
  //function that retrieves current location of user
  async function locateMe(){

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos)=>{
        setUserCoords([pos.coords.longitude, pos.coords.latitude])
        map.current.flyTo({
          center:[pos.coords.longitude, pos.coords.latitude],
          zoom:15
        })
      })    
    }
  }
  
  //function that, given a point, creates a popup
  //*************************CHANGE TO MY OWN POPUP **********************************
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
      //if the users location is known, set center to their coords, else default location
      center: userCoords? [...userCoords] : [-0.1291664, 51.504435],
      zoom:9
    })
  }, [])
  
  // keeps track of lat, lng & zoom
  useEffect(() => {
    // if map is instantiated AND 
    // the map is being used to upload a sighting, update data in parent element too
    if (!map.current || !uploadCoords) return;
    map.current.on('move',()=>{
      const center = map.current.getCenter()
      uploadCoords.setLng(center.lng)
      uploadCoords.setLat(center.lat)
    })
  }, [])

  // plots the data  
  useEffect(() => {
    // only runs if there is a current map and the locations layer does't exists
    if (!map.current || 
      map.current.getLayer('locations') || 
      !sightings?.length ) return;
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
    <div ref={mapContainer} style={{height:'70vh'}}></div>
    <button onClick={()=>{console.log("clicked");locateMe()}}>current location</button>
    </>
  )
}
