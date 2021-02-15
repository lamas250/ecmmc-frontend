import React, { useEffect, useState } from 'react';
import Products from '../../components/Products/Products';
import axios from 'axios';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';

function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try{
        setLoading(true);
        const { data } = await axios.get('/api/products');
        setLoading(false);
        setProducts(data);
      }catch(err){
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  },[])

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