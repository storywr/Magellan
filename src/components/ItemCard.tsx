import { Avatar, Card, CardFooter, CardHeader, Flex, Heading, Icon, Image } from "@chakra-ui/react"
import { AiOutlineGif, AiOutlineVideoCamera } from 'react-icons/ai'
import { BsImage } from 'react-icons/bs'

import thumbnail from '../assets/thumb-medium.png'
import useSave from "../hooks/useSave"
import FavoriteButton from "./FavoriteButton"
import { GiphyItem, Item, PixabayItem } from "../types"
import { IconType } from "react-icons"

type Variant = 'image' | 'video' | 'gif'

interface ItemCardProps {
  item: Item;
  variant: Variant;
  noOutline: boolean;
}

type ItemData = {
  userName: string;
  avatarURL: string;
  embedURL: string;
  variantIcon: IconType;
  webformatURL?: string;
}

const mapItemData = (item: Item, variant: Variant ): ItemData => {
  if (variant === 'gif') {
    const giphyItem = item as GiphyItem
    return {
      userName: giphyItem.user?.username,
      avatarURL: giphyItem.user?.avatar_url,
      embedURL: giphyItem.embed_url,
      variantIcon: AiOutlineGif
    }
  } else {
    const pixabayItem = item as PixabayItem
    return {
      userName: pixabayItem.user,
      avatarURL: pixabayItem.userImageURL,
      webformatURL: pixabayItem.webformatURL,
      embedURL: pixabayItem.videos?.small.url,
      variantIcon: variant === 'image' ? BsImage : AiOutlineVideoCamera
    }
  }
}

const ItemCard = ({ item, variant, noOutline }: ItemCardProps) => {
  const { savedItems } = useSave()
  const { userName, avatarURL, embedURL, variantIcon, webformatURL } = mapItemData(item, variant)
  const isSaved = savedItems.some((savedItem: Item) => savedItem.id === item.id)

  return (
    <Card rounded='xl' boxShadow={(isSaved && !noOutline) ? 'outline' : 'lg'} m='1rem 0.5rem'>
      <CardHeader>
        <Flex flex='1' alignItems='center' flexWrap='wrap' justify='space-between'>
          <Flex direction='row' alignItems='center' gap='4'>
            <Avatar name={userName} src={avatarURL} />
            <Heading size='sm'>{userName}</Heading>
          </Flex>
          <Icon boxSize={6} as={variantIcon} />
        </Flex>
      </CardHeader>
      {variant === 'image'
        ? <Image
            height={200}
            margin='auto'
            src={webformatURL}
            fallbackSrc={thumbnail}
            fallbackStrategy='onError'
            borderRadius='lg'
          />
        : <iframe height={200} src={embedURL}></iframe>
      }
      <CardFooter
        justify='space-between'
        flexWrap='wrap'
      >
        <FavoriteButton isSaved={isSaved} item={item} />
      </CardFooter>
    </Card>
  )
}

export default ItemCard
