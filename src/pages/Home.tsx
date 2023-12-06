import { Route, Switch } from 'react-router-dom'
import { Flex } from '@chakra-ui/react'

import AllItems from './AllItems'
import Nav from '../components/Nav'
import Favorites from './Favorites'

const Home = () => (
  <Flex padding='0 1rem' minH='100vh' minW='100vw' direction='column' m='1rem 0'>
    <Nav />
    <Switch>
      <Route exact path='/' component={AllItems} />
      <Route exact path='/favorites' component={Favorites} />
    </Switch>
  </Flex>
)

export default Home
