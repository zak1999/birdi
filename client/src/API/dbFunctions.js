// █▀ █ █▀▀ █░█ ▀█▀ █ █▄░█ █▀▀ █▀
// ▄█ █ █▄█ █▀█ ░█░ █ █░▀█ █▄█ ▄█

export async function collectBirdLocationsFromDB() {
  try {
  const dbRes = await fetch(`http://localhost:3001/sightings`)
  const data = await dbRes.json()
  return data.data;
  } catch (err) {
  console.log(err);
  return err;
  }
}

export async function sendBirdSightingToDB(docToBeAdded) {
  try {
  const dbRes =  await fetch('http://localhost:3001/sightings',{
      method: 'POST',
      body:docToBeAdded,
    });
  // ALEX - Need to await this?
  const data = await dbRes.json()
  return data.data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

// █░█ █▀ █▀▀ █▀█ █▀
// █▄█ ▄█ ██▄ █▀▄ ▄█

export async function CollectUserInfoFromDB(email) {
  try {
  const userDataFromdb = await fetch('http://localhost:3001/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  // ALEX - Need to await this?
  const data = await userDataFromdb.json();
  return data.data;
  } catch (err) {
    console.log(err);
    return err;
  }
}