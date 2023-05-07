import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useParams } from 'react-router';
import { BiStopwatch } from 'react-icons/bi';

import { io } from 'socket.io-client';

import axios from 'axios';
import { FaUserAlt } from 'react-icons/fa';
import { parseJwt } from '../../service/utils';
import { Car, QuizCard } from '../../components';

const SOCKET_URL = process.env.REACT_APP_API;
const GET_QUIZ = `${process.env.REACT_APP_API}/quizzes/`;
const TIME_LIMIT = 60 * 1000;

const getMinAndSec = (timestamp) => {
  timestamp = timestamp / 1000;
  return `${Math.floor(timestamp / 60)} mins ${Math.floor(
    timestamp % 60
  )} secs`;
};

export default function Quiz() {
  const { quizId, roomId } = useParams();
  const [quiz, setQuiz] = useState(null);

  const token = localStorage.getItem('token');
  const { userId: id, type } = parseJwt(token);

  const timer = useRef();
  const socket = useRef();

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [room, setRoom] = useState(null);
  const [raceStarted, setRaceStarted] = useState(false);
  const [raceFinished, setRaceFinished] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [time, setTime] = useState({
    end: '',
    start: new Date().getTime(),
    display: '',
  });

  const [index, setIndex] = useState(0);

  const socketEvents = [
    'connect',
    'disconnect',
    'self-update',
    'update',
    'user-connected',
  ];

  useEffect(() => {
    socket.current = io(SOCKET_URL, { query: { room: roomId, id, type } });

    socket.current.on('connect', () => setIsConnected(true));
    socket.current.on('disconnect', () => setIsConnected(false));
    socket.current.on('user-connected', (data) => setRoom(data));
    socket.current.on('update', (data) => setRoom(data));
    socket.current.on('start-race', (data) => {
      setTime((time) => ({ ...time, start: new Date().getTime() }));
      setRaceStarted(true);
    });
    socket.current.on('end-race', (leaderboard) => {
      setRaceFinished(true);
      setLeaderboard(leaderboard);
      clearTimeout(timer.current);
    });
    socket.current.on('room-full', () => <Navigate to="/" />);

    return () => {
      console.log('cleanup');
      socketEvents.forEach((name) => socket.current.off(name));
    };
  }, []);

  useEffect(() => {
    (async () => {
      await axios
        .get(GET_QUIZ + quizId, {
          headers: { Authorization: `bearer ${token}` },
        })
        .then((response) => {
          if (response.data?.errors) return;
          setQuiz(response.data);
        });
    })();
  }, []);

  useEffect(() => {
    if (quiz) {
      timer.current = setInterval(() => {
        setTime((time) => {
          const newTime = time.start + TIME_LIMIT - new Date().getTime();

          if (newTime <= 1000) {
            socket.current.emit('end-race', { quiz: quizId });
          }

          return { ...time, display: getMinAndSec(newTime) };
        });
      }, 1000);
    }

    return () => {
      clearTimeout(timer.current);
    };
  }, [quiz]);

  const handleSubmit = (score) => {
    setIndex((index) => index + 1);

    let payload = { score, status: 'active' };

    if (index + 1 === quiz.questions.length) {
      setRaceFinished(true);
      payload.status = 'finish';
      setTime((time) => ({ ...time, end: new Date().getTime() }));
    }

    socket.current.emit('self-update', payload);
  };

  const startRace = (e) => {
    e.preventDefault();
    socket.current.emit('start-race');
    setRaceStarted(true);
  };

  const endRace = (e) => {
    e.preventDefault();
    socket.current.emit('end-race', { quiz: quizId });
  };

  if (!raceStarted) {
    if (type === 'candidate')
      return (
        <div className="flex justify-center  mt-[250px]">
          <div className="w-4/5 bg-gray-50 p-10 rounded-2xl flex  justify-center flex-col items-center">
            <h1 className="m-2">Waiting for the host to start the race</h1>
            <div>
              {room &&
                room.map(({ id, level, status, type }) => (
                  <div className="flex flex-row">
                    <FaUserAlt className="mx-3" />
                  </div>
                ))}
            </div>
          </div>
        </div>
      );
    if (type === 'recruiter')
      return (
        <button
          onClick={startRace}
          type="submit"
          className="w-[128px] self-center bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded "
        >
          Start
        </button>
      );
  }

  return (
    <div className="h-full">
      <div className="flex items-center justify-center text-lg">
        <BiStopwatch size={32} />
        Time left: {time.display}
      </div>
      <div className="flex flex-col h-1/4">
        {room &&
          room
            .filter(({ type }) => type === 'candidate')
            .map(({ id, level, status }, index) => {
              return (
                <Car
                  key={id}
                  id={id}
                  currentQ={level}
                  totalQ={quiz.questions.length}
                  carNumber={(index % 4) + 1}
                />
              );
            })}
      </div>
      {type === 'candidate' ? (
        <div className="w-full h-3/4 flex flex-col items-center">
          {!raceFinished ? (
            <QuizCard
              key={quiz.questions[index]._id}
              question={quiz.questions[index]}
              onSubmit={handleSubmit}
            />
          ) : (
            <div className="bg-green-400 p-10 rounded-3xl flex flex-col items-center">
              <h2>Race Completed!</h2>
              <h2>Your Score {room.find((entry) => entry.id === id).score}</h2>
              <div>
                <h2>Leaderboard</h2>
                {console.log(leaderboard)}
                {leaderboard.map(
                  ({ _id, firstName, lastName, email, points, time }) => (
                    <div key={_id} className="flex">
                      <h1>{`${firstName} ${lastName}`}</h1>
                      <h2>{email}</h2>
                      <h2>Score: {points}</h2>
                      <h2>Time: {Math.abs(Math.floor(time / 1000))}</h2>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          {room &&
            room.map(({ id, level, status, type, score }) => (
              <p
                key={id}
              >{`Id: ${id}, Level: ${level}, Status: ${status}, Type: ${type}, Score: ${score}`}</p>
            ))}
          <button
            onClick={endRace}
            type="submit"
            className="w-[128px] self-center bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded "
          >
            End Race
          </button>
        </div>
      )}
    </div>
  );
}
