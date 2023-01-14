import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css'

import Explore from './components/Explore';
import Upload from './components/Upload'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Profile from './components/Profile';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const router = createBrowserRouter([
  {
    path:"/",
    element:<Explore/>
  },
  {
    path:'/upload',
    element:<Upload/>
  },
  {
    path:'/profile',
    element:<Profile/>
  }
])

function App() {

  const { isAuthenticated } = useAuth0() 
  
  // listens for log ins and then collects db from mongo if there is a user logged in
  useEffect(() => {
    console.log("User Activity happened")
    console.log(isAuthenticated)
    
  }, [isAuthenticated])
  
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
