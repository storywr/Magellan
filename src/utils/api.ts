const PIXABAY_API_KEY = process.env.REACT_APP_PIXABAY_KEY;
const GIPHY_API_KEY = process.env.REACT_APP_GIPHY_KEY;

const url = {
  pixabay: {
    image: `https://pixabay.com/api/?key=${PIXABAY_API_KEY}`,
    video: `https://pixabay.com/api/videos?key=${PIXABAY_API_KEY}`,
  },
  giphy: `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}`,
  wikipedia: 'https://en.wikipedia.org/w/api.php'
}

export default url
