import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { GeoJSONType, MapProps, GeoJSONReturn } from '../Types/MapTypes';

import mapboxgl, { GeoJSONSource, LngLatLike } from 'mapbox-gl';
import { RootState } from '..';
import { EBird } from '../Types/EBirdTypes';
import { BirdiUserSighting } from '../Types/DbApiTypes';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;
// TODO ADD BACK THE MAP CLICK functionationality 
export default function Map({ sightings, coords, dot }: MapProps) {
  const SelectedBirdOnExplore = useSelector(
    (state: RootState) => state.SelectedBirdOnExplore
  );

  // const dispatch = useDispatch();

  const mapContainer = useRef<HTMLDivElement>(null);

  const map = useRef<mapboxgl.Map | null>(null);

  const [currentSightings, setCurrentSightings] = useState<
    GeoJSONReturn | undefined
  >(
    sightings &&
      (sightings[0].length > 0 ? convertToGeoJSON(sightings[0]) : undefined)
  ); //as geojson data
  // GeoJSONReturn | undefined

  const [currentSightingsAPI, setCurrentSightingsAPI] = useState<
    GeoJSONReturn | undefined
  >(
    sightings &&
      (sightings[1].length > 0 ? convertToGeoJSON(sightings[1]) : undefined)
  ); //as geojson data

  const [userCoords, setUserCoords] = useState<LngLatLike | undefined>(
    undefined
  ); //[lng, lat]

  //given a list of sightings, we output a list of geoJSON points
  function convertToGeoJSON(
    list: EBird[] | BirdiUserSighting[]
  ): GeoJSONReturn {
    if (!list || list.length === 0)
      return { type: 'FeatureCollection', features: [] };
    const tempArr: GeoJSONType[] = [];
    for (let x of list) {
      const lat = x.lat;
      const lng = x.lng;
      const GeoJSON = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [lng, lat],
        },
        properties: { ...x },
      } as GeoJSONType;
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

  function centerPointConvert(centerpoint: number[]): LngLatLike {
    return [centerpoint[0], centerpoint[1]];
  }
  //function that, given a point, moves the map to focus on
  function focusPoint(point: GeoJSONType | EBird | BirdiUserSighting) {
    let centerpoint = centerPointConvert(point.geometry.coordinates);
    map.current &&
      map.current.flyTo({
        center: centerpoint,
        zoom: 15,
      });
  }

  useEffect(() => {
    //initializing the map on render
    if (map.current) return;
    mapContainer.current &&
      (map.current = new mapboxgl.Map({
        container: mapContainer.current, //ID of the container element
        style: 'mapbox://styles/zak99/cld0avhs0002y14k8mr5rbtz4/draft',//'mapbox://styles/sethjplatt/cld307n6g002f01rvfdfp6pe4',
        //if the users location is known, set center to their coords, else default location
        center: userCoords ? userCoords : [-0.1291664, 51.504435],
        zoom: 9,
      }));

    // plots the data
    // only runs if there is a current map and the locations layer does't exists
    if (!map.current) return; // || map.current.getLayer('locations') || currentSightings.length<0) return;
    map.current.on('load', () => {
      map?.current?.addLayer({
        id: 'locations',
        type: 'circle',
        source: {
          type: 'geojson',
          data: currentSightings,
        },
      });
      map?.current?.addLayer({
        id: 'locations2',
        type: 'circle',
        source: {
          type: 'geojson',
          data: currentSightingsAPI,
        },
        paint: { 'circle-color': '#fff7f1' },
      });
    });

    // keeps track of lat, lng & zoom
    // if map is instantiated AND
    // the map is being used to upload a sighting (coords), update data in parent element too
    if (!map.current || !coords) return;
    map.current.on('move', () => {
      const center = map?.current?.getCenter();
      center && coords.setLng(center.lng);
      center && coords.setLat(center.lat);
    });
  }, []);

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
    if (!map.current?.getSource('locations')) return; //if the layer doesnt exist
    currentSightings &&
      (map.current.getSource('locations') as GeoJSONSource).setData(
        currentSightings
      );
    if (!map.current.getSource('locations2')) return; //if the layer doesnt exist
    currentSightingsAPI &&
      (map.current.getSource('locations2') as GeoJSONSource).setData(
        currentSightingsAPI
      );
  }, [currentSightings, currentSightingsAPI]);

  // updates map when a bird from the list component is selected -> adds a popup

  useEffect(() => {
    if (sightings) {

      if (
        sightings[0] &&
        sightings[0].length > 0 &&
        Array.isArray(sightings[0]) &&
        SelectedBirdOnExplore
      ) {
        let ebirds: EBird[] = sightings[0] as EBird[];
        let ourbirds: BirdiUserSighting[] = sightings[1] as BirdiUserSighting[];

        let x =
          ebirds.find((bird: EBird) => {
            return bird.id === SelectedBirdOnExplore.id;
          }) ||
          ourbirds.find((bird: BirdiUserSighting) => {
            return bird.id === SelectedBirdOnExplore.id;
          });
        if (!x) {
          x = SelectedBirdOnExplore;
        }
        x && (x.geometry = { coordinates: [x.lng, x.lat] });
        x && focusPoint(x);
        const popUps = document.getElementsByClassName('mapboxgl-popup');
        if (popUps[0]) popUps[0].remove();
        map.current &&
        new mapboxgl.Popup({ closeOnClick: false })
          .setLngLat(x?.geometry.coordinates)
          .setHTML(`<p>${x?.comName}</p>`)
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
                coords.handleRecollect &&
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
                aria-label='map-refresh-button'
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
