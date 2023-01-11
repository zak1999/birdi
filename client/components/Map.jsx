import React, { useEffect, useRef, useState } from 'react'

import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiemFrOTkiLCJhIjoiY2w0ZmlncG4zMDBhaTNpbWxtbm4wOHF2bSJ9.o1xqvp-4s8EBhiwSo6nlYQ';




export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [currentLng, setCurrentLng] = useState(-70)
  const [currentLat, setCurrentLat] = useState(42)
  const [currentZoom, setCurrentZoom] = useState(9)

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
  

  return (
    <>
    <p>lat:{currentLat}</p>
    <p>lng:{currentLng}</p>
    <p>Zoom:{currentZoom}</p>


    <div>THer be a map hereeeeee</div>
    <div ref={mapContainer} style={{height:'400px'}}></div>
    </>
  )
}
