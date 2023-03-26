import _ from 'lodash';

export default (data) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/xml');
  console.log(doc);
  const feed = {
    id: _.uniqueId(),
    title: doc.querySelector('title').textContent,
    description: doc.querySelector('description').textContent,
    items: [],
  };
  const items = doc.querySelectorAll('item');
  items.forEach((item) => {
    const id = _.uniqueId();
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;
    const link = item.querySelector('link').textContent;
    feed.items.push({
      id, title, description, link,
    });
  });
  return feed;
};
