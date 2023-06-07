import {
  Comment,
  JsonPlaceholderApiOptions,
  Post,
} from '@/models/json-placeholder-api';
import { httpClient } from '../httpClient';
import { JsonPlaceholderApiSearchParams } from './JsonPlaceholderApiSearchParams';
import { WithTotalCount } from '@/models/shared';

export class JsonPlaceholderApiService {
  async getAllPosts(
    options: JsonPlaceholderApiOptions = {},
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

  async getPostComments(postId: number): Promise<Comment[]> {
    const responce = await httpClient.get<Comment[]>(
      `comments?postId=${postId}`,
    );
    return responce.data;
  }
}

export default new JsonPlaceholderApiService();
