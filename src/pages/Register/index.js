import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import './styles.css';
import { Page } from '../../components';
import axios from 'axios';

const REGISTER_URL = `${process.env.REACT_APP_API}/users`;

export default function Regsiter() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password', '');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    console.log(data);
    const isLengthOk = (s) => 5 <= s.length && s.length <= 255;

    if (!isLengthOk(data.firstName)) {
      setError('First Name should be between 5 and 255 characters');
      return;
    }

    if (!isLengthOk(data.lastName)) {
      setError('Last Name should be between 5 and 255 characters');
      return;
    }

    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!data.email.match(validRegex)) {
      setError('Invalid email address');
      return;
    }

    if (!isLengthOk(data.password)) {
      setError('Password should be between 5 and 255 characters');
      return;
    }

    await axios
      .post(REGISTER_URL, { ...data, type: 'candidate' }, { headers: {} })
      .then((data) => console.log(data));
  };

  return (
    <Page>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-item">
            <label className="form-item-label">First Name</label>
            <input className="form-item-input" {...register('firstName')} />
          </div>
          <div className="form-item">
            <label className="form-item-label">Last Name</label>
            <input className="form-item-input" {...register('lastName')} />
          </div>

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
        <div className="form-item">
          <label className="form-item-label">Confirm Password</label>
          <input
            className="form-item-input"
            {...register('password2', {
              validate: (value) => password === value,
            })}
            type="password2"
          />
        </div>
        {errors.password2?.type === 'validate' && (
          <p className="form-error">Passwords are not the same</p>
        )}
        {error.length > 0 && <p className="form-error">{error}</p>}

        <button className="form-submit" type="submit">
          Submit
        </button>
      </form>
    </Page>
  );
}
