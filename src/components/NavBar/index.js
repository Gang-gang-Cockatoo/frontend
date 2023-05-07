import { AiOutlineMenu } from 'react-icons/ai';
import React, { useState } from 'react';
import './styles.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const history = useNavigate();
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    history('/');
  };

  return (
    <nav className="navigation">
      <div
        className={
          isNavExpanded ? 'navigation-menu expanded' : 'navigation-menu'
        }
      >
        <ul>
          {!user ? (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          ) : user.type === 'candidate' ? (
            <>
              <li>
                <Link to="/rooms">Rooms</Link>
              </li>
              <button className="logout" onClick={logOut}>
                Logout
              </button>
            </>
          ) : (
            <>
              <li>
                <Link to="/quizzes">Quizzes</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
              <li>
                <Link to="/create-quiz">Create Quiz</Link>
              </li>
              <button className="logout" onClick={logOut}>
                Logout
              </button>
            </>
          )}
        </ul>
      </div>
      <button
        className="burgerIcon"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        <AiOutlineMenu></AiOutlineMenu>
      </button>
    </nav>
  );
}
