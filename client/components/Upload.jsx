import React, { useState } from 'react'
import Map from './Map'
export default function Upload() {


  const [lng, setLng] = useState(0)
  const [lat, setLat] = useState(0)
  
  async function sendToBE(data){
  return await fetch('http://localhost:3001/sightings',{
      method: 'POST',
      body:data,
    })
  } 

  async function handleSubmit(e){
    e.preventDefault();
    let d = new FormData(e.target)
    d.set('comName',d.get('comName'))
    d.set('sciName',d.get('sciName'))
    d.set('lat',lat)
    d.set('lng',lng)
    d.append('file',d.get('file')[0])
    const x  = await sendToBE(d)
    console.log(x)
  }


  return (
    <div>
      <p>{lat}</p>
      <p>{lng}</p>

      <form onSubmit={(e)=>handleSubmit(e)}>
        <label>comName</label>
        <input type="text" name='comName'/>
        <label>sciName</label>
        <input type="text" name='sciName'/>
        <label>obsDt</label>
        <input type="date" name='obsDt'/>
        <label>file</label>
        <input type="file" name='file'/>
        <button> Submit?</button>
      </form>
        <Map uploadCoords={{setLng,setLat}}/>

    </div>
  )
}
