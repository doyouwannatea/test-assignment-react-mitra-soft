import { takeEvery, takeLatest } from 'redux-saga/effects';
import {
  PostsActionType,
  getAllPostsWorker,
  saveLikedPostsWorker,
  getPostCommentsWorker,
} from './posts';
import { UserActionType, getUserDataWorker } from './user';
import { dislikePost, likePost } from '../jsonPlaceholderSlice';

export function* getAllPostsWatcher() {
  yield takeLatest(PostsActionType.GetAllPosts, getAllPostsWorker);
}

export function* getPostCommentsWatcher() {
  yield takeEvery(PostsActionType.GetPostComments, getPostCommentsWorker);
}

export function* saveLikedPostsWatcher() {
  yield takeLatest(likePost.type, saveLikedPostsWorker);
  yield takeLatest(dislikePost.type, saveLikedPostsWorker);
}

export function* getUserDataWatcher() {
  yield takeLatest(UserActionType.GetUserData, getUserDataWorker);
}
