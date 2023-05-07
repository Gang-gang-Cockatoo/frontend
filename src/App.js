import { Outlet } from 'react-router';
import { NavBar, Page } from './components';

function App() {
  return (
    <Page>
      <NavBar />
      <Outlet />
    </Page>
  );
}

export default App;
