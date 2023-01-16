import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from 'react-redux';
import { Box } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useState } from 'react';
import { useEffect } from 'react';
import Card from './Card';

export default function Profile() {

  
  const userInfo = useSelector(state=>state.userInfo);

  const [pageLoading, setPageLoading] = useState(true)
  const [birdsByUser, setBirdsByUser] = useState([])
  
  useEffect(() => {
    setPageLoading(false)
    setBirdsByUser(userInfo.birdSightingsIds)
  }, [])
  
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to={'/'} replace />;
  }
  return (
    isAuthenticated && (
      <Box>
        <Navbar/>
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
        <Box>
          {birdsByUser.length > 0 && birdsByUser.map(bird=>
          <Card bird={bird}/>
          )}
          <p></p>
        </Box>
      </Box>
    )
  );
};

