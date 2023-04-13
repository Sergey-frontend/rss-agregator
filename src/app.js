import * as yup from 'yup';
import i18next from 'i18next';
import axios from 'axios';
import _ from 'lodash';
import watch from './view.js';
import ru from './locales/ru.js';
import parser from './parser.js';

const DELAY = 5000;

const getProxiedUrl = (url) => {
  const resultUrl = new URL('https://allorigins.hexlet.app/get');
  resultUrl.searchParams.set('url', url);
  resultUrl.searchParams.set('disableCache', true);
  return resultUrl;
};

const getUpdatePosts = (state) => {
  const urls = state.feeds.map((feed) => feed.url);
  const promises = urls.map((url) => axios.get(getProxiedUrl(url))
    .then((response) => {
      const data = parser(response.data.contents);

      const comparator = (arrayValue, otherValue) => arrayValue.title === otherValue.title;
      const addedPosts = _.differenceWith(data.items, state.posts, comparator);

      if (addedPosts.length === 0) {
        return;
      }
      state.posts = addedPosts.concat(...state.posts);
    })
    .catch((err) => {
      console.error(err);
    }));

  Promise.all(promises)
    .finally(() => setTimeout(() => getUpdatePosts(state), DELAY));
};

const validateUrl = (url, urls) => yup
  .string()
  .url('invalidUrl')
  .notOneOf(urls, 'alreadyLoaded')
  .required('required')
  .validate(url);

const app = async () => {
  const i18nextInstance = i18next.createInstance();
  await i18nextInstance.init({
    lng: 'ru',
    debug: false,
    resources: {
      ru,
    },
  });

  const elements = {
    input: document.querySelector('#url-input'),
    feedback: document.querySelector('.feedback'),
    form: document.querySelector('form'),
    button: document.querySelector('button'),
    posts: document.querySelector('.posts'),
    feeds: document.querySelector('.feeds'),
  };

  const state = {
    form: {
      status: 'filling',
      error: null,
    },
    feeds: [],
    posts: [],
    idCurrentpost: null,
    idVisitedPosts: [],
  };

  const watchedState = watch(state, elements, i18nextInstance);

  elements.form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const currentUrl = formData.get('url');
    watchedState.form.status = 'loading';
    const urls = state.feeds.map((feed) => feed.url);
    validateUrl(currentUrl, urls)
      .then((link) => axios.get(getProxiedUrl(link)))
      .then((response) => {
        const data = parser(response.data.contents);
        data.feed.id = _.uniqueId();
        data.feed.url = currentUrl;
        data.items.forEach((item) => {
          item.id = _.uniqueId();
        });
        watchedState.feeds.push(data.feed);
        watchedState.posts.unshift(...data.items);
        watchedState.form.status = 'success';
      })
      .catch((err) => {
        watchedState.form.status = 'failed';
        if (err.name === 'AxiosError') {
          watchedState.form.error = 'network';
          return;
        }
        watchedState.form.error = err.message;
      });
  });

  elements.posts.addEventListener('click', ({ target }) => {
    if (target.dataset.id) {
      const { id } = target.dataset;
      watchedState.idCurrentPost = id;
      if (!watchedState.idVisitedPosts.includes(id)) {
        watchedState.idVisitedPosts.push(id);
      }
    }
    return false;
  });

  getUpdatePosts(watchedState);
};

export default app;
