import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';

// import { Container } from './styles';

function Products(props) {
    const { product } = props;
    return (
        <div className="card" key={product._id}>
            <Link to={`/product/${product._id}`}>
              <img className="medium" src={product.image} alt={product.name} />
            </Link>
            <div className="card-body">
            <Link to={`/product/${product._id}`}>
                <h2>{product.name}</h2>
            </Link>
            <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
            <div className="price">R$ {product.price}</div>
            </div>
        </div>
  );
}

export default Products;