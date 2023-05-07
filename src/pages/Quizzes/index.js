import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Page, CreateRoomCard } from '../../components';
import './styles.css';

const GET_QUIZZES = `${process.env.REACT_APP_API}/quizzes`;

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    (async () => {
      await axios
        .get(GET_QUIZZES, {
          headers: { Authorization: `bearer ${token}` },
        })
        .then((response) => setQuizzes(response.data.quizzes));
    })();
  }, []);

  return (
    <div className="quizList">
      {quizzes.map((item) => (
        <CreateRoomCard key={item._id} item={item} />
      ))}
    </div>
  );
}
