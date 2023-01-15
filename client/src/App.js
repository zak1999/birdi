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

  const { isAuthenticated, user} = useAuth0() 
  
  async function handleCOllectUserInfo(email) {
    console.log("click")
    const userDataFromdb = await fetch('http://localhost:3001/users',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email})
    })
    const data = await userDataFromdb.json()
    return data
  }



  // listens for logins/logouts and then collects db from mongo if there is a user logged in
  useEffect(() => {
    if (isAuthenticated){
      console.log(user)
      handleCOllectUserInfo(user.email).then(data=>{
        console.log(data)
        // set data in redux 
      })
    }
  }, [isAuthenticated])
  
  return (
    <div className="App">
      <button onClick={()=>handleCOllectUserInfo()}>CLICK</button>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
