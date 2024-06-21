import React, { useContext } from 'react';
import style from './CheckOut.module.css';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { useFormik } from 'formik';

export default function CheckOut() {
  const { OnlinePayment } = useContext(CartContext);
  const { id } = useParams();

  async function Payment(values) {
    try {
      const response = await OnlinePayment(id, values);
      console.log(response);
      if(response?.data.status=='success'){
        window.location.href=response.data.session.url
      }
    } catch (error) {
      console.error(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: ''
    },
    onSubmit: Payment
  });

  return (
    <div className={`${style.checkoutContainer} container mt-5`}>
      <h2 className="mb-4">Checkout</h2>
      <form onSubmit={formik.handleSubmit} className={style.form}>
        <div className="mb-3">
          <label htmlFor="details" className="form-label">Details</label>
          <input
            id="details"
            name="details"
            type="text"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.details}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            id="phone"
            name="phone"
            type="text"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">City</label>
          <input
            id="city"
            name="city"
            type="text"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.city}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
