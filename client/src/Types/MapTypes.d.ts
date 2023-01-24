import { EBird } from './EBirdTypes';
import { BirdiUserSighting } from './DbApiTypes';
import { Feature, Point } from 'mapbox-gl';

export interface MapProps {
  sightings: (EBird[] | BirdiUserSighting[])[] | undefined;
  coords: {
    setLat: React.Dispatch<React.SetStateAction<number>>;
    setLng: React.Dispatch<React.SetStateAction<number>>;
    handleRecollect: (lng: Number, lat: Number) => Promise<void>;
  };
  dot: null | Boolean;
}

export interface GeoJSON {
  type: String;
  geometry: {
    type: String;
    coordinates: [number, number] | Number[] | LngLatLike;
  };
  properties: EBird | BirdiUserSighting;
}
