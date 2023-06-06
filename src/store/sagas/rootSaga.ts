import { takeLeading } from 'redux-saga/effects';
import { JsonPlaceholderSagaAction } from './json-placeholder/saga-actions';
import { getTodoWorker } from './json-placeholder/sagas';

function* rootSaga() {
  yield takeLeading(JsonPlaceholderSagaAction.GetTodo, getTodoWorker);
}

export default rootSaga;
