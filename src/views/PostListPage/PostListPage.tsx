import { Button, Form, InputGroup, Pagination, Spinner } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useDispatchOnMount } from '@/hooks/useDispatchOnMount';
import {
  getAllPosts,
  getPostComments,
} from '@/store/features/json-placeholder/sagas';
import PostList from '@/components/PostList';
import { useState } from 'react';

// https://dev.to/admantium/react-creating-a-custom-hook-for-pagination-jni
export function usePagination<T>(list: T[], itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(list.length / itemsPerPage);

  function currentData() {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return list.slice(begin, end);
  }

  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function jump(page: number) {
    const pageNumber = Math.max(1, page);
    setCurrentPage(Math.min(pageNumber, maxPage));
  }

  return { next, prev, jump, currentData, currentPage, maxPage };
}

function PostListPage() {
  useDispatchOnMount(getAllPosts());
  const dispatch = useAppDispatch();
  const allPosts = useAppSelector(
    ({ jsonPlaceholderReducer }) => jsonPlaceholderReducer.allPosts || [],
  );
  const {
    currentData: getPaginatedPostList,
    next,
    prev,
    jump,
    currentPage,
    maxPage,
  } = usePagination(allPosts, 7);
  const commentMap = useAppSelector(
    ({ jsonPlaceholderReducer }) => jsonPlaceholderReducer.commentMap,
  );
  const isLoading = useAppSelector(
    ({ jsonPlaceholderReducer }) => jsonPlaceholderReducer.loading,
  );
  const loadingComments = useAppSelector(
    ({ jsonPlaceholderReducer }) => jsonPlaceholderReducer.loadingComments,
  );

  function generatePagination(): React.ReactElement[] {
    return Array.from(new Array(maxPage)).map((_, index) => {
      const page = index + 1;
      return (
        <Pagination.Item
          key={page}
          active={page === currentPage}
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

  // TODO: поиск по заголовку
  // TODO: сортировка по заголовку
  // TODO: пагинация +

  if (isLoading && !allPosts) return <Spinner />;

  return (
    <section>
      <InputGroup className='mb-3'>
        <Form.Control placeholder='Введите заголовок статьи' />
        <Button variant='outline-secondary'>X</Button>
      </InputGroup>
      <PostList
        postList={getPaginatedPostList()}
        commentMap={commentMap}
        loadingComments={loadingComments}
        openPostCommentList={(postId) => openPostCommentList(postId)}
      />
      <Pagination>
        <Pagination.Prev onClick={prev} />
        {generatePagination()}
        <Pagination.Next onClick={next} />
      </Pagination>
    </section>
  );
}

export default PostListPage;
