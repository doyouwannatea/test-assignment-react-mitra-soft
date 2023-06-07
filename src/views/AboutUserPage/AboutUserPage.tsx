import { useDispatchOnMount } from '@/hooks/useDispatchOnMount';
import { useAboutUserPageParams } from './useAboutUserPageParams';
import {
  getPostComments,
  getUserData,
} from '@/store/features/json-placeholder/sagas';
import { useAppSelector } from '@/store/store';
import { Spinner } from 'react-bootstrap';
import PostList from '@/components/PostList';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { generatePostListPath } from '@/router/routeList';

function AboutUserPage() {
  const dispatch = useDispatch();
  const { userId } = useAboutUserPageParams();
  const {
    loading,
    commentMap,
    viewedUser,
    loadingComments,
    allPosts: { data: postList },
  } = useAppSelector(({ jsonPlaceholderReducer }) => jsonPlaceholderReducer);
  useDispatchOnMount(getUserData(Number(userId)));

  function onOpenPostCommentList(postId: number) {
    dispatch(getPostComments(postId));
  }

  if (loading) return <Spinner />;
  if (!viewedUser) return <p>Пользователь не найден</p>;

  return (
    <section>
      <Link to={generatePostListPath()}>{'<- назад'}</Link>
      <p>{viewedUser.name}</p>
      <p>{viewedUser.email}</p>
      <p>{viewedUser.phone}</p>
      <PostList
        openPostCommentList={onOpenPostCommentList}
        commentMap={commentMap}
        loadingComments={loadingComments}
        postList={postList || []}
      />
    </section>
  );
}

export default AboutUserPage;
