import {
  likePost,
  dislikePost,
} from '@/store/features/json-placeholder/jsonPlaceholderSlice';
import { useAppSelector } from '@/store/store';
import { useDispatch } from 'react-redux';
import PostList from '../PostList';
import { getPostComments } from '@/store/features/json-placeholder/sagas/posts';

function UserPostList() {
  const dispatch = useDispatch();
  const {
    commentMap,
    allPosts: { data: postList },
    likedPosts,
    loadingComments,
  } = useAppSelector(({ jsonPlaceholderReducer }) => jsonPlaceholderReducer);

  function onOpenPostCommentList(postId: number) {
    dispatch(getPostComments(postId));
  }

  function onMarkPost(isMarked: boolean, postId: number) {
    if (isMarked) dispatch(likePost(postId));
    else dispatch(dislikePost(postId));
  }

  return (
    <PostList
      openPostCommentList={onOpenPostCommentList}
      commentMap={commentMap}
      loadingComments={loadingComments}
      postList={postList || []}
      markList={likedPosts}
      onMark={onMarkPost}
    />
  );
}

export default UserPostList;
