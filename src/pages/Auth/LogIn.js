import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import './styles.css';
import { Page } from '../../components';
import axios from 'axios';
import { useNavigate } from 'react-router';

const LOGIN_URL = `${process.env.REACT_APP_API}/login`;

export default function Regsiter() {
  const history = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    await axios.post(LOGIN_URL, { ...data }).then((response) => {
      if (response.data?.errors) {
        setError('Login error');
        return;
      }

      const userData = {
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        type: response.data.type,
      };

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(userData));

      history('/');
    });
  };

  return (
    <Page>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-item">
          <label className="form-item-label">Email</label>
          <input
            className="form-item-input"
            {...register('email')}
            type="text"
          />
          {errors.email && <p className="form-error">Email error</p>}
        </div>

        <div className="form-item">
          <label className="form-item-label">Password</label>
          <input
            className="form-item-input"
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
          />
          {showPassword ? (
            <AiOutlineEye onClick={() => setShowPassword((value) => !value)} />
          ) : (
            <AiOutlineEyeInvisible
              onClick={() => setShowPassword((value) => !value)}
            />
          )}
        </div>
        {error.length > 0 && <p className="form-error">{error}</p>}

        <button className="form-submit" type="submit">
          Submit
        </button>
      </form>
    </Page>
  );
}
