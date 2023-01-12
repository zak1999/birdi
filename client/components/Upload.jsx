import React from 'react'

export default function Upload() {
  
  async function sendToBE(data){
    return await fetch('http://localhost:3001/sightings',{
      method: 'POST',
      // headers: {
      //   'Content-Type': 'multipart/form-data'
      // },
      body:data,
    })
  } 

  async function handleSubmit(e){
    e.preventDefault();
    let d = new FormData(e.target)
    d.set('comName',d.get('comName'))
    d.set('sciName',d.get('sciName'))
    d.append('file',d.get('file')[0])
    const x  = await sendToBE(d)
  }


  return (
    <div>
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
    </div>
  )
}
