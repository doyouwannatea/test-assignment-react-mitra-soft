import { useParamsUserId } from './useParamsUserId';

function AboutUserPage() {
  const userId = useParamsUserId();
  return <section>AboutUser {userId}</section>;
}

export default AboutUserPage;
