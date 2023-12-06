import Carousel from "react-multi-carousel"
import { Badge, Box, Heading } from "@chakra-ui/react"
import "react-multi-carousel/lib/styles.css";

import SkeletonCarousel from "./SkeletonCarousel"
import ItemCard from "./ItemCard"
import WikiCard from "./WikiCard"
import { Item, WikiItem } from "../types";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
}

interface ItemCarouselProps {
  isFetching?: boolean;
  items: Item[];
  variant: 'image' | 'video' | 'gif' | 'wiki';
  noOutline?: boolean;
}

const ItemCarousel = ({ isFetching = false, items, variant, noOutline = false }: ItemCarouselProps) => {
  if (isFetching) return <SkeletonCarousel />

  return (
    <Box>
      <Box margin='0 0 0 1rem'>
        <Heading size='md'>{variant}</Heading>
        {items.length < 1 && <Badge p='0.5rem' mt='1rem' variant='outline' colorScheme='cyan'>No data found</Badge>}
      </Box>
      <Carousel responsive={responsive}>
        {items?.map((item: Item) => (
          variant === 'wiki'
            ? <WikiCard key={item.id} noOutline={noOutline} item={item as WikiItem} />
            : <ItemCard key={item.id} noOutline={noOutline} variant={variant} item={item} />
        ))}
      </Carousel>
    </Box>
  )
}

export default ItemCarousel
