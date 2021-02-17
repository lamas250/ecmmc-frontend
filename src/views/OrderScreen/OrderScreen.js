import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import MessageBox from '../../components/MessageBox/MessageBox';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import { detailsOrder } from '../../redux/actions/orderActions';
import axios from 'axios';
import {PayPalButton} from 'react-paypal-button-v2'

export default function OrderScreen(props) {
  const dispatch = useDispatch();
  const orderId = props.match.params.id;

  const orderDetails = useSelector(state => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    console.log(order)
    const addPaypalScript = async () => {
    const {data} = await axios.get('/api/config/paypal');
    const script = document.createElement('script');
      script.type = "text/javascript";
      script.src= `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    }
    if(!order){
      dispatch(detailsOrder(orderId));
    }else{
      if(!order.isPaid){
        if(!window.paypal){
          addPaypalScript();
        }else{
          setSdkReady(true)
        }
      }
    }
    
  },[dispatch, order, orderId, sdkReady])

  const successPaymentHandler = () => {
    // TODO dispatch pay order.
  }

  return loading ? (<LoadingBox></LoadingBox>) :
  error ? (<MessageBox variant="danger">{error}</MessageBox>) :
  (
    <div>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Order {order._id}</h2>
                <p>
                  <strong>Name: </strong>{order.shippingAddress.fullName}<br/>
                  <strong>Address: </strong>{order.shippingAddress.address}
                 , {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                 , {order.shippingAddress.country}
                </p>
                {order.isDelivered 
                ? <MessageBox variant="success">Delivere at {order.deliveredAt}</MessageBox> 
                : <MessageBox variant='danger'>Not Delivered</MessageBox>}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p><strong>Method: </strong>{order.paymentMethod}</p>
                {order.isPaid 
                ? <MessageBox variant="success">Payd at {order.paidAt}</MessageBox> 
                : <MessageBox variant='danger'>Not Paid</MessageBox>}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Products</h2>
                <ul>
                  {
                    order.orderItems.map((item) => (
                      <li key={item.product}>
                        <div className="row">
                          <div>
                            <img src={item.image} alt={item.name} className="small"></img>
                          </div>
                          <div className="min-30">
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                          </div>
                          <div>
                            {item.qty}{' '} 
                            X ${item.price}{' '}
                            = ${item.qty * item.price}
                          </div>
                        </div>
                      </li>
                    ))
                  }
                </ul>             
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
            <div className="card card-body">
              <ul>
                <li>
                  <h2>Order Summary</h2>
                </li>
                <li>
                  <div className="row">
                    <div>Items</div>
                    <div>${order.itemsPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Shipping Price</div>
                    <div>${order.shippingPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Tax</div>
                    <div>${order.taxPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div><strong>Order Price</strong></div>
                    <div><strong>${order.totalPrice.toFixed(2)}</strong></div>
                  </div>
                </li>
                {
                  !order.isPaid && (
                    <li>
                      {
                        !sdkReady ? (<LoadingBox></LoadingBox>) : 
                        (<PayPalButton 
                          amount={order.totalPrice} 
                          onSuccess={successPaymentHandler}
                        ></PayPalButton>)
                      }
                    </li>
                  )
                }
              </ul>
            </div>
        </div>
      </div>
    </div>
  )
}
