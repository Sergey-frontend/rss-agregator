import onChange from 'on-change';
import renderFeeds from './renderFeeds';
import renderPosts from './renderPosts';
import renderModal from './renderModal';

const clear = (elements) => {
  const { input, feedback, button } = elements;
  feedback.classList.remove('text-danger');
  feedback.classList.remove('text-warning');
  feedback.classList.remove('text-success');
  input.classList.remove('is-invalid');

  input.disabled = false;
  button.disabled = false;
};

const handleError = (errorMessage, elements, i18next) => {
  const { feedback } = elements;
  feedback.textContent = i18next.t(`errors.${errorMessage}`);
};

const handleForm = (status, elements, i18next) => {
  const {
    input, feedback, form, button,
  } = elements;
  clear(elements);
  switch (status) {
    case 'loading': {
      feedback.classList.add('text-warning');
      feedback.textContent = i18next.t(`status.${status}`);
      input.disabled = true;
      button.disabled = true;
      break;
    }
    case 'success': {
      feedback.classList.add('text-success');
      feedback.textContent = i18next.t(`status.${status}`);
      form.reset();
      input.focus();
      break;
    }
    case 'failed': {
      feedback.classList.add('text-danger');
      input.classList.add('is-invalid');
      break;
    }
    default:
      console.log('Unknown status');
  }
};

const renderVisitedPosts = (idVisitedPosts) => {
  idVisitedPosts.forEach((id) => {
    const link = document.querySelector(`a[data-id="${id}"]`);
    link.classList.remove('fw-bold');
    link.classList.add('fw-normal', 'link-secondary');
  });
};

const watch = (state, elements, i18nextInstance) => onChange(state, (path, value) => {
  switch (path) {
    case 'form.status': {
      handleForm(value, elements, i18nextInstance);
      break;
    }
    case 'form.error': {
      handleError(value, elements, i18nextInstance);
      break;
    }
    case 'posts': {
      renderPosts(state, value, elements, i18nextInstance);
      break;
    }
    case 'feeds': {
      renderFeeds(value, elements, i18nextInstance);
      break;
    }
    case 'idVisitedPosts': {
      renderVisitedPosts(value);
      break;
    }
    case 'idCurrentPost': {
      renderModal(state, value);
      break;
    }
    default:
      console.log('unknown state');
  }
});

export default watch;
