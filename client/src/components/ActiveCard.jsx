import { 
  Box, 
  Card, CardBody, 
  Stack, Skeleton, 
  Heading, Image, 
  Text, CircularProgress, Divider  } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useEffect } from 'react';
import {collectInfoFromWiki} from '../API/wikiApiFunctions'


export default function ActiveCard({bird, profile}) {
  

  const [cardState, setCardState] = useState(null)
  const [loading, setLoading] = useState(true);
  
  const imgSizing = profile ? '150px': '150px' 
  
  useEffect(() => {
    setLoading(true)
    async function birdInfoCollection(){
      const {imgUrl, info} = await collectInfoFromWiki(bird.sciName)
      setCardState({
        info,
        imgUrl:bird.url||imgUrl//||'https://upload.wikimedia.org/wikipedia/commons/b/bc/Valk_Segelzeichen.svg'
      })
      setLoading(false) 
    }
    birdInfoCollection()
  }, [bird])
  
  
  return (
    <Box>
      {
      loading?
      <Card
      bg='brand.whiteish.def'
      direction='row'
      overflow='hidden'
      variant='outline'>
      <Box
        maxW={imgSizing}
        minW={imgSizing}
        maxH={imgSizing}
        minH={imgSizing}>
      <CircularProgress size={'140px'} isIndeterminate color='brand.darkish' />
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
      bg='brand.whiteish.def'
        direction='row'
        overflow='hidden'
        variant='outline'>
        <Box maxW={imgSizing}>
        <Image
          objectFit='cover'
          maxW={imgSizing}
          minW={imgSizing}
          maxH={imgSizing}
          minH={imgSizing}
          src={cardState.imgUrl}
          alt={bird.comName}
        />
        <Divider/>
          <Text size='xs'>Seen at {bird.obsDt}</Text>
        </Box>
        <CardBody p='0' pl='5px'  pt='5px'>
          <Heading size='sm'>{bird.comName} &bull; <span style={{color:'gray'}}>{bird.sciName}</span> </Heading>
          <Text py='1' noOfLines={6}>
            {cardState.info}
          </Text>
          <Divider/>
          {bird.userEmail &&  <Text>Seen by: {bird.userEmail}</Text>}
        </CardBody>
      </Card>
      }

  </Box>
  )
}
