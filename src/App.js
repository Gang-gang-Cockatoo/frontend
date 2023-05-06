import { Outlet } from 'react-router';
import { NavBar } from './components';

function App() {
  return (
    <div className="">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
