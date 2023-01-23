import { Avatar, Box, Button, Spinner, Stack, Image, Text, HStack, Container } from '@chakra-ui/react'
import React from 'react'
// import { ReactComponent as Logo } from '../../public/Valk_Segelzeichen.svg';
import { FaKiwiBird } from 'react-icons/fa'

import {useNavigate, Link} from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import {useSelector} from 'react-redux'
import logo from '../birdiLogoJPG.jpg';
export default function Navbar() {
  
  const nav = useNavigate()
  const userInfo = useSelector(state=>state.userInfo);

  const { logout, loginWithRedirect, isAuthenticated, user,isLoading } = useAuth0();
  

  async function handleLogin() {
    // const x = await loginWithPopup({ returnTo: window.location.origin })
    const x = await loginWithRedirect()
    
    if (isAuthenticated) {
    }
  }

  return (
    <Box bg='brand.darkish'>
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
          <Link to={'/'}>
          <Box display='flex' alignItems='center' justifyContent='center'>
            <Text fontSize='6xl' as='b'><Image src={logo} maxH='50px'></Image></Text>
          </Box> 
          </Link>
          {/* if user is unauthenticated the upload link prompts a login*/}
          {isAuthenticated ?
          <Button
          color='brand.darkish'             
            bg='brand.whiteish.def'
            _hover={{bg:'brand.whiteish.hover'}}>
            <Link to={'/upload'}>Upload your bird sighting</Link>
          </Button>
          :
          <Button
          color='brand.darkish'             
            bg='brand.whiteish.def'
            _hover={{bg:'brand.whiteish.hover'}}>
          <Link onClick={async()=>{
            await handleLogin()
            return nav('/upload')
          }}>Upload your bird sighting</Link>
          </Button>
          }

          <HStack spacing='8'>
          {
          isLoading ? 
          <Button
          color='brand.darkish'
          bg='brand.whiteish.hover'
          disabled
          ><Spinner/></Button>
          : 
          isAuthenticated ? 
            <Button
            color='brand.darkish' 
            bg='brand.whiteish.def'
            _hover={{bg:'brand.whiteish.hover'}}
            onClick={()=>logout({ returnTo: window.location.origin })}>Log Out</Button>
            : 
            <Button
            color='brand.darkish' 
            bg='brand.whiteish.def'
            _hover={{bg:'brand.whiteish.hover'}}
            data-testid='login-button'
            
            onClick={async()=>await handleLogin()}>Login</Button>
          }
          {isAuthenticated && <Link to={'/profile'}> <Avatar bg='teal.500' src={user.picture}/> </Link>}
          </HStack>
        </Stack>
      </Container>
    </Box>
  )
}
