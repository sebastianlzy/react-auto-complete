import reduce from 'lodash-es/reduce';

export default (results) => {
  return reduce(results.items, (acc, item) => {
    acc.push({
      id: item.id,
      name: item.name,
      fullName: item.full_name,
      htmlUrl: item.html_url,
      description: item.description
    });
    return acc;
  }, [])
};