import { all, call, delay, put } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import { Post, User } from '@/models/json-placeholder-api';
import jsonPlaceholderApiService from '@/services/json-placeholder-api/JsonPlaceholderApiService';
import {
  setError,
  setLoading,
  setPostList,
  setViewedUser,
} from '@/store/features/json-placeholder/jsonPlaceholderSlice';

export const enum UserActionType {
  GetUserData = 'GetUserData',
}

export const getUserData = createAction(
  UserActionType.GetUserData,
  (userId: number) => ({
    payload: userId,
  }),
);

function* fetchUserPosts(userId: number) {
  try {
    const userPosts: Post[] = yield call(
      jsonPlaceholderApiService.getUserPosts,
      userId,
    );
    yield put(setPostList({ data: userPosts, totalCount: userPosts.length }));
  } catch (error) {
    yield put(setError(String(error)));
  }
}

function* fetchUserData(userId: number) {
  try {
    const user: User | undefined = yield call(
      jsonPlaceholderApiService.getUserData,
      userId,
    );
    yield put(setViewedUser(user));
  } catch (error) {
    yield put(setError(String(error)));
  }
}

export function* getUserDataWorker(action: ReturnType<typeof getUserData>) {
  try {
    yield put(setLoading(true));
    yield delay(500);
    yield all([
      call(fetchUserPosts, action.payload),
      call(fetchUserData, action.payload),
    ]);
  } finally {
    yield put(setLoading(false));
  }
}
