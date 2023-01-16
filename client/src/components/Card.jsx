import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export default function Card({bird}) {
  
  const [loading, setLoading] = useState(true)
  
  
  return (
    <div>{bird.comName}</div>
  )
}
