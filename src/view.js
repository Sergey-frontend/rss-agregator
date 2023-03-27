import onChange from 'on-change';
import renderPosts from './renderPosts';

const clear = (elements) => {
  const { input, feedback } = elements;
  feedback.classList.remove('text-danger');
  feedback.classList.remove('text-warning');
  feedback.classList.remove('text-success');
  input.classList.remove('is-invalid');
};

const handleError = (errorMessage, elements, i18next) => {
  const { feedback } = elements;
  feedback.textContent = i18next.t(`errors.${errorMessage}`);
};

const handleForm = (status, elements, i18next) => {
  const { input, feedback, form } = elements;
  clear(elements);
  switch (status) {
    case 'loading': {
      feedback.classList.add('text-warning');
      feedback.textContent = i18next.t(`status.${status}`);
      break;
    }
    case 'success': {
      feedback.classList.add('text-success');
      feedback.textContent = i18next.t(`status.${status}`);
      form.reset();
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
      renderPosts(value, elements, i18nextInstance);
      break;
    }
    default:
      console.log('unknown state');
  }
});

export default watch;
