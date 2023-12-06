import { Skeleton } from "@chakra-ui/react"
import Carousel from "react-multi-carousel"

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

const SkeletonCarousel = () => {
  return (
    <Carousel responsive={responsive}>
      {Array.from({ length: 4 }).map((u, i) => (
        <Skeleton key={i} width='100' height={300} rounded='xl' margin='1rem 0.5rem' />
      ))}
    </Carousel>
  )
}

export default SkeletonCarousel
