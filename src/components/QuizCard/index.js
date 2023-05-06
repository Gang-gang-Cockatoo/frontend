import React, { useState } from 'react';
import './styles.css';
function QuizCard({ question }) {
  const [options, setOptions] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
  });

  const handleOptionChange = (option) => {
    setOptions({
      ...options,
      [option]: !options[option],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission logic here
  };

  return (
    <div className="quiz-card">
      <h1 className="question-style">{question}</h1>
      <form
        onSubmit={handleSubmit}
        className="w-4/5 justify-end flex flex-col justify-around items-center"
      >
        <div className="w-4/5 justify-end flex flex-col m-2">
          <div className="bg-rose-500 hover:bg-rose-400 text-white font-bold py-2 px-4 border-b-4 border-rose-700 hover:border-rose-500 rounded mb-4 rounded-t-xl ">
            <label className="block flex justify-between items-center p-2">
              Option 1:
              <input
                type="checkbox"
                className="m-0 h-5 w-5"
                checked={options.option1}
                onChange={() => handleOptionChange('option1')}
              />
            </label>
          </div>
          <div className="bg-violet-500 hover:bg-violet-400 text-white font-bold py-2 px-4 border-b-4 border-violet-700 hover:border-violet-500  mb-4 rounded-t-xl">
            <label className="block flex justify-between items-center p-2">
              Option 2:
              <input
                type="checkbox"
                className="m-0 h-5 w-5"
                checked={options.option2}
                onChange={() => handleOptionChange('option2')}
              />
            </label>
          </div>

          <div className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded mb-4 rounded-t-xl">
            <label className="block flex justify-between items-center p-2">
              Option 3:
              <input
                type="checkbox"
                className="m-0 h-5 w-5"
                checked={options.option3}
                onChange={() => handleOptionChange('option3')}
              />
            </label>
          </div>
          <div className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded mb-4 rounded-t-xl">
            <label className="block flex justify-between items-center p-2 ">
              Option 4:
              <input
                type="checkbox"
                className="m-0 h-5 w-5"
                checked={options.option4}
                onChange={() => handleOptionChange('option4')}
              />
            </label>
          </div>
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
