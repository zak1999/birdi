import { 
  Box, 
  Card, CardBody, 
  Stack, Text, 
  Heading, Image, 
  Button,Divider, 
  CardFooter, ButtonGroup  } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function ActiveCard({bird}) {
  
  const [info, setInfo] = useState(undefined)
  const [img, setImg] = useState(undefined)

  async function collectInfoFromWiki(birdName) {
    // const url = encodeURI(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${birdName}`)
    const url2 = encodeURI(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=prefixsearch&redirects=1&converttitles=1&formatversion=2&exintro=1&explaintext=1&gpssearch=${birdName}`)
    console.log(url2)
    const result = await fetch(url2, {mode: 'no-cors'});
    console.log(result)
    const data = await result.json()
    return data
  }
  
  return (
    <Box>
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
        src='https://picsum.photos/100'
        alt={bird.comName}
      />
      <CardBody p='0' pl='5px'  pt='5px'>
        <Heading size='sm'>{bird.comName}</Heading>
        <Text py='1' noOfLines={4}>
          Caffè latte is a coffee beverage of Italian origin made with espresso
          and steamed milk. Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet reiciendis aliquam nam error fugit quisquam dolorem! Magni nulla maiores laudantium quos, distinctio sint porro officiis asperiores explicabo magnam, rem facilis?
        </Text>
      </CardBody>
</Card>
    </Box>
  )
}
