import { EBird } from '../Types/EBirdTypes';

const eBirdURL: String = 'https://api.ebird.org/v2/';

export async function collectBirdLocationsFromAPI(
  lng: Number,
  lat: Number
): Promise<EBird[]> {
  const APIRes = await fetch(
    `${eBirdURL}data/obs/geo/recent?lat=${lat}&lng=${lng}&maxResults=100`,
    {
      // mode: 'cors',
      headers: {
        'x-ebirdapitoken': process.env.REACT_APP_BIRD_TOKEN,
      },
    }
  );
  const data = await APIRes.json();
  return data;
}
