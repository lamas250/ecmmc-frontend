import React, { useState } from 'react'
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../redux/actions/cartActions';

export default function ShippingScreen(props) {
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  if(!userInfo) {
    props.history.push('/signin');
  }
  const cart = useSelector(state => state.cart);
  const {shippingAddress} = cart;

  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({
      fullName, address, postalCode, city, country
    }))
    props.history.push('/payment');
  }

  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label>Full Name</label>
          <input 
            type="text"
            id="fullName"
            value={fullName}
            placeholder="Enter Full Name"
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label>Address</label>
          <input 
            type="text"
            id="address"
            value={address}
            placeholder="Enter Address"
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label>Postal Code</label>
          <input 
            type="text"
            id="postalCode"
            value={postalCode}
            placeholder="Enter Postal Code"
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label>City</label>
          <input 
            type="text"
            id="city"
            value={city}
            placeholder="Enter City"
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label>Country</label>
          <input 
            type="text"
            id="country"
            value={country}
            placeholder="Enter Country"
            onChange={(e) => setCountry(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label></label>
          <button className="primary" type="submit">Continue</button>
        </div>
      </form>
    </div>
  )
}
