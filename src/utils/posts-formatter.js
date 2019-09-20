import { always, applySpec, compose, prop } from 'ramda';

const postsFormatter = compose(
  applySpec({
    id: prop('id'),
    author: prop('author'),
    createdDate: prop('created_utc'),
    thumbnail: prop('thumbnail'),
    title: prop('title'),
    comments: prop('num_comments'),
    unread: always(true),
  }),
  prop('data')
);

export default postsFormatter;
