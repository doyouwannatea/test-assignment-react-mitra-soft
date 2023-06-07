import { Comment, Post } from '@/models/json-placeholder-api';
import { httpClient } from './httpClient';

export class JsonPlaceholderApiService {
  async getAllPosts(): Promise<Post[]> {
    const responce = await httpClient.get<Post[]>('posts');
    return responce.data;
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
