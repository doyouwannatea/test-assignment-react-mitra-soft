import { call, cancel, delay, put, select } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import {
  Comment,
  JsonPlaceholderApiOptions,
  Post,
} from '@/models/json-placeholder-api';
import jsonPlaceholderApiService from '@/services/json-placeholder-api/JsonPlaceholderApiService';
import {
  setCommentsLoading,
  setError,
  setLoading,
  setPostComments,
  setPostList,
} from '@/store/features/json-placeholder/jsonPlaceholderSlice';
import { RootState } from '@/store/store';
import { WithTotalCount } from '@/models/shared';

export const enum JsonPlaceholderSagaAction {
  GetAllPosts = 'GetAllPosts',
  GetPostComments = 'GetPostComments',
}
export const getAllPosts = createAction(
  JsonPlaceholderSagaAction.GetAllPosts,
  (options?: JsonPlaceholderApiOptions) => ({
    payload: options,
  }),
);
export const getPostComments = createAction(
  JsonPlaceholderSagaAction.GetPostComments,
  (postId: number) => ({
    payload: postId,
  }),
);

export function* getAllPostsWorker(action: ReturnType<typeof getAllPosts>) {
  try {
    yield put(setPostList({ data: undefined, totalCount: 0 }));
    yield put(setLoading(true));
    yield delay(500);
    const postList: WithTotalCount<Post[]> = yield call(() =>
      jsonPlaceholderApiService.getAllPosts(action.payload),
    );
    yield put(setPostList(postList));
  } catch (error) {
    yield put(setError(String(error)));
  } finally {
    yield put(setLoading(false));
  }
}

export function* getPostCommentsWorker(
  action: ReturnType<typeof getPostComments>,
) {
  const postId = action.payload;
  try {
    const state: RootState = yield select();
    if (state.jsonPlaceholderReducer.loadingComments.includes(postId)) {
      yield cancel();
    }
  } catch (error) {
    return;
  }

  try {
    yield put(setCommentsLoading({ postId, value: true }));
    yield delay(500);
    const commentList: Comment[] = yield call(() =>
      jsonPlaceholderApiService.getPostComments(postId),
    );
    yield put(setPostComments({ commentList, postId }));
  } catch (error) {
    yield put(setError(String(error)));
  } finally {
    yield put(setCommentsLoading({ postId, value: false }));
  }
}
