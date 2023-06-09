import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import { useMemo } from 'react';
import { useAppSelector } from '@/store/store';
import { useDispatchOnMount } from '@/hooks/useDispatchOnMount';
import { getAllPosts } from '@/store/features/json-placeholder/sagas/posts';
import {
  PostSortVariant,
  PostSortVariantsText,
  postSortVariants,
} from '@/models/json-placeholder-api';
import { usePostListPageParams } from './usePostListPageParams';
import ErrorStub from '@/components/ErrorStub';
import useMediaQuery from '@/hooks/useMediaQuery';
import BasePagination from '@/components/BasePagination';
import UserPostList from '@/components/UserPostList';

function PostListPage() {
  const ITEMS_PER_PAGE = 7;
  const DESKTOP_PAGINATION_NEIGHBOURS = 10;
  const MOBILE_PAGINATION_NEIGHBOURS = 1;

  const isSmallDevice = useMediaQuery('(max-width: 768px)');
  const pageNeighbours = useMemo(
    () =>
      isSmallDevice
        ? MOBILE_PAGINATION_NEIGHBOURS
        : DESKTOP_PAGINATION_NEIGHBOURS,
    [isSmallDevice],
  );

  const {
    allPosts: { data: allPosts, totalCount: totalPosts },
    loading,
    error,
  } = useAppSelector(({ jsonPlaceholderReducer }) => jsonPlaceholderReducer);

  const { changeParams, params } = usePostListPageParams();
  useDispatchOnMount(
    getAllPosts({
      pagination: { limit: ITEMS_PER_PAGE, page: params.page },
      sort: { order: 'asc', sortBy: params.sort },
      filter: [{ option: 'title', value: params.title }],
    }),
  );

  function onPageChange(page: number) {
    changeParams({ page });
  }

  function onTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    changeParams({ page: 1, title: event.target.value });
  }

  function onClearInput() {
    changeParams({ page: 1, title: '' });
  }

  function onSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const sort = event.target.value as PostSortVariant;
    changeParams({ page: 1, sort });
  }

  if (error) return <ErrorStub error={error} />;

  return (
    <section>
      <InputGroup className='mb-1'>
        <Form.Control
          placeholder='Введите заголовок статьи'
          value={params.title}
          onInput={onTitleChange}
        />
        <Button variant='outline-secondary' onClick={onClearInput}>
          X
        </Button>
      </InputGroup>
      <Form.Select className='mb-3' onChange={onSortChange} value={params.sort}>
        {postSortVariants.map((sortVariant) => (
          <option key={sortVariant} value={sortVariant}>
            {PostSortVariantsText[sortVariant]}
          </option>
        ))}
      </Form.Select>

      {loading ? (
        <Spinner />
      ) : allPosts?.length === 0 ? (
        'Посты не найдены'
      ) : (
        <>
          <UserPostList />
          <BasePagination
            currentPage={params.page}
            itemsPerPage={ITEMS_PER_PAGE}
            maxItems={totalPosts}
            pageNeighbours={pageNeighbours}
            onPageChange={onPageChange}
          />
        </>
      )}
    </section>
  );
}

export default PostListPage;
