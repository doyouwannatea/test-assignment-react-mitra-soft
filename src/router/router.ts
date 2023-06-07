import { createBrowserRouter } from 'react-router-dom';
import { routeList } from './routeList';

export const router = createBrowserRouter(routeList, {
  basename: '/test-assignment-react-mitra-soft',
});
