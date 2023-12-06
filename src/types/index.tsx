export interface PixabayItem {
  id: string
  category: string
  name: string
  likes: number
  favorites: number
  tags: string
  webformatURL: string
  largeImageURL: string
  userImageURL: string
  user: string
  embed_url: string
  videos: any
  type: string;
}

export interface WikiItem {
  id: string;
  pageid: string;
  title: string;
  extract: string;
  type: string;
}

export interface GiphyItem {
  id: string;
  embed_url: string;
  user: {
    username: string;
    avatar_url: string;
  }
  type: string;
}

export type Item = PixabayItem | WikiItem | GiphyItem

export enum Source {
  image = 'image',
  video = 'video',
  gif = 'gif',
  wiki = 'wiki'
}
