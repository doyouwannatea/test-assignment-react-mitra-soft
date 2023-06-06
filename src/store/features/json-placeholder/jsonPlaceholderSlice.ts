import { Todo } from '@/models/json-placeholder-api';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface State {
  todo?: Todo;
}

const initialState: State = {
  todo: undefined,
};

const sliceName = 'json-placeholder';
export const jsonPlaceholderSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setTodo: (state, action: PayloadAction<Todo>) => {
      state.todo = action.payload;
    },
  },
});

export const { setTodo } = jsonPlaceholderSlice.actions;

export default jsonPlaceholderSlice.reducer;
