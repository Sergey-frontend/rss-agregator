export default (feedsList, elements, i18next) => {
  const divEl = document.createElement('div');
  divEl.classList.add('list-group', 'border-0', 'rounded-0');

  feedsList.forEach((feed) => {
    const liEL = document.createElement('li');
    liEL.classList.add('list-group-item', 'border-0', 'border-end-0');

    const header = document.createElement('h3');
    header.classList.add('h6', 'm-0');
    header.textContent = feed.title;

    const description = document.createElement('p');
    description.classList.add('m-0', 'small', 'text-black-50');
    description.textContent = feed.description;

    liEL.prepend(description);
    liEL.prepend(header);

    divEl.prepend(liEL);
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
  card.append(divEl);

  const { feeds } = elements;
  feeds.replaceChildren(card);
};
