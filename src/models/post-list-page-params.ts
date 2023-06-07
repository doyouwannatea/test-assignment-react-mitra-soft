import { PostSortVariant } from './json-placeholder-api';

export type PostListPageParams = {
  page: number;
  sort: PostSortVariant;
  title: string;
};

export const defaultPostListPageParams: PostListPageParams = {
  page: 1,
  sort: 'title',
  title: '',
};
