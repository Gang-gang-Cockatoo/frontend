import axios from 'axios';
import { async } from 'q';
import { useEffect, useState } from 'react';

const GET_TAGS = `${process.env.REACT_APP_API}/tags`;

export default function CompanyForm() {
  const [name, setName] = useState('');
  const [tag, setTag] = useState('');
  const [questions, setQuestions] = useState([]);
  const [tags, setTags] = useState([]);
  useEffect(() => {
    (async () => {
      const token =
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDU2OGZjNzM0OGJjZjFhMTM1MWZhZjgiLCJ0eXBlIjoiY2FuZGlkYXRlIiwibGFzdE5hbWUiOiJhbGV4IiwiZmlyc3ROYW1lIjoiZnJ1bnphIiwiZW1haWwiOiJjYW5kaWRhdGVAY2FuZGlkYXRlLmNvbSIsImlhdCI6MTY4MzM5NjgwNywiZXhwIjoxNjgzNDgzMjA3fQ.BKYzvrK1YhXEHK2u4WMANO0w9vMKgEZxgFh1cyxw6dW2dhiNH5mocX8NGjIvxgQvYML-MXvR9KEPZ2vUNOvOT2UIgKc6I8Cb7eOdhcrXIld0vmNij2fBJDvqZreXOuQB3V0fMr43ahZyW45Q-WV0-ZbxOiha2oYgSVIfFAbu3xLcZv9SzKc0h9HM-xT6rs1T0uSSikZr498MDDTkiEpobNz_fSEYKIGps7rgB_RtpUuOANSas3YKzAkNpVPjtGmBo3G7mGBMNR19LjD7ZgC3WTr7wW0bn2Sc_EzXqBLAbLPoI3LAGnKDBlDrWxxlaKXnpKSNSYwlrdTkawFWeRl67cvxMDluupgi8l_glfLfasuqAW4x65xDR9KkFE924Nl21yk9VPDz8d43niIJRDTbwJcZvpEj6XjZy6hsQq5sm8uMHy5gZgj_WQxqWhtpYSr--5_kDzOSWFi67r9sopejut9uLsih2nwi5JIHasH0XQ59lakEUF8P0sgKphL9O3MsnpNQ80UD8WZy_0c4Q4SDsPleFuUy1S4ZEmvIye5WZUIGn6-DeHcyKE9EiFjAlqdFXti1GHpeKDNLEOheGwMB314RBJTcaL9vd94AaYvq2ea1XWxu3kpYYWXLKb1Jy7mqnX6HFZkBWbcB-rwzsUhYz4egvk9zDrZdJ0kZGlxIM';
      //   const token = localStorage.getItem('token');
      await axios
        .get(GET_TAGS, {
          headers: { Authorization: `bearer ${token}` },
        })
        .then((response) => {
          if (response.data?.errors) return;
          setTags(response.data.tags);
        });
    })();
  }, []);

  const handleOptionChange = (index, value) => {
    const newInputs = [...questions];
    console.log(newInputs[index]);
    newInputs[index].difficulty = value;
    setQuestions(newInputs);
  };

  function handleInputChange(index, value) {
    const newInputs = [...questions]; // create a copy of the questions array
    newInputs[index].text = value; // update the value of the input at the given index
    setQuestions(newInputs); // update the questions state with the new array
  }

  function handleAddInput() {
    const question = {
      answers: [
        { text: '', correct: false },
        { text: '', correct: false },
        { text: '', correct: false },
        { text: '', correct: false },
      ],
      difficulty: '',
      text: '',
    };
    setQuestions([...questions, question]);
  }

  function handleRemoveInput(index) {
    const newInputs = [...questions]; // create a copy of the questions array
    newInputs.splice(index, 1); // remove the input at the given index
    setQuestions(newInputs); // update the questions state with the new array
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log({ name, tag, questions });
  }

  function handleInputChangeAnswer(questionIndex, answerIndex, value) {
    const newInputs = [...questions];
    newInputs[questionIndex].answers[answerIndex].text = value;
    setQuestions(newInputs);
  }

  function handleInputChangeAnswer2(questionIndex, answerIndex, value) {
    const newInputs = [...questions];
    newInputs[questionIndex].answers[answerIndex].correct =
      value === 'on' ? true : false;
    setQuestions(newInputs);
  }

  return (
    <form onSubmit={handleSubmit} className="my-10 bg-slate-100 p-10 w-4/5">
      <div className="flex items-center justify-around mb-5">
        <div>
          <label className="form-item-label mx-3">Quiz Name</label>
          <input
            className="form-item-input w-3/5"
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
          />
        </div>
        <div>
          <label className="form-item-label mx-3">Select a Tag:</label>
          <select value={tag} onChange={(e) => setTag(e.target.value)}>
            <option value=""></option>
            {tags.map(({ id, name }) => (
              <option key={id} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {questions.map(({ text, answers, difficulty }, index) => (
        <div
          key={index}
          className="mb-4 flex flex-col justify-between items-center"
        >
          <div className="w-4/5 flex-row">
            <div className="form-item">
              <div className="flex flex-row justify-between items-center m-2">
                <label className="form-item-label ">
                  Question no. {index + 1}
                </label>
                <button
                  type="button"
                  onClick={() => handleRemoveInput(index)}
                  className="bg-rose-500 hover:bg-rose-400 text-white font-bold py-1 px-3 border-b-4 border-rose-700 hover:border-rose-500 rounded w-1/20 h-1/4"
                >
                  Remove
                </button>
              </div>
              <input
                className="form-item-input"
                value={text}
                onChange={(event) =>
                  handleInputChange(index, event.target.value)
                }
                type="text"
              />
            </div>
          </div>
          <div className="p-2 w-2/5 flex justify-around ">
            <label className="bg-green-400 hover:bg-green-300 text-white font-bold py-1 px-2 border-b-4 border-green-700 hover:border-green-500 rounded">
              <input
                type="radio"
                value="easy"
                checked={difficulty === 'easy'}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
              Easy
            </label>

            <label className="bg-yellow-400 hover:bg-yellow-300 text-white font-bold py-1 px-2 border-b-4 border-yellow-700 hover:border-yellow-500 rounded">
              <input
                type="radio"
                value="medium"
                checked={difficulty === 'medium'}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
              Medium
            </label>

            <label className="bg-violet-400 hover:bg-violet-500 text-white font-bold py-1 px-2 border-b-4 border-violet-700 hover:border-violet-500 rounded">
              <input
                type="radio"
                value="hard"
                checked={difficulty === 'hard'}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
              Hard
            </label>
          </div>
          {answers.map(({ text, correct }, ansIndex) => (
            <div key={ansIndex} className="form-item w-3/5">
              <label className="form-item-label ">Answer</label>
              <input
                className="form-item-input"
                value={text}
                onChange={(event) =>
                  handleInputChangeAnswer(index, ansIndex, event.target.value)
                }
                type="text"
              />
              <div className="flex justify-between items-center">
                <label className="form-item-label ">correct answer?</label>
                <input
                  type="checkbox"
                  className="m-0 h-5 w-5"
                  checked={correct}
                  onChange={(e) =>
                    handleInputChangeAnswer2(index, ansIndex, e.target.value)
                  }
                />
              </div>
            </div>
          ))}

          {/* <input
            type="text"
            value={input}
            onChange={(event) => handleInputChange(index, event.target.value)}
            className="border border-gray-400 px-2 py-1 rounded"
          /> */}
        </div>
      ))}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleAddInput}
          className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
        >
          Add Question
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
