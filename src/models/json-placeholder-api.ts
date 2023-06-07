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

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoLocation;
}

export interface GeoLocation {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
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
  body: 'Сортировать по телу поста',
  title: 'Сортировать по заголовку поста',
};
