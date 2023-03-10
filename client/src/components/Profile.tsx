import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Container,
  SimpleGrid,
  GridItem,
  Card,
  CardBody,
  Avatar,
  Text,
} from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { CollectUserInfoFromDB } from '../API/dbFunctions';
import ActiveCard from './ActiveCard';
import { BirdiUserSighting } from '../Types/DbApiTypes';

export default function Profile() {
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(false)

  const [birdsByUser, setBirdsByUser] = useState<BirdiUserSighting[]>([]);
  useEffect(() => {
    if (isAuthenticated) {
      user?.email &&
        CollectUserInfoFromDB(user.email).then((user) => {
          dispatch({
            type: 'UPDATE_USER_INFO',
            user,
          });
          setBirdsByUser(user.birdSightingsIds || []);
          setClicked(false)
        });
    }
  }, [clicked]);
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to={'/'} replace />;
  }
  return (
    isAuthenticated && (
      <Box>
        <Container
          minW='85vw'
          p='20px'
          minH='85vh'
          display='flex'
          flexDir='column'
        >
          <Box display='flex' alignSelf='center' maxW='400px' minW='400px'>
            <Card bg='brand.whiteish.def' my='25px' w='100%' textAlign='center'>
              <CardBody pt='70px'>
                <Box>
                  <Avatar
                    pos='absolute'
                    top={-35}
                    left={'150px'}
                    justifySelf='center'
                    alignSelf={'center'}
                    size='xl'
                    bg={'yellow.900'}
                  />
                  <Text>
                    <b>{user && user.nickname}</b> has seen {birdsByUser.length}{' '}
                    bird
                    {(birdsByUser.length > 1 || birdsByUser.length === 0) && (
                      <>s</>
                    )}
                  </Text>
                </Box>
              </CardBody>
            </Card>
          </Box>
          <SimpleGrid columns={2} spacing={2} maxHeight={'70vh'} overflow={'scroll'}>
            {birdsByUser.length > 0 &&
              birdsByUser.map((bird) => (
                <GridItem>
                  <ActiveCard key={bird._id} bird={bird as BirdiUserSighting} setClicked={setClicked} profile />
                </GridItem>
              ))}
          </SimpleGrid>
        </Container>
      </Box>
    )
  );
}
