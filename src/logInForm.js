import React, { useState } from 'react';
import Input from './input';
import { CircleUserRound } from 'lucide-react';
import axios from 'axios';
import './form.css';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email === 'anishkhari91@gmail.com' && formData.password === 'AnishKhari') {
      localStorage.setItem('user', JSON.stringify(formData.email));
      navigate('/');
    } else {
      alert('Invalid Username or Password');
    }
  };

  return (
    <>
      <div className="form-container">
        {/* <div className="form-section left-section">
          <p>Some Text Over Image</p>
        </div> */}
        <div className=' form-section form'>
          <CircleUserRound style={{ width: '50px', height: '50px', margin: '10px' }} />
          <form onSubmit={handleSubmit}>
            <Input
              type='email'
              name='email'
              placeholder='Enter Email'
              onChange={(e) => handleChange('email', e.target.value)}
              required={true}
              autoFocus={true}
            />
            <Input
              type='password'
              name='password'
              placeholder='Enter Password'
              onChange={(e) => handleChange('password', e.target.value)}
              required={true}
            />
            <button className='btn log-in-btn' type='submit'>
              LOG IN
            </button>
          </form>
          <a href='/add-user' title='Create new User Account'>Create Account</a>
        </div>
      </div>
    </>
  );
};

export default Form;
