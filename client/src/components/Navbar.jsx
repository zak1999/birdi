import { Box, Stack } from '@chakra-ui/react'
import React from 'react'

import {Link} from 'react-router-dom'

export default function Navbar() {
  return (
    <Box>
      <Stack direction='row'>
        <Link to={'/upload'}>upload</Link>
        <Link to={'/'}>explore</Link>
      </Stack>
    </Box>
  )
}
