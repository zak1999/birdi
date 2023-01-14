const eBirdURL = 'https://api.ebird.org/v2/'


export async function collectBirdLocationsFromAPI(lng,lat){
  const APIRes = await fetch(`${eBirdURL}data/obs/geo/recent?lat=${lat}&lng=${lng}&maxResults=100`,{
    // mode: 'cors',
    headers:{
      'x-ebirdapitoken':process.env.REACT_APP_BIRD_TOKEN
    }
  })
  const data = await APIRes.json()
  return data
}

export async function collectBirdList() {
  const APIRes = await fetch(`${eBirdURL}ref/taxonomy/ebird?fmt=json`)
  const data = await APIRes.json()
  return data
}