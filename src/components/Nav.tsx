import { Button, Flex, Icon } from "@chakra-ui/react"

import { ColorModeSwitcher } from "../ColorModeSwitcher"
import { useHistory } from "react-router-dom"
import { FaWpexplorer } from 'react-icons/fa'

const Nav = () => {
  const history = useHistory()

  return (
    <Flex margin='0 0 1rem 1rem' direction='row' justify='flex-start'>
      <Icon style={{ cursor: 'pointer' }} onClick={() => history.replace('/')} margin='auto 0.5rem auto 0' boxSize={10} as={FaWpexplorer} /> 
      <Button onClick={() => history.replace('/')} variant='ghost' size='lg'>Home</Button>
      <Button onClick={() => history.replace(`/favorites`)} variant='ghost' size='lg'>Favorites</Button>
      <ColorModeSwitcher margin='auto 0 auto 0' />
    </Flex>
  )
}

export default Nav
