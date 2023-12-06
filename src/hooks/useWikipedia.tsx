import axios from 'axios'
import { useQuery } from 'react-query'

import api from '../utils/api'

interface Props {
  search: string;
  enabled: boolean;
}

const useWikipedia = ({ search, enabled }: Props) => {
  return useQuery('wikipedia', async () => {
    const { data } = await axios({
      method: 'GET',
      url: `${api.wikipedia}?action=query&format=json&prop=extracts&generator=prefixsearch&redirects=1&converttitles=1&formatversion=2&exintro=1&explaintext=1&gpssearch=${search}&origin=*`
    })
    const { query, ...rest } = data
    const formattedData = query?.pages?.map((item: any) => ({ type: 'wiki', id: item.pageid, ...item }))
    return { data: formattedData, ...rest }
  }, { enabled })
}

export default useWikipedia