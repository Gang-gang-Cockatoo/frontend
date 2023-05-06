import axios from 'axios';
import React, { useEffect, useState } from 'react';

const GET_QUIZZES = `${process.env.REACT_APP_API}/quizzes`;

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      await axios
        .get(GET_QUIZZES, {
          headers: { Authorization: `bearer ${token}` },
        })
        .then((response) => setQuizzes(response.data.quizzes));
    })();
  }, []);

  const handleClick = (e, item) => {
    e.preventDefault();

    console.log(`navigate to ${item.name}`);
  };

  return (
    <div>
      {quizzes.map((item) => (
        <div onClick={(e) => handleClick(e, item)}>
          <h1>{item.name}</h1>
          <h3>{item.author.companyName}</h3>
          <h3>TAG</h3>
          <h3>Questions: {item.questions.length}</h3>
        </div>
      ))}
    </div>
  );
}
