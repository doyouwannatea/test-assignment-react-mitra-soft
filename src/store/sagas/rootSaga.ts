import { takeEvery, takeLatest } from 'redux-saga/effects';
import {
  JsonPlaceholderSagaAction,
  getAllPostsWorker,
  getPostCommentsWorker,
  getUserDataWorker,
} from '../features/json-placeholder/sagas';

function* rootSaga() {
  yield takeLatest(JsonPlaceholderSagaAction.GetAllPosts, getAllPostsWorker);
  yield takeLatest(JsonPlaceholderSagaAction.GetUserData, getUserDataWorker);
  yield takeEvery(
    JsonPlaceholderSagaAction.GetPostComments,
    getPostCommentsWorker,
  );
}

export default rootSaga;
