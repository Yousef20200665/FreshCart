import React, { useState } from 'react';
import { useFormik } from 'formik';
import style from './Register.module.css';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [errorMessage, setErrorMessage] = useState('');
    let nav =useNavigate()
    let validate = yup.object({
        name: yup.string()
            .min(3, "Name must be more than 3 characters")
            .max(15, "Name must be less than 15 characters")
            .required('Name is required'),
        email: yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: yup.string()
            .required('Password is required'),
        rePassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('RePassword is required')
    });

    async function sendForm(values) {
        try {
            let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values);
            if(data.message=='success'){
                nav('/login')
            }
            else{
                return
            }
            console.log(data);
            setErrorMessage('');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setErrorMessage('Email already in use. Please use a different email.');
            } else {
                setErrorMessage('An unexpected error occurred. Please try again later.');
            }
        }
    }

    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: '',
        },
        validationSchema: validate,
        onSubmit: sendForm
    });

    return (
        <div className={style.container}>
            <div className="container">
                <div className={style.registerForm}>
                    <h2>Register Now :</h2>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <form onSubmit={formik.handleSubmit}>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                            />
                        </label>
                        {formik.touched.name && formik.errors.name ? (
                            <div className="alert alert-danger">{formik.errors.name}</div>
                        ) : null}
                        
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

                        <label>
                            RePassword:
                            <input
                                type="password"
                                name="rePassword"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.rePassword}
                            />
                        </label>
                        {formik.touched.rePassword && formik.errors.rePassword ? (
                            <div className="alert alert-danger">{formik.errors.rePassword}</div>
                        ) : null}

                        <label>
                            Phone:
                            <input
                                type="tel"
                                name="phone"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                            />
                        </label>
                        {formik.touched.phone && formik.errors.phone ? (
                            <div className="alert alert-danger">{formik.errors.phone}</div>
                        ) : null}

                        <button  type="submit">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
