import { ChangeEvent, useEffect, useState } from 'react'
import { AddIcon, CloseIcon, SearchIcon } from '@chakra-ui/icons'
import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Tag,
  TagCloseButton,
  TagLabel,
  TagRightIcon
} from '@chakra-ui/react'

import useDebouncedValue from '../hooks/useDebouncedValue'
import useImages from '../hooks/useImages'
import useVideos from '../hooks/useVideos'
import useGifs from '../hooks/useGifs'
import useWikipedia from '../hooks/useWikipedia';
import ItemCarousel from '../components/ItemCarousel'
import { Source } from '../types'

const AllItems = () => {
  const [sources, setSources] = useState<Source[]>(Object.values(Source))
  const [search, setSearch] = useState<string>('')
  const debouncedSearch = useDebouncedValue(search, 500)
  const isActive = (source: Source) => sources.includes(source)
  const {
    data: images,
    isFetching: isFetchingImages,
    error: errorImages,
    refetch: refetchImages
  } = useImages({ search: search.trim(), enabled: isActive(Source.image) })
  const {
    data: videos,
    isFetching: isFetchingVideos,
    error: errorVideos,
    refetch: refetchVideos
  } = useVideos({ search: search.trim(), enabled: isActive(Source.video) })
  const {
    data: articles,
    isFetching: isFetchingArticles,
    error: errorArticles,
    refetch: refetchArticles
  } = useWikipedia({ search: search.trim(), enabled: isActive(Source.wiki) })
  const {
    data: gifs,
    isFetching: isFetchingGifs,
    error: errorGifs,
    refetch: refetchGifs
  } = useGifs({ search: search.trim(), enabled: isActive(Source.gif) })
  const isError = errorImages || errorVideos || errorGifs || errorArticles

  useEffect(() => {
    refetchImages()
    refetchVideos()
    refetchGifs()
    refetchArticles()
  }, [debouncedSearch])

  if (isError) return (
    <Box>
      <Alert status='error'>
        <AlertIcon />
        There was an error processing your request
      </Alert>
    </Box>
  )

  const handleTag = (sourceOption: Source) => {
    if (isActive(sourceOption)) {
      setSources(prevState => prevState.filter(badge => badge !== sourceOption))
    } else {
      setSources(prevState => [ ...prevState, sourceOption ])
    }
  }

  return (
    <Box>
      <HStack mb={4} gap={4} justify='center' flexWrap='wrap'>
        <InputGroup width={['100%', '26rem']}>
          <InputLeftElement pointerEvents='none'>
            <SearchIcon color='gray.600' />
          </InputLeftElement>
          <Input
            rounded='2xl'
            name='title'
            placeholder='Search'
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
          {search && (
            <InputRightElement style={{ cursor: 'pointer' }} onClick={() => setSearch('')}>
              <CloseIcon color='gray.600' />
            </InputRightElement>
          )}
        </InputGroup>
        {Object.values(Source).map(sourceOption => (
          <Tag
            alignSelf='stretch'
            key={sourceOption}
            size='lg'
            borderRadius='full'
            variant={isActive(sourceOption) ? 'solid' : 'outline'}
            colorScheme='cyan'
            onClick={() => handleTag(sourceOption)}
            style={{ cursor: 'pointer' }}
          >
            <TagLabel>{sourceOption}</TagLabel>
            {isActive(sourceOption) 
              ? <TagCloseButton />
              : <TagRightIcon boxSize={3} as={AddIcon} />
            }
          </Tag>
        ))}
      </HStack>
      <Flex direction='column' gap='2rem'>
        {isActive(Source.image) && <ItemCarousel variant='image' isFetching={isFetchingImages} items={images?.hits ?? []} />}
        {isActive(Source.video) && <ItemCarousel variant='video' isFetching={isFetchingVideos} items={videos?.hits ?? []} />}
        {isActive(Source.gif) && <ItemCarousel variant='gif' isFetching={isFetchingGifs} items={gifs?.data ?? []} />}
        {isActive(Source.wiki) && <ItemCarousel variant='wiki' isFetching={isFetchingArticles} items={articles?.data ?? []} />}
      </Flex>
    </Box>
  )
}

export default AllItems
