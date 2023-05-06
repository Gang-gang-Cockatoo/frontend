import React, { useState } from 'react';
import './styles.css';

function QuizCard({ question, score, setScore, setIndex }) {
  console.log(question.answers);
  const [answers, setAnswers] = useState([false, false, false, false]);

  const getScore = (dif) => (dif === 'hard' ? 5 : dif === 'medium' ? 3 : 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission logic here

    let correct = true;

    for (let i = 0; i < 4; i++) {
      if (question.answers[i].correct !== answers[i]) {
        correct = false;
        break;
      }
    }

    if (correct) setScore((score) => score + getScore(question.difficulty));

    setIndex((index) => index + 1);
  };

  const handleOptionSelect = (index, value) => {
    setAnswers((state) => {
      state[index] = !state[index];
      return state;
    });
  };

  const getColor = (index) => {
    if (index === 0)
      return 'bg-rose-500 hover:bg-rose-400 border-rose-700 hover:border-rose-500';
    if (index === 1)
      return 'bg-violet-500 hover:bg-violet-400 border-violet-700 hover:border-violet-500';
    if (index === 2)
      return 'bg-green-500 hover:bg-green-400 border-green-700 hover:border-green-500';
    if (index === 3)
      return 'bg-yellow-500 hover:bg-yellow-400 border-yellow-700 hover:border-yellow-500';
  };

  return (
    <div className="quiz-card">
      <h1 className="question-style">{question.text}</h1>
      <form
        onSubmit={handleSubmit}
        className="w-4/5 flex flex-col justify-around items-center"
      >
        <div className="w-4/5 justify-end flex flex-col m-2">
          {question.answers.map(({ _id, text, correct }, index) => (
            <div
              key={_id}
              className={
                getColor(index) +
                ' text-white font-bold py-2 px-4 border-b-4 rounded mb-4 rounded-t-xl'
              }
            >
              <label className="flex justify-between items-center p-2">
                {text}
                <input
                  type="checkbox"
                  className="m-0 h-5 w-5"
                  onChange={(e) => handleOptionSelect(index, e.target.value)}
                />
              </label>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded "
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default QuizCard;
