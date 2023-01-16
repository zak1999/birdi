import { Avatar, Box, Button, Spinner, Stack, Image, Flex, HStack, Container } from '@chakra-ui/react'
import React from 'react'
// import { ReactComponent as Logo } from '../../public/Valk_Segelzeichen.svg';

import {useNavigate, Link} from 'react-router-dom'
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
    <Box bg='brand.darkish' >
      <Container
        minW='85vw' 
        bg='brand.darkish' 
        color='brand.whiteish.def' 
        px='20px'
        py='10px'
        >
        <Stack 
          direction='row' 
          display='flex' 
          alignItems='center'
          justifyContent='space-between'
        >  
        <Box display='flex' alignItems='center' justifyContent='center'>
          <Link to={'/'}>Birdi 
          </Link>
          <Image 
          display='inline'
          boxSize='50px' 
          objectFit='scale-down'
          src='https://upload.wikimedia.org/wikipedia/commons/b/bc/Valk_Segelzeichen.svg' alt='Logo'
          ></Image>
        </Box>
          {/* if user is unauthenticated the upload link prompts a login*/}
          {isAuthenticated ?
          <Link to={'/upload'}>upload</Link>
          :
          <Link onClick={async()=>{
            await handleLogin()
            return nav('/upload')
          }}>upload</Link>
          }

          <HStack spacing='8'>
          {
          isLoading ? 
          <Button
          bg='brand.whiteish.hover'
          disabled
          ><Spinner/></Button>
          : 
          isAuthenticated ? 
            <Button 
            color='black'
            bg='brand.whiteish.def'
            _hover={{bg:'brand.whiteish.hover'}}
            onClick={()=>logout({ returnTo: window.location.origin })}>Log Out</Button>
            : 
            <Button 
            color='black'
            bg='brand.whiteish.def'
            _hover={{bg:'brand.whiteish.hover'}}
            
            onClick={async()=>await handleLogin()}>Login</Button>
          }
          {isAuthenticated && <Link to={'/profile'}> <Avatar bg='teal.500' src={user.picture}/> </Link>}
          </HStack>
        </Stack>
      </Container>
    </Box>
  )
}
