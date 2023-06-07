import { takeEvery, takeLeading } from 'redux-saga/effects';
import {
  JsonPlaceholderSagaAction,
  getAllPostsWorker,
  getPostCommentsWorker,
} from '../features/json-placeholder/sagas';

function* rootSaga() {
  yield takeLeading(JsonPlaceholderSagaAction.GetAllPosts, getAllPostsWorker);
  yield takeEvery(
    JsonPlaceholderSagaAction.GetPostComments,
    getPostCommentsWorker,
  );
}

export default rootSaga;
