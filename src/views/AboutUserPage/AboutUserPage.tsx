import { useDispatchOnMount } from '@/hooks/useDispatchOnMount';
import { useAboutUserPageParams } from './useAboutUserPageParams';
import { useAppSelector } from '@/store/store';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { generatePostListPath } from '@/router/routeList';
import UserCard from '@/components/UserCard';
import ErrorStub from '@/components/ErrorStub';
import UserPostList from '@/components/UserPostList';
import { getUserData } from '@/store/features/json-placeholder/sagas/user';

function AboutUserPage() {
  const { userId } = useAboutUserPageParams();
  const { viewedUser, loading, error } = useAppSelector(
    ({ jsonPlaceholderReducer }) => jsonPlaceholderReducer,
  );
  useDispatchOnMount(getUserData(Number(userId)));

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
        <UserPostList />
      </section>
    </section>
  );
}

export default AboutUserPage;
