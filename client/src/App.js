import 'mapbox-gl/dist/mapbox-gl.css';

import Explore from './components/Explore';
import Upload from './components/Upload';
import Navbar from './components/Navbar';

import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Profile from './components/Profile';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { CollectUserInfoFromDB } from './API/dbFunctions.ts';
import { Box } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  // ALEX - needs an initial state?
  const { isAuthenticated, user } = useAuth0();

  //router needs to be created in component to have access to the 'isAuthenticated' object,
  //with this object we protect private routes
  // const router = createBrowserRouter([
  //   {
  //     path:"/",
  //     element:<Explore/>
  //   },
  //   {
  //     path:'/upload',
  //     element: isAuthenticated ? <Upload/> : <Explore/>
  //   },
  //   {
  //     path:'/profile',
  //     element: isAuthenticated ? <Profile/>: <Explore/>
  //   }
  // ])

  // listens for logins/logouts and if it is a login,
  // collects data from mongo and sets the state redux

  // ALEX - add error handling?
  useEffect(() => {
    if (isAuthenticated) {
      // console.log(user)
      CollectUserInfoFromDB(user.email).then((user) => {
        // set data in redux
        dispatch({ type: 'UPDATE_USER_INFO', user });
      });
    }
  }, [isAuthenticated]);

  return (
    <Box bg='brand.darkish2' className='App' minH='100vh' maxH='100vh'>
      {/* <RouterProvider router={router}/> */}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Explore />} />
          <Route
            exact
            path='/upload'
            element={isAuthenticated ? <Upload /> : <Explore />}
          />
          <Route
            exact
            path='/profile'
            element={isAuthenticated ? <Profile /> : <Explore />}
          />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
