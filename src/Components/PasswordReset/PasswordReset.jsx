import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import style from './PasswordReset.module.css';

export default function PasswordReset() {
  const [message, setMessage] = useState('');
  const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);
  const nav = useNavigate();

  const validationSchema = yup.object({
    
    resetCode: yup.string().when('showNewPasswordForm', {
      is: false,
      then: yup.string().required('Reset code is required'),
    }),
    newPassword: yup.string().when('showNewPasswordForm', {
      is: true,
      then: yup.string().required('New password is required').min(8, 'Password must be at least 8 characters'),
      email: yup.string().email('Invalid email format').required('Email is required'),
    }),
  });

  async function verifyResetCode(values) {
    try {
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
        resetCode: values.resetCode,
      });
      console.log('Response:', response); // Log the entire response for debugging
      if (response.data.status === 'Success') {
        setMessage('Reset code verified successfully! Please enter your new password.');
        setShowNewPasswordForm(true);
      } else {
        setMessage('Invalid reset code.');
        console.log('Response status:', response.data.status); // Log the response status for debugging
      }
    } catch (error) {
      console.error('Password reset error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  }

  async function updatePassword(values) {
    try {
      const {data} = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
        email: values.email,
        newPassword: values.newPassword,
      });
      if (data.token) {
        setMessage('Password updated successfully!');
        setTimeout(() => {
          nav('/login');
        }, 3000);  
      } else {
        console.log("the res",);
        setMessage('Failed to update password.');
        // console.log('Password update response status:', response.data.status);
       
      }
    } catch (error) {
      
      console.error('Password update error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      resetCode: '',
      newPassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (showNewPasswordForm) {
        updatePassword(values);
      } else {
        verifyResetCode(values);
      }
    },
  });

  return (
    <div className="container">
      <div className={style.resetForm}>
        <h2>Reset Your Password</h2>
        {message && <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
        <form onSubmit={formik.handleSubmit}>
          {!showNewPasswordForm && (
            <>
              
              {formik.touched.email && formik.errors.email ? (
                <div className="alert alert-danger">{formik.errors.email}</div>
              ) : null}
              <label>
                Reset Code:
                <input
                  type="text"
                  name="resetCode"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.resetCode}
                />
              </label>
              {formik.touched.resetCode && formik.errors.resetCode ? (
                <div className="alert alert-danger">{formik.errors.resetCode}</div>
              ) : null}
            </>
          )}
          {showNewPasswordForm && (
            <>
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
              <label>
                New Password:
                <input
                  type="password"
                  name="newPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.newPassword}
                />
              </label>

              {formik.touched.newPassword && formik.errors.newPassword ? (
                <div className="alert alert-danger">{formik.errors.newPassword}</div>
              ) : null}
            </>
          )}
          <button type="submit">{showNewPasswordForm ? 'Update Password' : 'Verify Reset Code'}</button>
        </form>
      </div>
    </div>
  );
}
