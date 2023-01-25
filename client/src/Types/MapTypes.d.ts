import { EBird } from './EBirdTypes';
import { BirdiUserSighting } from './DbApiTypes';
import { LngLatLike } from 'mapbox-gl';

export interface MapProps {
  sightings?: (EBird[] | BirdiUserSighting[])[] | undefined;
  coords: {
    setLat: React.Dispatch<React.SetStateAction<number>>;
    setLng: React.Dispatch<React.SetStateAction<number>>;
    handleRecollect?: (lng: number, lat: number) => Promise<void>;
  };
  dot: null | boolean;
}

export interface GeoJSONType {
  type: string;
  geometry: {
    type: string;
    coordinates: LngLatLike;
  };
  properties: EBird | BirdiUserSighting;
}
