import React, { useContext, useEffect, useState } from 'react';
import style from './Categories.module.css';
import { CategoriesContext } from '../../Context/CategoriesContext';

export default function Categories() {
  const { getAllCategories } = useContext(CategoriesContext);
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    let { data } = await getAllCategories();
    setCategories(data.data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4 h6 lead">Categories:</h1>
      <div className="row">
        {categories.map(category => (
          <div className="col-md-4 mb-4" key={category._id}>
            <div className="card h-100">
              <img src={category.image} className="card-img-top" alt={category.name} height={200} />
              <div className="card-body">
                <h5 className="card-title">{category.name}</h5>
                <p className="card-text"><strong>Created At:</strong> {new Date(category.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
