import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Page } from '../../components';
import { useNavigate } from 'react-router';
import './styles.css';


const GET_QUIZZES = `${process.env.REACT_APP_API}/quizzes`;

export default function Quizzes() {
  const history = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    (async () => {
      await axios
        .get(GET_QUIZZES, {
          headers: { Authorization: `bearer ${token}` },
        })
        .then((response) => setQuizzes(response.data.quizzes));
    })();
  }, []);

  const handleClick = (e, item) => {
    e.preventDefault();

    if (user?.type !== 'candidate') {
      return;
    }

    history(`/candidate/quiz/${item._id}`);
  };

  return (
    <Page>
      <div className="quizList">
        {quizzes.map((item) => (
          <div className="quizCard" onClick={(e) => handleClick(e, item)}>
            <h1>{item.name}</h1>
            <h3>{item.author.companyName}</h3>
            <h3>TAG</h3>
            <h3>Questions: {item.questions.length}</h3>
          </div>
        ))}
      </div>
    </Page>
  );
}
