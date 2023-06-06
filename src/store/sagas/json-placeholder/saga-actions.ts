import { createAction } from '@reduxjs/toolkit';

export const enum JsonPlaceholderSagaAction {
  GetTodo = 'GetTodo',
}

export const getTodo = createAction(JsonPlaceholderSagaAction.GetTodo);
