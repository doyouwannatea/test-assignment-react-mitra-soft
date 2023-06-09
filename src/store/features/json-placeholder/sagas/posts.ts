import { put, delay, call, cancel, select, all } from 'redux-saga/effects';
import {
  setLoading,
  setError,
  setCommentsLoading,
  setPostComments,
  setPostList,
  setLikedPosts,
} from '../jsonPlaceholderSlice';
import jsonPlaceholderApiService from '@/services/json-placeholder-api/JsonPlaceholderApiService';
import { createAction } from '@reduxjs/toolkit';
import {
  Comment,
  JsonPlaceholderApiOptions,
  Post,
} from '@/models/json-placeholder-api';
import { WithTotalCount } from '@/models/shared';
import { RootState } from '@/store/store';

export const enum PostsActionType {
  GetAllPosts = 'GetAllPosts',
  GetPostComments = 'GetPostComments',
  GetLikedPosts = 'GetLikedPosts',
}

export const getAllPosts = createAction(
  PostsActionType.GetAllPosts,
  (options?: JsonPlaceholderApiOptions<Post>) => ({
    payload: options,
  }),
);
export const getPostComments = createAction(
  PostsActionType.GetPostComments,
  (postId: number) => ({
    payload: postId,
  }),
);

export function* saveLikedPostsWorker() {
  try {
    yield delay(500);
    const store: RootState = yield select();
    yield call(() =>
      jsonPlaceholderApiService.setLikedPosts(
        store.jsonPlaceholderReducer.likedPosts,
      ),
    );
  } catch (error) {
    yield put(setError(String(error)));
  }
}

export function* fetchAllPosts(options?: JsonPlaceholderApiOptions<Post>) {
  try {
    yield put(setPostList({ data: undefined, totalCount: 0 }));
    yield delay(500);
    const postList: WithTotalCount<Post[]> = yield call(() =>
      jsonPlaceholderApiService.getAllPosts(options),
    );
    yield put(setPostList(postList));
  } catch (error) {
    yield put(setError(String(error)));
  }
}

export function* fetchLikedPosts() {
  try {
    yield delay(500);
    const likedPosts: number[] = yield call(() =>
      jsonPlaceholderApiService.getLikedPosts(),
    );
    yield put(setLikedPosts(likedPosts));
  } catch (error) {
    yield put(setError(String(error)));
  }
}

export function* getAllPostsWorker(action: ReturnType<typeof getAllPosts>) {
  try {
    yield put(setLoading(true));
    yield all([call(fetchAllPosts, action.payload), call(fetchLikedPosts)]);
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
