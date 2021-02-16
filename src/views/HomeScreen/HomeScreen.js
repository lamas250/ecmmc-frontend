import React, { useEffect } from 'react';
import Products from '../../components/Products/Products';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import { listProducts } from '../../redux/actions/productActions';
import { useDispatch, useSelector } from 'react-redux'

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { loading, error , products} = productList;

  useEffect(() => {
    dispatch(listProducts());
  },[dispatch])

  return ( 
    <div>
      {
        loading ? <LoadingBox></LoadingBox>
        : 
        error? <MessageBox variant="danger">{error}</MessageBox> 
        : 
        <div className="row center">
            {products.map((product) => (
                    <Products key={product._id} product={product}></Products>
            ))}
        </div>
      }
    </div>
  );
}

export default HomeScreen;