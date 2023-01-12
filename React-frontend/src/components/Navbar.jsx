import { FaMoon, FaSun } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'
import Navlink from './Navlink'
import {  HStack, IconButton, Spacer, useColorMode, useColorModeValue, useToast, Box, Button, useDisclosure, Drawer, DrawerOverlay, DrawerHeader, DrawerBody, DrawerFooter, DrawerContent, DrawerCloseButton, Link} from '@chakra-ui/react'
import React from 'react'
// import { Layout } from '../components/Layout'
// import FormModalDoct from '../components/FormModelDoct';
// import {collection, doc, getDocs, setDoc} from "firebase/firestore"
// import { db } from '../utils/init-firebase';
// import { query, where } from "firebase/firestore";
// import axios from 'axios';
// import { InfinitySpin } from 'react-loader-spinner';


export function Navbar() {
  const toast = useToast()
  const btnRef = React.useRef(null)
  const {isOpen, onOpen, onClose} = useDisclosure()
  const { toggleColorMode } = useColorMode()
  // const { logout, currentUser } = useAuth()
  const { logout, currentUser } = useAuth()

  return (
    <><Box
      borderBottom='2px'
      borderBottomColor={useColorModeValue('gray.100', 'gray.700')}
      mb={4}
      py={4}
    >
      <HStack
        justifyContent='flex-end'
        maxW='container.lg'
        mx='auto'
        spacing={4}
      >
        <Box style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'center' }}>
          <Button ref={btnRef} colorScheme='pink' variant='outline' onClick={onOpen}>
            Detect-Skin
          </Button>
        </Box>
        {/* <Navlink to='/' name='Detect-Skin' size='lg' /> */}
        <Spacer />
        {!currentUser && <Navlink to='/login' name='Login' />}
        {!currentUser && <Navlink to='/register' name='Register' />}
        {currentUser && <Navlink to='/profile' name='Profile' />}
        {currentUser && (
          <Navlink
            to='/logout'
            name='Logout'
            onClick={async (e) => {
              e.preventDefault()
              await logout()
              toast({
                description: "Logged out successfully",
                status: 'success',
                duration: 2000,
                isClosable: true,
              })
            } } />
        )}
        <IconButton
          variant='ghost'
          icon={useColorModeValue(<FaSun />, <FaMoon />)}
          onClick={toggleColorMode}
          aria-label='toggle-dark-mode' />
      </HStack>
    </Box><Drawer
      isOpen={isOpen}
      placement='left'
      onClose={onClose}
      finalFocusRef={btnRef}
    >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Navigate to</DrawerHeader>
          <DrawerBody>
            <Button variant='outline' width='270px' colorScheme='pink' mb={2}><Link href='/' colorScheme='pink'>Home Page</Link></Button>
            <Button variant='outline' width='270px' colorScheme='pink' mb={2}><Link href='/profile' colorScheme='pink'>Profile Page</Link></Button>
            <Button variant='outline' width='270px' colorScheme='pink' mb={2}  onClick={async (e) => {
              e.preventDefault()
              await logout()
              toast({
                description: "Logged out successfully",
                status: 'success',
                duration: 2000,
                isClosable: true,
              })
            }}>Logout</Button>
            <Button variant='outline' width='270px' colorScheme='pink' mb={2}><Link href='/reset-password' colorScheme='pink'>Reset Password</Link></Button>
          </DrawerBody>
          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>

      </Drawer></>
  )
}
