import { 
  Box, 
  Card, CardBody, 
  Stack, Skeleton, 
  Heading, Image, 
  Button,Text, CircularProgress, Divider  } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function ActiveCard({bird}) {
  

  const [info, setInfo] = useState(undefined);
  const [img, setImg] = useState(undefined);

  const [cardState, setCardState] = useState(null)

  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    setLoading(true)
    async function collectInfoFromWiki(birdName) {
      const wikiInfoURL = encodeURI(`https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=extracts&generator=prefixsearch&redirects=1&converttitles=1&formatversion=2&exintro=1&explaintext=1&gpssearch=${birdName}`)
      const infoResults = await fetch(wikiInfoURL)
      const infoData = await infoResults.json()
      const wikiImgUrl = encodeURI(`https://en.wikipedia.org/w/api.php?action=query&pageids=${infoData.query.pages[0].pageid}&prop=pageimages&format=json&pithumbsize=150&origin=*`)
      const imgResults = await fetch(wikiImgUrl)
      const imgData = await imgResults.json()
      setCardState({
        info:infoData.query.pages[0].extract,
        imgUrl:bird.url || imgData.query.pages[infoData.query.pages[0].pageid].thumbnail.source
      })
      setLoading(false)
    }
    collectInfoFromWiki(bird.sciName)
  }, [bird])
  
  
  return (
    <Box>
      {
      loading?
      <Card
      direction='row'
      overflow='hidden'
      variant='outline'>
      <Box
        maxW='150px'
        minW='150px'
        maxH='150px'
        minH='150px'>
      <CircularProgress size={'140px'} isIndeterminate color='teal.300' />
      </Box>
      <CardBody p='0' px='10px'  py='5px'>
        <Stack>
          <Skeleton height='20px' />
          <Skeleton height='20px' />
          <Skeleton height='20px' />
          <Skeleton height='20px' />
          <Skeleton height='20px' />            
        </Stack>
      </CardBody>
    </Card>
      :
      <Card
        direction='row'
        overflow='hidden'
        variant='outline'>
        <Image
          objectFit='cover'
          maxW='150px'
          minW='150px'
          maxH='150px'
          minH='150px'
          src={cardState.imgUrl}
          alt={bird.comName}
        />
        <CardBody p='0' pl='5px'  pt='5px'>
          <Heading size='sm'>{bird.comName} &bull; <span style={{color:'gray'}}>{bird.sciName}</span> </Heading>
          <Text py='1' noOfLines={4}>
            {cardState.info}
          </Text>
          <Divider/>
          <Text size='xs'>Seen at {bird.obsDt}</Text>{bird.userId}
        </CardBody>
      </Card>
      }

  </Box>
  )
}
