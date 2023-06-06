import { Link, Outlet } from 'react-router-dom';
import {
  generateAboutMePath,
  generateAboutUserPath,
  generatePostListPath,
} from '@router/routeList';

function App() {
  return (
    <>
      <header>
        <nav>
          <Link to={generatePostListPath()}>Post list</Link>
          <Link to={generateAboutMePath()}>About me</Link>
          <Link to={generateAboutUserPath('1')}>About user 1</Link>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default App;
