import { useParams } from 'react-router-dom';

export function useParamsUserId(): string | undefined {
  const params = useParams();
  return params.userId;
}
