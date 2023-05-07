import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const POST_ROOM = `${process.env.REACT_APP_API}/rooms`;

export default function CreateRoomCard({ item }) {
  const history = useNavigate();
  const [roomName, setRoomName] = useState('');
  const token = localStorage.getItem('token');

  const handleClick = async (e) => {
    e.preventDefault();

    await axios
      .post(
        POST_ROOM,
        { quiz: item._id, name: roomName },
        { headers: { Authorization: `bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        if (response.data?.errors) return;

        history(`/quiz/${item._id}/room/${roomName}`);
      });
  };

  return (
    <div className="quizCard">
      <h1 className="quizTitle">{item.name}</h1>
      <h3>{item.author.companyName}</h3>
      <h3>TAG</h3>
      <h3>Questions: {item.questions.length}</h3>
      <input
        className="form-item-input w-2/5"
        value={roomName}
        onChange={(event) => setRoomName(event.target.value)}
        type="text"
      />
      <button onClick={handleClick}>Create Room</button>
    </div>
  );
}
