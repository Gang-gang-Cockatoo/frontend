import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Page from './Page';
import Car from './Car';

const API = process.env.REACT_APP_API;

const roomName = 'test';

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}

export default function Socket() {
  const token = localStorage.getItem('token');
  const id = parseJwt(token).userId;
  console.log(id);
  const socket = useRef();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [room, setRoom] = useState();

  useEffect(() => {
    socket.current = io(API, { query: { room: roomName, id } });

    const onConnect = () => {
      console.log('connect');
      setIsConnected(true);
    };

    const onDisconnect = () => {
      console.log('disconnect');
      setIsConnected(false);
    };

    socket.current.on('connect', onConnect);
    socket.current.on('disconnect', onDisconnect);

    socket.current.on('user-connected', (data) => {
      setRoom(data);
    });

    socket.current.on('update', (data) => {
      setRoom(data);
    });

    return () => {
      console.log('cleanup');
      socket.current.off('connect', onConnect);
      socket.current.off('disconnect', onDisconnect);
    };
  }, []);

  const handleEmit = () => {
    socket.current.emit('self-update');
  };

  // const [state, setState] = useState({ currentQ: 0, totalQ: 10, carNumber: 3 });

  return (
    <Page>
      {/* <Car {...state} />
      <button
        onClick={() =>
          setState((state) => ({ ...state, currentQ: state.currentQ + 1 }))
        }
      >
        Next
      </button>
      <button
        onClick={() =>
          setState((state) => ({ ...state, currentQ: state.currentQ - 1 }))
        }
      >
        Prev
      </button> */}
      <div>
        {room &&
          room.map(({ id, level, status }) => (
            <div key={id}>
              <p>{`Id: ${id}, Level: ${level}, Status: ${status}`}</p>
            </div>
          ))}
        <div>Socket is {isConnected ? 'connected' : 'not connected'}</div>
        <div className="flex flex-col">
          <button onClick={() => socket.current.connect()}>Connect</button>
          <button onClick={() => socket.current.disconnect()}>
            Disconnect
          </button>
          <button onClick={handleEmit}>Emit</button>
        </div>
      </div>
    </Page>
  );
}
