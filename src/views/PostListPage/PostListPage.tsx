import { useEffect } from 'react';
import { getTodo } from '@/store/sagas/json-placeholder/saga-actions';
import { useAppDispatch, useAppSelector } from '@/store/store';

function useGetTodo() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);
}

function PostListPage() {
  useGetTodo();
  const todo = useAppSelector(
    ({ jsonPlaceholderReducer }) => jsonPlaceholderReducer.todo,
  );

  return <section>{todo?.title}</section>;
}

export default PostListPage;
