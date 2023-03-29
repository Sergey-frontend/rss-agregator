import axios from 'axios';
import { getProxiedUrl } from './app.js';
import parser from './parser.js';
import build from './build.js';

export default (urls) => {
  const proxiedUrls = urls.map(getProxiedUrl);
  const requires = proxiedUrls.map((link) => axios.get(link));
  const actualPosts = Promise.all(requires)
    .then((responses) => {
      const dates = responses.map((response) => {
        const parsedData = parser(response.data.contents);
        const info = build(parsedData);
        return info.items;
      });
      return dates;
    })
    .then((posts) => posts.flat());
  return actualPosts;
};
