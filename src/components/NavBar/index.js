import { AiOutlineMenu } from 'react-icons/ai';
import React, { useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  return (
    <nav className="navigation">
      <div
        className={
          isNavExpanded ? 'navigation-menu expanded' : 'navigation-menu'
        }
      >
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/recruiter/quizzes">Quizzes</Link>
          </li>
          <li>
            <Link to="/recruiter/users">Users</Link>
          </li>

          <button className="logout ">Logout</button>
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
