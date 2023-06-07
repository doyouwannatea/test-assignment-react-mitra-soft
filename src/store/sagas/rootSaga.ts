import { takeEvery, takeLatest } from 'redux-saga/effects';
import {
  JsonPlaceholderSagaAction,
  getAllPostsWorker,
  getPostCommentsWorker,
} from '../features/json-placeholder/sagas';

function* rootSaga() {
  yield takeLatest(JsonPlaceholderSagaAction.GetAllPosts, getAllPostsWorker);
  yield takeEvery(
    JsonPlaceholderSagaAction.GetPostComments,
    getPostCommentsWorker,
  );
}

export default rootSaga;
