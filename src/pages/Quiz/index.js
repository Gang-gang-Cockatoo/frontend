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
  const [index, setIndex] = useState(0);
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      await axios
        .get(GET_QUIZ + id, { headers: { Authorization: `bearer ${token}` } })
        .then((response) => {
          if (response.data?.errors) return;
          console.log(response.data);
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
          (index < quiz.questions.length ? (
            <QuizCard
              key={quiz.questions[index]._id}
              question={quiz.questions[index]}
              score={score}
              setScore={setScore}
              setIndex={setIndex}
            />
          ) : (
            <div className="bg-green-400 p-10 rounded-3xl flex flex-col items-center">
              <h2>Race Completed!</h2>
              <h2>Your Score {score}</h2>
            </div>
          ))}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </Page>
  );
}
