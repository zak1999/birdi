// █▀ █ █▀▀ █░█ ▀█▀ █ █▄░█ █▀▀ █▀
// ▄█ █ █▄█ █▀█ ░█░ █ █░▀█ █▄█ ▄█

export async function collectBirdLocationsFromDB(){
  const dbRes = await fetch(`http://localhost:3001/sightings`)
  const data = await dbRes.json()
  return data
}

export async function sendBirdSightingToDB(data){
  return await fetch('http://localhost:3001/sightings',{
      method: 'POST',
      body:data,
    })
  }


// █░█ █▀ █▀▀ █▀█ █▀
// █▄█ ▄█ ██▄ █▀▄ ▄█

export async function COllectUserInfoFromDB(email) {
  console.log("click")
  const userDataFromdb = await fetch('http://localhost:3001/users',{
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email})
  })
  const data = await userDataFromdb.json()
  return data
}