import { 
  Box, 
  Card, CardBody, 
  Stack, Skeleton, 
  Heading, Image, 
  Text, CircularProgress, Divider  } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useEffect } from 'react';
import {collectInfoFromWiki} from '../API/wikiApiFunctions'


export default function ActiveCard({bird}) {
  

  const [cardState, setCardState] = useState(null)
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    setLoading(true)
    async function func(){
      const {imgUrl, info} = await collectInfoFromWiki(bird.sciName)
      setCardState({
        info,
        imgUrl:bird.url||imgUrl//||'https://upload.wikimedia.org/wikipedia/commons/b/bc/Valk_Segelzeichen.svg'
      })
      setLoading(false) 
    }
    func()
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
        maxW='150px'
        minW='150px'
        maxH='150px'
        minH='150px'>
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
