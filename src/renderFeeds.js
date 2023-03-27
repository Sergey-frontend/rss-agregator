export default (feedsList, elements, i18next) => {
  const ul = document.createElement('div');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  const flatFeedlist = feedsList.flat();

  flatFeedlist.forEach((feed) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');

    const header = document.createElement('h3');
    header.classList.add('h6', 'm-0');
    header.textContent = feed.title;

    const description = document.createElement('p');
    description.classList.add('m-0', 'small', 'text-black-50');
    description.textContent = feed.description;

    li.prepend(description);
    li.prepend(header);

    ul.prepend(li);
  });

  const title = document.createElement('h2');
  title.classList.add('card-title', 'h4');
  title.textContent = i18next.t('renderFeeds.header');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  cardBody.prepend(title);

  const card = document.createElement('div');
  card.classList.add('card', 'border-0');

  card.prepend(cardBody);
  card.append(ul);

  const { feeds } = elements;
  feeds.textContent = '';
  feeds.prepend(card);
};
