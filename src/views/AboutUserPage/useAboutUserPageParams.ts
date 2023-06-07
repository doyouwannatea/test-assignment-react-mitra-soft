import { useParams } from 'react-router-dom';

type Params = {
  userId?: string;
};

export function useAboutUserPageParams(): Params {
  const params = useParams();
  return {
    userId: params.userId,
  };
}
