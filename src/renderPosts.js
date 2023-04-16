export default (state, postsList, elements, i18next) => {
  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  postsList.forEach((item) => {
    const { id, title, link } = item;

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
    a.textContent = title;
    a.setAttribute('href', link);
    a.setAttribute('data-id', id);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');

    if (state.idVisitedPosts.includes(id)) {
      a.classList.add('fw-normal');
    } else {
      a.classList.add('fw-bold');
    }

    const button = document.createElement('button');
    button.textContent = i18next.t('renderPosts.button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.setAttribute('type', 'button');
    button.setAttribute('data-id', id);
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
  posts.replaceChildren(card);
};
