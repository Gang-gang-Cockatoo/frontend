import React, { useState } from 'react';
import { useNavigate } from 'react-router';
export default function CreateRoomCard({ item }) {
  const history = useNavigate();
  const [roomName, setRoomName] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    history(`/quiz/${item._id}/room/${roomName}`);
  };

  return (
    <div className="quizCard">
      <h1 className="quizTitle">{item.name}</h1>
      <h3>{item.author.companyName}</h3>
      <h3>{item.tag.name}</h3>
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
