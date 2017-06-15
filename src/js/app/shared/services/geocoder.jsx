import axios from 'axios';

export default (lat, lng, options) => (
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: Object.assign({
      latlng: `${lat},${lng}`,
      key: 'AIzaSyAn9il3fjdDSZIpdGde4SfGTZ-drB3x0Fw',
    }, options),
  })
);
