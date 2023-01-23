import { EBird } from '../Types/EBirdTypes';
import { Headers } from 'node-fetch';

const eBirdURL: String = 'https://api.ebird.org/v2/';

export async function collectBirdLocationsFromAPI(
  lng: Number,
  lat: Number
): Promise<EBird[]> {
  const headers = new Headers({
    'x-ebirdapitoken': process.env.REACT_APP_BIRD_TOKEN,
  });
  const APIRes = await fetch(
    `${eBirdURL}data/obs/geo/recent?lat=${lat}&lng=${lng}&maxResults=100`,
    {
      method: 'GET',
      headers: headers,
    }
  );
  const data = await APIRes.json();
  return data;
}
