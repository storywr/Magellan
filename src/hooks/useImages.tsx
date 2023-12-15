import axios from 'axios'
import { useQuery } from 'react-query'

import api from '../utils/api'

interface Props {
  search: string;
  enabled: boolean;
}

const useImages = ({ search, enabled }: Props) => {
  return useQuery(['images', search], async () => {
    const { data } = await axios({
      method: 'GET',
      url: `${api.pixabay.image}&q=${search}&image_type=photo&per_page=10&min_width=250`
    })
    return data
  }, { enabled })
}

export default useImages
