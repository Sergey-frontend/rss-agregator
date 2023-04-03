export default (state, postId) => {
  const currentPost = state.posts.find((p) => p.id === postId);
  const {
    id, title, description, link,
  } = currentPost;

  const modal = document.querySelector('.modal');
  const modalTitle = document.querySelector('.modal-title');
  const modalBody = document.querySelector('.modal-body');
  const modalLink = document.querySelector('.btn-primary');

  modal.classList.add('show');
  modal.setAttribute('style', 'display: block');
  modal.setAttribute('aria-modal', 'true');
  modal.removeAttribute('aria-hidden');

  modal.setAttribute('data-id', id);
  modalTitle.textContent = title;
  modalBody.textContent = description;
  modalLink.setAttribute('href', link);
};
