import { Outlet } from 'react-router-dom';
import BasePageLayout from './components/BasePageLayout';

function App() {
  return (
    <BasePageLayout>
      <Outlet />
    </BasePageLayout>
  );
}

export default App;
