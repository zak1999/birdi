import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css'

import Explore from './components/Explore';
import Upload from './components/Upload'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Profile from './components/Profile';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import {COllectUserInfoFromDB} from './API/dbFunctions'



function App() {
  
  const dispatch = useDispatch()
  
  const { isAuthenticated, user} = useAuth0() 
  
  //router needs to be created in component to have access to the user object,
  //with this object we protect private routes
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Explore/>
    },
    {
      path:'/upload',
      element: user ? <Upload/> : <Explore/>
    },
    {
      path:'/profile',
      element: user ? <Profile/>: <Explore/>
    }
  ])
  
  // listens for logins/logouts and then collects 
  // if is a login, collects data from mongo and sets the state redux 
  useEffect(() => {
    if (isAuthenticated){
      console.log(user)
      COllectUserInfoFromDB(user.email).then(user=>{
        console.log(user)
        // set data in redux 
        dispatch({type:'UPDATE_USER_INFO',
        user})
      })
    }
  }, [isAuthenticated])
  
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
