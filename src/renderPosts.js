// лучше перенести во вью

export default (postsList, elements, i18next) => {
  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  const flatPostsList = postsList.flat();

  flatPostsList.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-start',
      'border-0',
      'border-end-0',
    );

    const a = document.createElement('a');
    a.textContent = item.title;
    a.classList.add('fw-bold');
    a.setAttribute('href', item.link);
    a.setAttribute('data-id', item.id);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');

    const button = document.createElement('button');
    button.textContent = i18next.t('renderPosts.button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.setAttribute('type', 'button');
    button.setAttribute('data-id', item.id);
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');

    li.append(a);
    li.append(button);

    ul.append(li);
  });

  const card = document.createElement('div');
  card.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardTitle = document.createElement('h2');
  cardTitle.textContent = i18next.t('renderPosts.header');
  cardTitle.classList.add('card-title', 'h4');

  cardBody.prepend(cardTitle);

  card.prepend(cardBody);

  card.append(ul);

  const { posts } = elements;
  posts.textContent = '';
  posts.prepend(card);
};
