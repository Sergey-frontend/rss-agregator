import * as yup from 'yup';
import i18next from 'i18next';
import axios from 'axios';
import watch from './view.js';
import ru from './locales/ru.js';
import parser from './parser.js';
import renderPosts from './renderPosts.js';

const app = async () => {
  const i18nextInstance = i18next.createInstance();
  await i18nextInstance.init({
    lng: 'ru',
    debug: false,
    resources: {
      ru,
    },
  });
  const getProxiedUrl = (url) => `https://allorigins.hexlet.app/get?disableCache=true&url=${url}`;

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

  const watchedState = watch(state, elements, i18nextInstance);

  const validateUrl = (url, urls) => yup
    .string()
    .url('invalidUrl')
    .notOneOf(urls, 'alreadyLoaded')
    .required('required')
    .validate(url);

  elements.form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const currentUrl = formData.get('url');
    validateUrl(currentUrl, watchedState.urls)
      .then((link) => {
        watchedState.form.status = 'loading';
        watchedState.urls.push(link);
        return link;
      })
      .then((url) => {
        axios.get(getProxiedUrl(url))
          .then((response) => parser(response.data.contents))
          .then((data) => console.log(renderPosts(data)))
          .then(() => watchedState.form.status = 'success');
      })
      .catch((err) => {
        watchedState.form.status = 'failed';
        watchedState.form.error = err.message;
      });
  });
};

export default app;
