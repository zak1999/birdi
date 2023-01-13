import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css'

import Explore from './components/Explore';
import Upload from './components/Upload'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path:"/",
    element:<Explore/>
  },
  {
    path:'/upload',
    element:<Upload/>
  }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
