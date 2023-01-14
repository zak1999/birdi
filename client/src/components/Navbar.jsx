import { Box, Stack } from '@chakra-ui/react'
import React from 'react'

import {Link} from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";


export default function Navbar() {

  const { logout, loginWithPopup, isAuthenticated, user } = useAuth0();
  
  async function hanldeLogin() {
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
        <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
        : 
        <button onClick={async () => await hanldeLogin()}>Login</button>
        }
      </Stack>
    </Box>
  )
}
