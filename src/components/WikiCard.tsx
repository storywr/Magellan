import { Text, Card, CardBody, CardFooter, CardHeader, Heading, Icon, Flex } from "@chakra-ui/react"
import { FaWikipediaW } from 'react-icons/fa'

import { Item, WikiItem } from "../types";
import useSave from "../hooks/useSave"
import FavoriteButton from "./FavoriteButton";

interface WikiCardProps {
  item: WikiItem;
  noOutline: boolean;
}

const WikiCard = ({ item, noOutline }: WikiCardProps) => {
  const { savedItems } = useSave()
  const isSaved = savedItems.some((savedItem: Item) => savedItem.id === item.id)

  return (
    <Card rounded='xl' boxShadow={(isSaved && !noOutline) ? 'outline' : 'lg'} m='1rem 0.5rem'>
      <CardHeader>
        <Flex direction='row' justify='space-between'>
          <Heading size='md'>{item.title}</Heading>
          <Icon boxSize={6} as={FaWikipediaW} />
        </Flex>
      </CardHeader>
      <CardBody maxHeight={300} overflow='scroll'>
        <Text lineHeight={2} whiteSpace='break-spaces'>{item.extract}</Text>
      </CardBody>
      <CardFooter
        padding='1.5rem'
        justify='space-between'
        flexWrap='wrap'
      >
        <FavoriteButton isSaved={isSaved} item={item} />
      </CardFooter>
    </Card>
  )
}

export default WikiCard
