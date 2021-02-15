import React from 'react';
import Rating from '../Rating/Rating';

// import { Container } from './styles';

function Products(props) {
    const { product } = props;
    return (
        <div className="card" key={product._id}>
            <a href={`/product/${product._id}`}>
            <img className="medium" src={product.image} alt="product" />
            </a>
            <div className="card-body">
            <a href={`/product/${product._id}`}>
                <h2>{product.name}</h2>
            </a>
            <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
            <div className="price">R$ {product.price}</div>
            </div>
        </div>
  );
}

export default Products;