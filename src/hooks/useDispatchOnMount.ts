import { useEffect } from 'react';
import { AnyAction } from '@reduxjs/toolkit';
import { useAppDispatch } from '@/store/store';

export function useDispatchOnMount(action: AnyAction) {
  const dispatch = useAppDispatch();
  const jsonAction = JSON.stringify(action);
  useEffect(() => {
    dispatch(action);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, jsonAction]);
}
