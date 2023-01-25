import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { GeoJSON } from '../Types/MapTypes';
import mapboxgl from 'mapbox-gl';
import { Feature } from 'geojson';
import { LngLatLike, MapboxGeoJSONFeature } from 'mapbox-gl';
import { MapProps } from '../Types/MapTypes';
import { RootState } from '..';
import { BirdiUserSighting } from '../Types/DbApiTypes';
import { EBird } from '../Types/EBirdTypes';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

export default function Map({ sightings, coords, dot }: MapProps) {
  const SelectedBirdOnExplore = useSelector(
    (state: RootState) => state.SelectedBirdOnExplore
  );

  const dispatch = useDispatch();

  const mapContainer = useRef('');
  const map = useRef<mapboxgl.Map | null>(null);

  const [currentSightings, setCurrentSightings] = useState(
    sightings &&
      (sightings[0].length > 0 ? convertToGeoJSON(sightings[0]) : null)
  ); //as geojson data
  const [currentSightingsAPI, setCurrentSightingsAPI] = useState(
    sightings &&
      (sightings[1].length > 0 ? convertToGeoJSON(sightings[1]) : null)
  ); //as geojson data

  const [userCoords, setUserCoords] = useState<LngLatLike | undefined>(
    undefined
  );

  //given a list of sightings, we output a list of geoJSON points
  function convertToGeoJSON(list: EBird[] | BirdiUserSighting[]) {
    if (!list || list.length === 0)
      return { type: 'FeatureCollection', features: [] };
    const tempArr = [];
    for (let x of list) {
      const lat = x.lat;
      const lng = x.lng;
      const GeoJSON: GeoJSON = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [lng, lat],
        },
        properties: { ...x },
      };
      tempArr.push(GeoJSON);
    }
    return { type: 'FeatureCollection', features: tempArr };
  }
  //function that retrieves current location of user
  async function locateMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        setUserCoords([pos.coords.longitude, pos.coords.latitude]);
        map.current &&
          map.current.flyTo({
            center: [pos.coords.longitude, pos.coords.latitude],
            zoom: 14,
          });
      });
    }
  }

  //function that, given a point, creates a popup
  function popUpCreation(point: GeoJSON) {
    const popUps = document.getElementsByClassName('mapboxgl-popup');
    if (popUps[0]) popUps[0].remove();
    map.current &&
      new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat(point.geometry.coordinates)
        .setHTML(`<p>${point.properties.comName}</p>`)
        .addTo(map.current);
  }
  //function that, given a point, moves the map to focus on
  function focusPoint(point: GeoJSON) {
    map.current &&
      map.current.flyTo({
        center: point.geometry.coordinates,
        zoom: 15,
      });
  }

  useEffect(() => {
    //initializing the map on render
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: !map.current && mapContainer.current,
      style: 'mapbox://styles/sethjplatt/cld307n6g002f01rvfdfp6pe4',
      //if the users location is known, set center to their coords, else default location
      center: userCoords ? userCoords : [-0.1291664, 51.504435],
      zoom: 9,
    });

    //handle mapclick
    map.current &&
      map.current.on('click', (e) => {
        const listOfPoints: null | MapboxGeoJSONFeature[] =
          map.current &&
          map.current.queryRenderedFeatures(e.point, {
            layers: ['locations', 'locations2'],
          });
        if ((listOfPoints && listOfPoints.length < 1) || !listOfPoints) return; //Makes sure a point is actually clicked
        dispatch({
          type: 'UPDATE_EXPLORE_BIRD',
          bird: { ...listOfPoints[0].properties },
        }); // convert data back from geoJson
        console.log('listOfPoints0', listOfPoints[0]);
      });

    // plots the data
    // only runs if there is a current map and the locations layer does't exists
    if (!map.current) return; // || map.current.getLayer('locations') || currentSightings.length<0) return;
    map.current &&
      map.current.on(
        'loaded',
        () => {
          map.current &&
            currentSightings?.features &&
            map.current.addLayer({
              id: 'locations',
              type: 'circle',
              source: {
                type: 'geojson',
                data: currentSightings,
              },
            });
          map.current &&
            map.current.addLayer({
              id: 'locations2',
              type: 'circle',
              source: {
                type: 'geojson',
                data: currentSightingsAPI,
              },
              paint: { 'circle-color': '#fff7f1' },
            });
        },
        []
      );

    // keeps track of lat, lng & zoom
    // if map is instantiated AND
    // the map is being used to upload a sighting (coords), update data in parent element too
    if (!map.current || !coords) return;
    map.current.on('move', () => {
      const center = map.current && map.current.getCenter();
      center && coords.setLng(center.lng);
      center && coords.setLat(center.lat);
    });
  });

  //handles update currentSightings state
  useEffect(() => {
    if (sightings) {
      if (sightings[0].length > 0) {
        setCurrentSightings(convertToGeoJSON(sightings[0]));
      }
      if (sightings[1].length > 0) {
        setCurrentSightingsAPI(convertToGeoJSON(sightings[1]));
      }
    }
  }, [sightings]);

  //handles map update in state update
  useEffect(() => {
    if (map.current && !map.current.getSource('locations')) return; //if the layer doesnt exist
    map.current && map.current.getSource('locations').setData(currentSightings);
    if (map.current && !map.current.getSource('locations2')) return; //if the layer doesnt exist
    map.current &&
      map.current.getSource('locations2').setData(currentSightingsAPI);
  }, [currentSightings, currentSightingsAPI]);

  // updates map when a bird from the list component is selected -> adds a popup
  useEffect(() => {
    // console.log("sightings",sightings)
    // console.log("currentSightings",currentSightings)
    // console.log("selectedBirdOnExplore",SelectedBirdOnExplore)
    if (sightings) {
      if (sightings[0] && sightings[0].length > 0 && SelectedBirdOnExplore) {
        let x =
          (sightings &&
            sightings[0].find((bird: EBird | BirdiUserSighting) => {
              return bird.id === SelectedBirdOnExplore.id;
            })) ||
          sightings[1].find((bird: EBird | BirdiUserSighting) => {
            return bird.id === SelectedBirdOnExplore.id;
          });
        if (!x) {
          x = SelectedBirdOnExplore;
        }
        x.geometry = { coordinates: [x.lng, x.lat] };
        console.log('x', x);
        focusPoint(x);
        const popUps = document.getElementsByClassName('mapboxgl-popup');
        if (popUps[0]) popUps[0].remove();
        const popUp =
          map.current &&
          new mapboxgl.Popup({ closeOnClick: false })
            .setLngLat(x.geometry.coordinates)
            .setHTML(`<p>${x.comName}</p>`)
            .addTo(map.current);
      }
    }
  }, [SelectedBirdOnExplore]);

  return (
    <Box display='flex' flexDir='column' minW='100%' maxH='100%'>
      <Box
        className='map-wrapper'
        display='flex'
        flexDir='column'
        justifyContent='center'
      >
        {/* if the map is being used in upload, the user will see a
      cross in the center of the map to help with lat & lng precision*/}
        {dot && (
          <Box
            zIndex='100'
            position='absolute'
            margin='auto'
            alignSelf='center'
            justifySelf='center'
          >
            <Text>
              <b>+</b>
            </Text>
          </Box>
        )}

        <Box ref={mapContainer} minHeight={dot ? '50vh' : '85vh'}></Box>
        <Box
          className='btn-section'
          display='flex'
          alignItems='center'
          zIndex='100'
          position='relative'
          bottom={'55px'}
          left={'5px'}
        >
          <Button
            bg='brand.darkish'
            color='brand.whiteish.def'
            _hover={{ bg: 'brand.darkish3' }}
            onClick={() => {
              locateMe();
            }}
            mr='10px'
            my='10px'
          >
            Current Location
          </Button>
          {coords.handleRecollect && (
            <Button
              bg='brand.darkish'
              color='brand.whiteish.def'
              _hover={{ bg: 'brand.darkish3' }}
              onClick={() =>
                map.current &&
                coords.handleRecollect(
                  map.current.getCenter().lng,
                  map.current.getCenter().lat
                )
              }
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-arrow-clockwise'
                viewBox='0 0 16 16'
              >
                <path
                  fillRule='evenodd'
                  d='M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z'
                />
                <path d='M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z' />
              </svg>
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
