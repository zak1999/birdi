<img src="birdiLogoJPG.jpg" width='600px' style="display: block; margin: 0 auto"/>

# Birdi - Developer Guide

Birdi is a bird sighting application that allows bird enthusiasts and ornithologists to record and track their bird sightings.
This guide provides detailed instructions for developers who want to set up and run Birdi locally.

Prerequisites
Before getting started, you should have the following tools installed on your system:

- Git
- Node.js and npm
- TypeScript
- nodemon

## Setting up the repository

1. Open your terminal and navigate to the directory where you want to store the Birdi repository.
2. Clone the repository:
   ```bash
    git clone <repo url>
   ```
3. Navigate to the root directory of the cloned repository:
   ```bash
    cd birdi/
   ```

## Installing dependencies

1. Install dependencies in client folder:
   ```bash
    cd client/
    npm i
   ```
2. Install dependencies in server folder:
   ```bash
    cd ../server/
    npm i
   ```

## Compiling Typescript

1. From server folder:

   ```bash
    tsc build
   ```

   dist folder will appear in server folder

2. From client folder:
   ```bash
    tsc build
   ```
   dist folder will appear in the client folder

## Running the client and server

1. From the server folder:
   ```bash
    npm run dev
   ```
   Verify that 'Server listening on port PORT' and 'db connected' prints to the console.
2. From the client folder:
   ```bash
    npm run dev
   ```
   The react app will open the default port.

## Contributing

We welcome contributions to Birdi from the community. If you are interested in contributing, please read our
contribution guidelines and reach out to us at alexryanjones@gmx.com or contact.sethjplatt@gmail.com.

## Support

For support with setting up and running Birdi locally, please contact us at alexryanjones@gmx.com or contact.sethjplatt@gmail.com.

## Screenshots

<img src="birdi-2.jpg" width='300px'/>
<img src="birdi-1.jpg" />
<img src="birdi-3.jpg" />
<img src="birdi-4.jpg" />
