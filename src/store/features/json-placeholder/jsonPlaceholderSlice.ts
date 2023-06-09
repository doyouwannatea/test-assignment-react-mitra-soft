import { Post, Comment, User } from '@/models/json-placeholder-api';
import { WithTotalCount } from '@/models/shared';
import { findAndDelete } from '@/utils/shared';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface State {
  allPosts: WithTotalCount<Post[] | undefined>;
  commentMap: Record<number, Comment[]>;
  likedPosts: number[];
  viewedUser?: User;
  loadingComments: number[];
  loading: boolean;
  error: string;
}

const initialState: State = {
  allPosts: { data: undefined, totalCount: 0 },
  commentMap: {},
  likedPosts: [],
  viewedUser: undefined,
  loadingComments: [],
  loading: false,
  error: '',
};

export const jsonPlaceholderSlice = createSlice({
  name: 'json-placeholder',
  initialState,
  reducers: {
    setPostList: (
      state,
      action: PayloadAction<WithTotalCount<Post[] | undefined>>,
    ) => {
      state.allPosts = action.payload;
    },
    setPostComments: (
      state,
      action: PayloadAction<{ postId: number; commentList: Comment[] }>,
    ) => {
      const { postId, commentList } = action.payload;
      state.commentMap[postId] = commentList;
    },
    setViewedUser: (state, action: PayloadAction<User | undefined>) => {
      state.viewedUser = action.payload;
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
      state.loadingComments = findAndDelete(
        state.loadingComments,
        (post) => post === postId,
      );
    },
    likePost: (state, action: PayloadAction<number>) => {
      state.likedPosts.push(action.payload);
    },
    dislikePost: (state, action: PayloadAction<number>) => {
      state.likedPosts = findAndDelete(
        state.likedPosts,
        (post) => post === action.payload,
      );
    },
    setLikedPosts: (state, action: PayloadAction<number[]>) => {
      state.likedPosts = action.payload;
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
  setViewedUser,
  dislikePost,
  likePost,
  setLikedPosts,
} = jsonPlaceholderSlice.actions;

export default jsonPlaceholderSlice.reducer;
