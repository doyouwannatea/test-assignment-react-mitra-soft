import { Todo } from '@/models/json-placeholder-api';
import jsonPlaceholderApiService from '@/services/json-placeholder-api.service';
import { setTodo } from '@/store/features/json-placeholder/jsonPlaceholderSlice';
import { call, put } from 'redux-saga/effects';

export function* getTodoWorker() {
  try {
    const todo: Todo = yield call(() => jsonPlaceholderApiService.getTodo());
    yield put(setTodo(todo));
  } catch (error) {
    console.log(error);
  }
}
