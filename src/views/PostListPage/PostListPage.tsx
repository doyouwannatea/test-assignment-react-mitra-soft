import { Spinner } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useDispatchOnMount } from '@/hooks/useDispatchOnMount';
import {
  getAllPosts,
  getPostComments,
} from '@/store/features/json-placeholder/sagas';
import PostList from '@/components/PostList';

function PostListPage() {
  useDispatchOnMount(getAllPosts());
  const dispatch = useAppDispatch();
  const commentMap = useAppSelector(
    ({ jsonPlaceholderReducer }) => jsonPlaceholderReducer.commentMap,
  );
  const allPosts = useAppSelector(
    ({ jsonPlaceholderReducer }) => jsonPlaceholderReducer.allPosts,
  );
  const isLoading = useAppSelector(
    ({ jsonPlaceholderReducer }) => jsonPlaceholderReducer.loading,
  );
  const loadingComments = useAppSelector(
    ({ jsonPlaceholderReducer }) => jsonPlaceholderReducer.loadingComments,
  );

  function openPostCommentList(postId: number) {
    dispatch(getPostComments(postId));
  }

  if (isLoading && !allPosts) return <Spinner />;

  return (
    <section>
      <PostList
        postList={allPosts || []}
        commentMap={commentMap}
        loadingComments={loadingComments}
        openPostCommentList={(postId) => openPostCommentList(postId)}
      />
    </section>
  );
}

export default PostListPage;
