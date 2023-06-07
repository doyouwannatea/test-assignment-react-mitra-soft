import { Navigate, RouteObject, generatePath } from 'react-router-dom';
import App from '@/App';
import PostListPage from '@/views/PostListPage';
import AboutMePage from '@/views/AboutMePage';
import AboutUserPage from '@/views/AboutUserPage';
import {
  PostListPageParams,
  defaultPostListPageParams,
} from '@/models/post-list-page-params';

export const enum RoutePath {
  PostList = '/all-posts/:page/:sort/:title?',
  AboutMe = '/about',
  AboutUser = '/about/:userId',
}

export const generatePostListPath = ({
  page,
  sort,
  title,
}: PostListPageParams = defaultPostListPageParams) =>
  generatePath(RoutePath.PostList, { page: String(page), sort, title });
export const generateAboutMePath = () => generatePath(RoutePath.AboutMe);
export const generateAboutUserPath = (userId: string | null) =>
  generatePath(RoutePath.AboutUser, { userId });

export const routeList: RouteObject[] = [
  {
    element: <App />,
    children: [
      {
        path: RoutePath.PostList,
        index: true,
        element: <PostListPage />,
      },
      {
        path: RoutePath.AboutMe,
        element: <AboutMePage />,
      },
      {
        path: RoutePath.AboutUser,
        element: <AboutUserPage />,
      },
      {
        path: '*',
        element: <Navigate to={generatePostListPath()} />,
      },
    ],
  },
];
