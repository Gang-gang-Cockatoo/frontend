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
      {/* // onClick={(e) => handleClick(e, item)}> */}
      <h1 className="quizTitle">{item.name}</h1>
      <h3>{item.author.companyName}</h3>
      <h3>TAG</h3>
      <h3>Questions: {item.questions.length}</h3>
      <CreateRoomCard item={item} handleClick={handleClick} />
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
