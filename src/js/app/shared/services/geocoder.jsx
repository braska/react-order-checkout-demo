import axios from 'axios';

// eslint-disable-next-line
const API_KEY = __GEOCODER_API_KEY___;

export default (lat, lng, options) => (
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: Object.assign({
      latlng: `${lat},${lng}`,
      key: API_KEY,
    }, options),
  })
);
