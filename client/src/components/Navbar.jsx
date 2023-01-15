import { Box, Button, Spinner, Stack, Text } from '@chakra-ui/react'
import React from 'react'

import {Link} from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import {useSelector} from 'react-redux'

export default function Navbar() {

  const userInfo = useSelector(state=>state.userInfo);

  const { logout, loginWithPopup, isAuthenticated, user,isLoading } = useAuth0();
  

  async function handleLogin() {
    const x = await loginWithPopup({ returnTo: window.location.origin })
    if (isAuthenticated) {
      console.log(user)
    }
  }

  return (
    <Box>
      <Stack direction='row'>
        {isAuthenticated ? 
        <Link to={'/upload'}>upload</Link>
        :
        <Link onClick={async()=>await handleLogin()}>upload</Link>
        }
        <Link to={'/'}>explore</Link>

        {
        isLoading ? 
        <Button><Spinner/></Button>
        : 
        isAuthenticated ? 
          <Button onClick={()=>logout({ returnTo: window.location.origin })}>Log Out</Button>
          : 
          <Button onClick={async()=>await handleLogin()}>Login</Button>
        }
        {userInfo && <Text> {userInfo.email}</Text>}
      </Stack>
    </Box>
  )
}
