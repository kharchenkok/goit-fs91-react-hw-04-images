import axios from 'axios';

const API_KEY = '17935343-c69abdbb5347cbe1498525dc9';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getImagesWithSearch = async (query, page = 1, perPage) => {
  axios.defaults.params = {
    q: query,
    page: page,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: perPage,
  };

  const { data } = await axios();
  return data;
};
