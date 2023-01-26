import {
  Box,
  Button,
  Card,
  CardBody,
  Stack,
  Skeleton,
  Heading,
  Image,
  Text,
  CircularProgress,
  Divider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { collectInfoFromWiki } from '../API/wikiApiFunctions';
import { ActiveCardProps, CardState } from '../Types/ActiveCardTypes';
import { TfiMore } from 'react-icons/tfi';
import { useAuth0 } from '@auth0/auth0-react';
import { removeSighting } from '../API/dbFunctions';
import { User } from '../../node_modules/@auth0/auth0-spa-js/dist/typings/global.d'
import { set } from 'immer/dist/internal';

export default function ActiveCard({ bird , profile, birdsByUser, setBirdsByUser, clicked, setClicked }: ActiveCardProps) {
  const [cardState, setCardState] = useState<CardState | null>(null);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user }: User = useAuth0();


  const imgSizing = profile ? '190px' : '130px';

  useEffect(() => {
    setLoading(true);
    async function birdInfoCollection() {
      const { imgUrl, info } = await collectInfoFromWiki(bird.sciName);
      setCardState({
        info: info.toString(),
        imgUrl: ((('url' in bird) ? bird.url : '' || imgUrl)).toString()

      });
      setLoading(false);
    }
    birdInfoCollection();
  }, [bird]);

  return (
    <>
      {loading ? (
        <Card
          minH='180px'
          maxH='180px'
          pb='10px'
          h='100%'
          bg='brand.whiteish.def'
          direction='row'
          overflow='hidden'
          variant='outline'
        >
          <Box
            maxW={imgSizing}
            minW={imgSizing}
            maxH={imgSizing}
            minH={imgSizing}
          >
            <CircularProgress
              size={imgSizing}
              isIndeterminate
              color='brand.darkish'
            />
          </Box>
          <CardBody p='0' px='10px' py='5px'>
            <Stack>
              <Skeleton height='20px' />
              <Skeleton height='20px' />
              <Skeleton height='20px' />
              <Skeleton height='20px' />
              <Skeleton height='20px' />
            </Stack>
          </CardBody>
        </Card>
      ) : (
        <>
          <Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside'>
            <ModalOverlay />
            <ModalContent bg='brand.whiteish.def'>
              <ModalHeader textAlign='center'>
                {bird.comName} &bull;{' '}
                <span style={{ color: '#2b2f35' }}>{bird.sciName}</span>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody display='flex' flexDir='column'>
                <Box margin='auto' px='20px' pb='20px'>
                  <Image
                    objectFit='cover'
                    w='200px'
                    h='200px'
                    src={cardState?.imgUrl}
                    alt={bird.comName}
                  />
                </Box>
                <Divider />
                {cardState?.info}
              </ModalBody>
            </ModalContent>
          </Modal>
          <Card
            bg='brand.whiteish.def'
            direction='row'
            overflow='hidden'
            variant='outline'
            data-testid='active-card'
          >
            <Box maxW={imgSizing}>
              <Image
                objectFit='cover'
                maxW={imgSizing}
                minW={imgSizing}
                maxH={imgSizing}
                minH={imgSizing}
                src={cardState?.imgUrl}
                alt={bird.comName}
                style={{maxHeight: '50px'}}
              />
              <Divider />
              <Text data-testid='active-seen-at' as='sub' size='xs'>
                Seen at {bird.obsDt}
              </Text>
            </Box>
            <CardBody p='0' pl='5px' pt='5px'>
              <Heading data-testid='active-com-name' size='sm' display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <div>
                {bird.comName} &bull;{' '}
                <span data-testid='active-sci-name' style={{ color: '#2b2f35' }}>
                  {bird.sciName}
                </span>{' '}
                </div>
                {profile ? <Button alignSelf={'flex-end'} onClick={async () => {
                  // @ts-ignore
                  await removeSighting(user.email, bird._id)
                  setClicked(true);
                  }} bg='none'>x</Button> : null}
              </Heading>
              <Text
                data-testid='active-short-info'
                py='1'
                noOfLines={profile ? 7 : 4}
              >
                {cardState?.info}
              </Text>
              <Divider color='black' />
              <Box display='flex' alignItems='center' pr='5px'>
                {('userEmail' in bird) && (
                  <Text display='inline'>
                    Seen by: <b>{bird.userEmail}</b>
                  </Text>
                )}
                {/* User can press the icon below to see more information in the modal*/}
                <Box
                  onClick={onOpen}
                  ml='auto'
                  justifySelf='end'
                  cursor='pointer'
                >
                  <TfiMore />
                </Box>
              </Box>
            </CardBody>
          </Card>
        </>
      )}
    </>
  );
}
