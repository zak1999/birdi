import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Grid, GridItem} from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useState } from 'react';
import { useEffect } from 'react';
import { CollectUserInfoFromDB } from '../API/dbFunctions';
import ActiveCard from './ActiveCard';

export default function Profile() {

  const dispatch = useDispatch()  
  const userInfo = useSelector(state=>state.userInfo);

  const [pageLoading, setPageLoading] = useState(true)
  const [birdsByUser, setBirdsByUser] = useState([])
  
  useEffect(() => {
    if (isAuthenticated){
      CollectUserInfoFromDB(user.email).then(user=>{
        // set data in redux
        dispatch({type:'UPDATE_USER_INFO',
        user})
        setBirdsByUser(user.birdSightingsIds)
      })
    }
    setPageLoading(false)
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
        <Container 
          minW='85vw' 
          p='20px' 
          minH='85vh'>
          <div>
            <img src={user.picture} alt={user.name} />
            <p>{user.email} has seen {birdsByUser.length} bird{(birdsByUser> 1|| birdsByUser == 0 ) && <>s</>}</p>
          </div>
          <Grid columns={2} spacing={2}>
            {birdsByUser.length > 0 && birdsByUser.map(bird=>
            <GridItem>
              <ActiveCard key={bird._id} bird={bird} profile/>
            </GridItem>
            )}
          </Grid>
        </Container>
      </Box>
    )
  );
};

