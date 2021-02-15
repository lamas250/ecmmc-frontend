import React from 'react';
import Products from '../../components/Products/Products';
import data from '../../data';

// import { Container } from './styles';

function HomeScreen() {
  return (
    <div>
        <div className="row center">
            {data.products.map((product) => (
                    <Products key={product._id} product={product}></Products>
            ))}
        </div>
    </div>
  );
}

export default HomeScreen;