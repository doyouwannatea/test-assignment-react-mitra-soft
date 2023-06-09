import {
  Comment,
  JsonPlaceholderApiOptions,
  Post,
  User,
} from '@/models/json-placeholder-api';
import { httpClient } from '../httpClient';
import { JsonPlaceholderApiSearchParams } from './JsonPlaceholderApiSearchParams';
import { WithTotalCount } from '@/models/shared';

const LIKED_POSTS_KEY = 'LIKED_POSTS';

export class JsonPlaceholderApiService {
  async getAllPosts(
    options: JsonPlaceholderApiOptions<Post> = {},
  ): Promise<WithTotalCount<Post[]>> {
    const searchParams = new JsonPlaceholderApiSearchParams(options);
    const responce = await httpClient.get<Post[]>(`posts?${searchParams}`);
    const totalCount =
      Number(responce.headers['x-total-count']) || responce.data.length;
    return {
      data: responce.data,
      totalCount: totalCount,
    };
  }

  async getUserPosts(userId: number): Promise<Post[]> {
    const responce = await httpClient.get<Post[]>(`posts?userId=${userId}`);
    return responce.data;
  }

  async getUserData(userId: number): Promise<User | undefined> {
    const responce = await httpClient.get<User[]>(`users?id=${userId}`);
    return responce.data[0];
  }

  async getPostComments(postId: number): Promise<Comment[]> {
    const responce = await httpClient.get<Comment[]>(
      `comments?postId=${postId}`,
    );
    return responce.data;
  }

  async setLikedPosts(likedPosts: number[]): Promise<void> {
    localStorage.setItem(LIKED_POSTS_KEY, JSON.stringify(likedPosts));
  }

  async getLikedPosts(): Promise<number[]> {
    const string = localStorage.getItem(LIKED_POSTS_KEY);
    if (!string) return [];
    return JSON.parse(string);
  }
}

export default new JsonPlaceholderApiService();
