import React from 'react'

export default function List({list}) {
  
  return (
    <div>
      Recent Sightings
      {list?.length > 0 && list.map(item=>{
      return(
        <>{item.comName}</>
      )})}
    </div>
  )
}
