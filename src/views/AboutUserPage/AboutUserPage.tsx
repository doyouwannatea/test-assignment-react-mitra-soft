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
import UserCard from '@/components/UserCard';
import ErrorStub from '@/components/ErrorStub';

function AboutUserPage() {
  const dispatch = useDispatch();
  const { userId } = useAboutUserPageParams();
  const {
    commentMap,
    viewedUser,
    allPosts: { data: postList },
    loading,
    loadingComments,
    error,
  } = useAppSelector(({ jsonPlaceholderReducer }) => jsonPlaceholderReducer);
  useDispatchOnMount(getUserData(Number(userId)));

  function onOpenPostCommentList(postId: number) {
    dispatch(getPostComments(postId));
  }

  if (loading) return <Spinner />;
  if (error) return <ErrorStub error={error} />;
  if (!viewedUser) return <p>Пользователь не найден</p>;

  return (
    <section>
      <Link className='mt-3 d-block' to={generatePostListPath()}>
        &larr; К списку постов
      </Link>
      <section>
        <h2 className='mt-4'>Пользователь</h2>
        <UserCard user={viewedUser} />
      </section>
      <section>
        <h2 className='mt-4'>Посты пользователя</h2>
        <PostList
          openPostCommentList={onOpenPostCommentList}
          commentMap={commentMap}
          loadingComments={loadingComments}
          postList={postList || []}
        />
      </section>
    </section>
  );
}

export default AboutUserPage;
