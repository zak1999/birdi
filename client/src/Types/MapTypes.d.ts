import { EBird } from './EBirdTypes';
import { BirdiUserSighting } from './DbApiTypes';
import { LngLatLike } from 'mapbox-gl';
import { Feature, MultiPolygon } from 'geojson';

export interface MapProps {
  sightings: (EBird[] | BirdiUserSighting[])[] | undefined;
  coords: {
    setLat: React.Dispatch<React.SetStateAction<number>>;
    setLng: React.Dispatch<React.SetStateAction<number>>;
    handleRecollect: (lng: number, lat: number) => Promise<void>;
  };
  dot: null | boolean;
}

export interface GeoJSONType {
  type: 'Feature';
  geometry: {
    type: 'MultiPolygon' | 'Point';
    coordinates: Position[];
  };
  properties: EBird | BirdiUserSighting;
}

export interface GeoJSONReturn {
  type: 'FeatureCollection';
  features: GeoJSONType[];
}
