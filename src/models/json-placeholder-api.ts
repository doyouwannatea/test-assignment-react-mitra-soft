export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface JsonPlaceholderApiOptions {
  pagination?: {
    page: number;
    limit: number;
  };
  sort?: {
    sortBy: string;
    order: 'asc' | 'desc';
  };
  filter?: {
    option: string;
    value: string;
  }[];
}

export type PostSortVariant = keyof Pick<Post, 'title' | 'body'>;

export const postSortVariants: PostSortVariant[] = ['title', 'body'];

export const PostSortVariantsText: Record<PostSortVariant, string> = {
  body: 'Тело поста',
  title: 'Заголовок поста',
};
