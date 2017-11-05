import _get from 'lodash-es/get';

const resultSet = {};

export const getCache = (searchValue) => {
  const result = _get(resultSet, searchValue, null);
  if (_get(result, 'expiredAt', 0) < Date.now()) {
    return null;
  }
  return result
};

const addFiveMinutesToExpiryTime = (date) => {
  return new Date(date.getTime() + 5*60000)
};

export const setCache = (searchValue, result, expiredDateTime = null) => {
  resultSet[searchValue] = {
    data: result,
    expiredAt: expiredDateTime || addFiveMinutesToExpiryTime(new Date())
  }
};