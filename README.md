# Birdi
<div align="center">
  <img src="/birdiLogoJPG.jpg" height="150px"></img>
</div>

Birdi is an app that provides birdwatchers with valuable information on interesting birds in their vicinity and fosters a vibrant community of bird enthusiasts by mapping nearby bird sightings submitted by users. 

### Screenshots
<div align="center">
   <img src="/screenshots/explore.png" height="250px"></img>
    <span>
      <img src="/screenshots/login.png" height="250px"></img>
    </span>

   <img src="/screenshots/profile.png" height="250px"></img>
   <span>
      <img src="/screenshots/upload.png" height="250px"></img>
   </span>
</div>


## Getting started
1. Clone the repo
```
$ git clone https://github.com/zak1999/birdi
$ cd birdi
```
2. Install dependencies:
    - For client
    ```
    $ cd client 
    $ npm install
    ```
    - For server folder (in a seperate terminal window)
    ```
    $ cd server 
    $ npm install
    ```
3. Start the application:
- For client
    ```
    $ npm start
    ```
- For server folder (in a seperate terminal window)
    ```
    $ nodemon index.js
    ```

## Tech Stack
- Front:
    - [React](https://reactjs.org/)
    - [Redux](https://redux.js.org/)   
    - [ChakraUI](https://chakra-ui.com/)
    - [MapboxGL](https://www.mapbox.com/)
- Back:
    - [Express](https://expressjs.com/) 
    - [MongoDB](https://www.mongodb.com/) + [mongoose](https://mongoosejs.com/)
    - [Auth0](https://auth0.com/)
    - [Google Cloud Storage](https://cloud.google.com/storage)
