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
    <div className="flex flex-col mt-16 items-center h-4/5">
      {rooms.map(({ _id, quiz, name }) => (
        <div
          key={_id}
          onClick={() => history(`/quiz/${quiz._id}/room/${name}`)}
          className="bg-blue-50  bg-opacity-80 hover:bg-opacity-90 hover:shadow-2xl flex justify-center items-center p-4 m-5 rounded-xl text-2xl w-1/5"
        >
          {name}
        </div>
      ))}
    </div>
  );
}
