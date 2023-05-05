import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    (async () => {
      await axios
        .get(process.env.REACT_APP_API)
        .then(({ data }) => setApiData(data));
    })();
  }, []);

  return <div className="bg-red-500">{apiData ? apiData.status : 'Hello'}</div>;
}

export default App;
