import axios from 'axios/dist/axios';
import get from 'lodash-es/get';
import isEmpty from 'lodash-es/isEmpty';

export const getSearchResult = (searchQuery) => {
  if (isEmpty(searchQuery)) {
    return Promise.resolve([])
  }
  const queryParams = {
    params: {q: searchQuery}
  };
  return axios.get("https://api.github.com/search/repositories", queryParams)
    .then((resp) => get(resp, 'data', []))
};
