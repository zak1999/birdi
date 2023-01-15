import { Box, Stack, Text } from '@chakra-ui/react'
import React from 'react'

import {Link} from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import {useSelector} from 'react-redux'

export default function Navbar() {

  const userInfo = useSelector(state=>state.userInfo);

  const { logout, loginWithPopup, isAuthenticated, user } = useAuth0();
  

  async function handleLogin() {
    const x = await loginWithPopup({ returnTo: window.location.origin })
    if (isAuthenticated) {
      console.log(user)
    }
  }

  return (
    <Box>
      <Stack direction='row'>
        <Link to={'/upload'}>upload</Link>
        <Link to={'/'}>explore</Link>
        {isAuthenticated ? 
        <button onClick={()=>logout({ returnTo: window.location.origin })}>Log Out</button>
        : 
        <button onClick={async()=>await handleLogin()}>Login</button>
        }
        {userInfo && <Text> {userInfo.email}</Text>}
      </Stack>
    </Box>
  )
}
