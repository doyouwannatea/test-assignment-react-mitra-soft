import { spawn } from 'redux-saga/effects';
import {
  getAllPostsWatcher,
  getPostCommentsWatcher,
  getUserDataWatcher,
  saveLikedPostsWatcher,
} from '../features/json-placeholder/sagas/watchers';

function* rootSaga() {
  try {
    yield spawn(getAllPostsWatcher);
    yield spawn(getPostCommentsWatcher);
    yield spawn(getUserDataWatcher);
    yield spawn(saveLikedPostsWatcher);
  } catch (error) {
    console.log(error);
  }
}

export default rootSaga;
