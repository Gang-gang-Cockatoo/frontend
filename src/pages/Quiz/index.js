import React, { useEffect, useRef, useState } from 'react';
import { Page, QuizCard } from '../../components';
import axios from 'axios';
import { useParams } from 'react-router';

const GET_QUIZ = `${process.env.REACT_APP_API}/quizzes/`;

export default function Quiz() {
  const [score, setScore] = useState(0);
  const [quiz, setQuiz] = useState(null);
  const timer = useRef();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      await axios
        .get(GET_QUIZ + id, { headers: { Authorization: `bearer ${token}` } })
        .then((response) => {
          if (response.data?.errors) return;

          setQuiz(response.data);
        });
    })();

    return clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    if (quiz) {
      timer.current = setTimeout(() => {
        console.log('time expired');
      }, quiz.time * 60 * 1000);
    }
  }, [quiz]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(score);
  };

  return (
    <Page>
      <div className="w-full flex flex-col items-center">
        {quiz &&
          quiz.questions.map((question, index) => (
            <QuizCard
              key={index}
              question={question}
              score={score}
              setScore={setScore}
            />
          ))}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </Page>
  );
}
