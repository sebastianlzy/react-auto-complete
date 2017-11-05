import {getCache, setCache} from './cache'

test('should setCache and retrieve the latest result', () => {
  setCache('query1', {test1: 'test1'});
  setCache('query1', {test2: 'test2'});
  expect(getCache('query1').data).toEqual({test2: 'test2'});
});

test('should setCache and retrieve the empty result', () => {
  setCache('query1', {});
  expect(getCache('query1').data).toEqual({});
});

test('should retrieve non expired result setCache', () => {
  const expireOneMinuteLater = new Date(new Date().getTime() + 1 * 60000);
  setCache('query1', {test1: 'test1'}, expireOneMinuteLater);
  expect(getCache('query1')).toEqual({
    data: {test1: 'test1'},
    expiredAt: expireOneMinuteLater,
  });
});

test('should expire result setCache', () => {
  setCache('query1', {test1: 'test1'}, new Date(new Date().getTime() - 5 * 60000));
  expect(getCache('query1')).toEqual(null);
});