import { PostSortVariant } from '@/models/json-placeholder-api';
import {
  PostListPageParams,
  defaultPostListPageParams,
} from '@/models/post-list-page-params';
import { generatePostListPath } from '@/router/routeList';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type Params = {
  page: string;
  sort: string;
  title: string;
};

export function usePostListPageParams() {
  const navigate = useNavigate();
  const params = useParams<Params>();
  const [localParams, setLocalParams] = useState<PostListPageParams>(
    defaultPostListPageParams,
  );

  useEffect(() => {
    const { page, sort, title } = defaultPostListPageParams;

    setLocalParams({
      page: Number(params.page) || page,
      sort: (String(params.sort) || sort) as PostSortVariant,
      title: params.title || title,
    });
  }, [params.page, params.sort, params.title]);

  function changeParams(params: Partial<PostListPageParams>) {
    navigate(generatePostListPath({ ...localParams, ...params }));
  }

  return {
    params: localParams,
    changeParams,
  };
}
