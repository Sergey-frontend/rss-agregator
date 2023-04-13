export default (data) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/xml');

  const errorNode = doc.querySelector('parsererror');
  if (errorNode) {
    throw new Error('invalidRss');
  }

  try {
    const feed = {
      title: doc.querySelector('title').textContent,
      description: doc.querySelector('description').textContent,
    };
    const itemsEl = doc.querySelectorAll('item');

    const items = Array.from(itemsEl).map((item) => {
      const title = item.querySelector('title').textContent;
      const description = item.querySelector('description').textContent;
      const link = item.querySelector('link').textContent;
      return { title, description, link };
    });
    return { feed, items };
  } catch (e) {
    throw new Error('unknown');
  }
};
