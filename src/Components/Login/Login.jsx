import React, { useContext, useState } from 'react';
import style from './Login.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { UserTokenContext } from '../../Context/UserToken';

export default function Login() {
  const { userToken, setUserToken } = useContext(UserTokenContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const validationSchema = yup.object({
    email: yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: yup.string()
      .required('Password is required'),
  });

  async function Login(values) {
    try {
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values);
      if (data.message === 'success') {
        localStorage.setItem('userToken', data.token);
        setUserToken(data.token);
        navigate('/Home');
      } else {
        setErrorMessage('Wrong data. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: Login
  });

  return (
    <div className="container">
      <div className={style.registerForm}>
        <h2>Login Now :</h2>
        {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : null}
        <form onSubmit={formik.handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </label>
          {formik.touched.email && formik.errors.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : null}

          <label>
            Password:
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
          </label>
          {formik.touched.password && formik.errors.password ? (
            <div className="alert alert-danger">{formik.errors.password}</div>
          ) : null}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
