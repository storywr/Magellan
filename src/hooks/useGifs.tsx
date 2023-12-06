import axios from 'axios'
import { useQuery } from 'react-query'

import api from '../utils/api'

interface Props {
  search: string;
  enabled: boolean;
}

const useGifs = ({ search, enabled }: Props) => {
  return useQuery('gifs', async () => {
    const { data } = await axios({
      method: 'GET',
      url: `${api.giphy}&q=${search}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
    })
    return data
  }, { enabled })
}

export default useGifs
