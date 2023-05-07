import { useEffect, useState } from 'react';
import axios from 'axios';

import './styles.css';
import { UserProfile } from '../../components';

const GET_USERS = `${process.env.REACT_APP_API}/users`;

export default function UserList() {
  const token = localStorage.getItem('token');

  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      await axios
        .get(GET_USERS, {
          headers: { Authorization: `bearer ${token}` },
        })
        .then((response) => {
          if (response.data?.errors) return;
          setUsers(response.data.users);
        });
    })();
  }, []);

  return (
    <div className="profileList">
      {users.map((user) => (
        <UserProfile key={user._id} user={user} />
      ))}
    </div>
  );
}
