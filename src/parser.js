import _ from 'lodash';

export default (data, currentUrl) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/xml');

  const errorNode = doc.querySelector('parsererror');
  if (errorNode) {
    throw new Error('invalidRss');
  }

  try {
    const feed = {
      id: _.uniqueId(),
      url: currentUrl,
      title: doc.querySelector('title').textContent,
      description: doc.querySelector('description').textContent,
    };
    const itemsEl = doc.querySelectorAll('item');
    const items = [];
    itemsEl.forEach((item) => {
      const id = _.uniqueId();
      const feedId = feed.id;
      const title = item.querySelector('title').textContent;
      const description = item.querySelector('description').textContent;
      const link = item.querySelector('link').textContent;
      items.push({
        id, feedId, title, description, link,
      });
    });
    return { feed, items };
  } catch (e) {
    throw new Error('unknown');
  }
};
