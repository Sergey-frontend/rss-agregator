import * as yup from 'yup';
import watch from './view';
import i18next from 'i18next';

const elements = {
  input: document.querySelector('#url-input'),
  feedback: document.querySelector('.feedback'),
  form: document.querySelector('form'),
  button: document.querySelector('button'),
};

const state = {
  form: {
    status: 'filling',
    error: null,
  },
  urls: [],
};

const watchedState = watch(state, elements);

const validateUrl = (url, urls) => yup
  .string()
  .url(i18next.t('errors.invalidUrl'))
  .notOneOf(urls, i18next.t('errors.alreadyLoaded'))
  .required()
  .validate(url);

const app = () => {
  elements.form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const currentUrl = formData.get('url');
    validateUrl(currentUrl, watchedState.urls)
      .then((link) => {
        watchedState.form.status = 'loading';
        setTimeout(() => {
          watchedState.form.status = 'success';
          watchedState.urls.push(link);
          console.log(watchedState.urls);
        }, 2000);
        return link;
      })
      .catch((err) => {
        watchedState.form.status = 'failed';
        watchedState.form.error = err.message;
      });
  });
};

export default app;
