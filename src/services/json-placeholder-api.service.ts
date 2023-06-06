import { Todo } from '@/models/json-placeholder-api';
import { httpClient } from './httpClient';

export class JsonPlaceholderApiService {
  async getTodo(): Promise<Todo> {
    const responce = await httpClient.get<Todo>('todos/1');
    return responce.data;
  }
}

export default new JsonPlaceholderApiService();
