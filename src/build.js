let UniqId = 1;

export default (doc) => {
  const errorNode = doc.querySelector('parsererror');
  if (errorNode) {
    throw new Error('invalidRss');
  }
  try {
    const feed = {
      id: UniqId,
      title: doc.querySelector('title').textContent,
      description: doc.querySelector('description').textContent,
    };
    const itemsEl = doc.querySelectorAll('item');
    const items = [];
    itemsEl.forEach((item) => {
      const id = UniqId;
      const title = item.querySelector('title').textContent;
      const description = item.querySelector('description').textContent;
      const link = item.querySelector('link').textContent;
      items.push({
        id, title, description, link,
      });
    });
    UniqId += 1;
    return { feed, items };
  } catch (e) {
    throw new Error('unknown');
  }
};
