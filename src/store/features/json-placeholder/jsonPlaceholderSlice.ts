import { Post, Comment } from '@/models/json-placeholder-api';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface State {
  allPosts?: Post[];
  commentMap: Record<number, Comment[]>;
  loadingComments: number[];
  loading: boolean;
  error: string;
}

const initialState: State = {
  allPosts: undefined,
  commentMap: {},
  loadingComments: [],
  loading: false,
  error: '',
};

const sliceName = 'json-placeholder';
export const jsonPlaceholderSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setPostList: (state, action: PayloadAction<Post[]>) => {
      state.allPosts = action.payload;
    },
    setPostComments: (
      state,
      action: PayloadAction<{ postId: number; commentList: Comment[] }>,
    ) => {
      const { postId, commentList } = action.payload;
      state.commentMap[postId] = commentList;
    },
    setCommentsLoading: (
      state,
      action: PayloadAction<{ postId: number; value: boolean }>,
    ) => {
      const { postId, value } = action.payload;
      // true: добавляем загрузку
      if (value) {
        state.loadingComments.push(postId);
        return;
      }
      // false: убираем загрузку
      const index = state.loadingComments.findIndex((post) => post === postId);
      state.loadingComments = [
        ...state.loadingComments.slice(0, index),
        ...state.loadingComments.slice(index + 1),
      ];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setError,
  setPostList,
  setLoading,
  setPostComments,
  setCommentsLoading,
} = jsonPlaceholderSlice.actions;

export default jsonPlaceholderSlice.reducer;
