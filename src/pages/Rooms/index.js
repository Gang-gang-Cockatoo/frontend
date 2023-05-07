import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const GET_ROOMS = `${process.env.REACT_APP_API}/rooms`;

export default function Rooms() {
  const history = useNavigate();
  const [rooms, setRooms] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    (async () => {
      await axios
        .get(GET_ROOMS, {
          headers: { Authorization: `bearer ${token}` },
        })
        .then((response) => {
          console.log(response);
          if (response.data?.errors) return;
          setRooms(response.data.rooms);
        });
    })();
  }, []);

  return (
    <div>
      {rooms.map(({ _id, quiz, name }) => (
        <div
          key={_id}
          onClick={() => history(`/quiz/${quiz._id}/room/${name}`)}
        >
          {name}
        </div>
      ))}
    </div>
  );
}
