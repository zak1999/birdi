import {
  SendBirdSightingsToDBResult,
  BirdiUserSighting,
  UserData,
} from '../Types/DbApiTypes';

// █▀ █ █▀▀ █░█ ▀█▀ █ █▄░█ █▀▀ █▀
// ▄█ █ █▄█ █▀█ ░█░ █ █░▀█ █▄█ ▄█

const backend_url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'

export async function collectBirdLocationsFromDB(): Promise<
  BirdiUserSighting[]
> {
  try {
    const dbRes = await fetch(`${backend_url}/sightings`);
    const data = await dbRes.json();
    return data.data;
  } catch (err: any) {
    console.log(err);
    return err;
  }
}

export async function sendBirdSightingToDB(
  docToBeAdded: FormData
): Promise<SendBirdSightingsToDBResult> {
  try {
    const dbRes = await fetch(`${backend_url}/sightings`, {
      method: 'POST',
      body: docToBeAdded,
    });
    const data = await dbRes.json();
    console.log('data in sightingsFromDb', data);
    return data.data;
  } catch (err: any) {
    console.log(err);
    return err;
  }
}

export async function removeSighting(email: string, idToRemove: string): Promise<UserData> {
  try {
    const newUserInfo = await fetch(`${backend_url}/delete-bird`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        idToRemove
      })
      })
      const data = await newUserInfo.json();
      return data.data;
  } catch (err: any) {
    console.log(err);
    return err
  }
}

// █░█ █▀ █▀▀ █▀█ █▀
// █▄█ ▄█ ██▄ █▀▄ ▄█

export async function CollectUserInfoFromDB(email: String): Promise<UserData> {
  try {
    const userDataFromdb = await fetch(`${backend_url}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const data = await userDataFromdb.json();
    return data.data;
  } catch (err: any) {
    console.log(err);
    return err;
  }
}
