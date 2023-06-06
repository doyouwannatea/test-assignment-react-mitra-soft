import { RouteObject, generatePath } from 'react-router-dom';
import App from '@/App';
import PostListPage from '@/views/PostListPage';
import AboutMePage from '@/views/AboutMePage';
import AboutUserPage from '@/views/AboutUserPage';

export const enum RoutePath {
  Home = '/',
  PostList = '/',
  AboutMe = 'about',
  AboutUser = 'about/:userId',
}

export const generateHomePath = () => generatePath(RoutePath.Home);
export const generatePostListPath = () => generatePath(RoutePath.PostList);
export const generateAboutMePath = () => generatePath(RoutePath.AboutMe);
export const generateAboutUserPath = (userId: string | null) =>
  generatePath(RoutePath.AboutUser, { userId });

export const routeList: RouteObject[] = [
  {
    path: RoutePath.Home,
    element: <App />,
    children: [
      {
        path: RoutePath.Home,
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
    ],
  },
];
