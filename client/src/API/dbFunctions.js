// █▀ █ █▀▀ █░█ ▀█▀ █ █▄░█ █▀▀ █▀
// ▄█ █ █▄█ █▀█ ░█░ █ █░▀█ █▄█ ▄█

export async function collectBirdLocationsFromDB(){
  const dbRes = await fetch(`http://localhost:3001/sightings`)
  const data = await dbRes.json()
  return data
}

export async function sendBirdSightingToDB(docToBeAdded){
  const dbRes =  await fetch('http://localhost:3001/sightings',{
      method: 'POST',
      body:docToBeAdded,
    });
  // ALEX - Need to await this?
  const data = await dbRes.json()
  return data;
  }


// █░█ █▀ █▀▀ █▀█ █▀
// █▄█ ▄█ ██▄ █▀▄ ▄█

export async function CollectUserInfoFromDB(email) {
  const userDataFromdb = await fetch('http://localhost:3001/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  // ALEX - Need to await this?
  const data = await userDataFromdb.json();
  return data;
}