import { Button, Form, InputGroup, Pagination, Spinner } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useDispatchOnMount } from '@/hooks/useDispatchOnMount';
import {
  getAllPosts,
  getPostComments,
} from '@/store/features/json-placeholder/sagas';
import PostList from '@/components/PostList';
import {
  PostSortVariant,
  PostSortVariantsText,
  postSortVariants,
} from '@/models/json-placeholder-api';
import { usePostListPageParams } from './usePostListPageParams';
import { usePagination } from '@/hooks/usePagination';
import ErrorStub from '@/components/ErrorStub';

function PostListPage() {
  const PAGINATION_LIMIT = 7;
  const dispatch = useAppDispatch();

  const {
    commentMap,
    loadingComments,
    allPosts: { data: allPosts, totalCount: totalPosts },
    loading,
    error,
  } = useAppSelector(({ jsonPlaceholderReducer }) => jsonPlaceholderReducer);

  const { changeParams, params } = usePostListPageParams();
  useDispatchOnMount(
    getAllPosts({
      pagination: { limit: PAGINATION_LIMIT, page: params.page },
      sort: { order: 'asc', sortBy: params.sort },
      filter: [{ option: 'title', value: params.title }],
    }),
  );
  const { next, prev, jump, maxPage } = usePagination(
    params.page,
    totalPosts,
    PAGINATION_LIMIT,
    onPageChange,
  );

  function generatePagination(): React.ReactElement[] {
    return Array.from(new Array(maxPage)).map((_, index) => {
      const page = index + 1;
      return (
        <Pagination.Item
          key={page}
          active={page === params.page}
          onClick={() => jump(page)}
        >
          {page}
        </Pagination.Item>
      );
    });
  }

  function openPostCommentList(postId: number) {
    dispatch(getPostComments(postId));
  }

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
      ) : (
        <>
          <PostList
            postList={allPosts || []}
            commentMap={commentMap}
            loadingComments={loadingComments}
            openPostCommentList={(postId) => openPostCommentList(postId)}
          />
          <Pagination>
            <Pagination.Prev onClick={prev} />
            {generatePagination()}
            <Pagination.Next onClick={next} />
          </Pagination>
        </>
      )}
    </section>
  );
}

export default PostListPage;
