import axios from 'axios';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router';

function App() {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    (async () => {
      await axios
        .get(process.env.REACT_APP_API)
        .then(({ data }) => setApiData(data));
    })();
  }, []);

  return (
    <div className="">
      Status:{apiData ? apiData.status : 'Hello'}
      <Outlet />
    </div>
  );
}

export default App;
