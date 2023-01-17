import 'mapbox-gl/dist/mapbox-gl.css'

import Explore from './components/Explore';
import Upload from './components/Upload'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Profile from './components/Profile';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { CollectUserInfoFromDB } from './API/dbFunctions'
import { Box } from '@chakra-ui/react';



function App() {
  
  const dispatch = useDispatch()
  
  const { isAuthenticated, user} = useAuth0() 
  
  //router needs to be created in component to have access to the 'isAuthenticated' object,
  //with this object we protect private routes
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Explore/>
    },
    {
      path:'/upload',
      element: isAuthenticated ? <Upload/> : <Explore/>
    },
    {
      path:'/profile',
      element: isAuthenticated ? <Profile/>: <Explore/>
    }
  ])
  
  // listens for logins/logouts and if it is a login, 
  // collects data from mongo and sets the state redux
  useEffect(() => {
    if (isAuthenticated){
      // console.log(user)
      CollectUserInfoFromDB(user.email).then(user=>{
        // set data in redux 
        dispatch({type:'UPDATE_USER_INFO',
        user})
      })
    }
  }, [isAuthenticated])
  
  return (
    
    <Box bg='brand.darkish2' className="App" minH='100vh' maxH='100vh'>
      <RouterProvider router={router}/>
    </Box>
  );
}

export default App;
