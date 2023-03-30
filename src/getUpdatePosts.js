import axios from 'axios';
import _ from 'lodash';
import parser from './parser.js';
import build from './build.js';

const getUpdatePosts = (proxifiedUrls, statePosts) => {

  console.log(`statePosts ${statePosts}`)

  const get = proxifiedUrls.map((link) => axios.get(link)
    .then((response) => {
      const parsedData = parser(response.data.contents);
      const data = build(parsedData);
      const newPosts = data.items;
      // console.log(newPosts)
      return newPosts;
    })
  )

  Promise.all(get)
    .finally(() => setTimeout(() => getUpdatePosts(proxifiedUrls), 2000));
};

export default getUpdatePosts;
