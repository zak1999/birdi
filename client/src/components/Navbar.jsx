import { Box, Button, Spinner, Stack, Text } from '@chakra-ui/react'
import React from 'react'

import {useNavigate, Link, Navigate} from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import {useSelector} from 'react-redux'

export default function Navbar() {
  const nav = useNavigate()
  const userInfo = useSelector(state=>state.userInfo);

  const { logout, loginWithPopup, isAuthenticated, user,isLoading } = useAuth0();
  

  async function handleLogin() {
    const x = await loginWithPopup({ returnTo: window.location.origin })
    if (isAuthenticated) {
    }
  }

  return (
    <Box>
      <Stack direction='row'>
        {/* if user is unauthenticated the upload link prompts a login*/}
        {isAuthenticated ? 
        <Link to={'/upload'}>upload</Link>
        :
        <Link onClick={async()=>{
          await handleLogin()
          return nav('/upload')
        }}>upload</Link>
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
        {userInfo && <Link to={'/profile'}> {userInfo.email}</Link>}
      </Stack>
    </Box>
  )
}
