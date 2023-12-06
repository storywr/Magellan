import { useMemo } from "react"
import { Badge, Box, Button, Flex, Heading, VStack } from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"

import ItemCarousel from "../components/ItemCarousel"
import useSave from "../hooks/useSave"
import { Item } from "../types"

const Favorites = () => {
  const { savedItems, clear } = useSave()

  const filteredItems = useMemo(() => {
    const imageItems = savedItems?.filter((item: Item) => item.type === 'photo')
    const videoItems = savedItems?.filter((item: Item) => item.type === 'film' || item.type === 'animation')
    const gifItems = savedItems?.filter((item: Item) => item.type === 'gif')
    const wikiItems = savedItems?.filter((item: Item) => item.type === 'wiki')

    return { imageItems, videoItems, gifItems, wikiItems }
  }, [savedItems])

  return (
    <Flex direction='column' gap={4}>
      <VStack>
        <Heading size='lg'>Your Favorites</Heading>
        <Button onClick={() => clear()} rightIcon={<DeleteIcon boxSize={6} />}>
          Clear Favorites
        </Button>
      </VStack>
      {savedItems.length > 0 ? (
        <>
          <ItemCarousel noOutline variant='image' items={filteredItems?.imageItems} />
          <ItemCarousel noOutline variant='video' items={filteredItems?.videoItems} />
          <ItemCarousel noOutline variant='gif' items={filteredItems?.gifItems} />
          <ItemCarousel noOutline variant='wiki' items={filteredItems?.wikiItems} />
        </>
      ): <Box m='1rem auto'><Badge p='1rem' variant='outline' colorScheme='cyan'>Nothing here yet</Badge></Box>}
    </Flex>
  )
}

export default Favorites
