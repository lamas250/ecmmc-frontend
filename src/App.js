import { BrowserRouter, Link, Route } from 'react-router-dom'
import HomeScreen from "./views/HomeScreen/HomeScreen";
import ProductScreen from "./views/ProductScreen/ProductScreen";
import CartScreen from './views/CartScreen/CartScreen'
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SigninScreen from './views/Signin/SigninScreen';
import { signout } from './redux/actions/userActions';
import RegisterScreen from './views/Register/RegisterScreen';
import ShippingScreen from './views/Shipping/ShippingScreen';
import PaymentScreen from './views/Payment/PaymentScreen';
import PlaceOrder from './views/PlaceOrder/PlaceOrder';
import OrderScreen from './views/OrderScreen/OrderScreen';
import OrderHistory from './views/OrderHistory/OrderHistory';

function App() {

  const cart = useSelector(state => state.cart)
  const userSignin = useSelector(state => state.userSignin)
  const { cartItems } = cart;
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <BrowserRouter>
          <div className="grid-container">
            <header className="row">
            <div>
                <Link className="brand" to="/">amazona</Link>
            </div>
            <div>
                <Link to="/cart">
                  Cart {cartItems.length > 0 && (
                    <span className="badge">{cartItems.length}</span>
                  )}
                </Link>
                {
                  userInfo ? (
                    <div className="dropdown">
                      <Link to="#">{userInfo.name}<i className="fa fa-caret-down"></i>{' '}</Link>
                      <ul className="dropdown-content">
                        <li>
                          <Link to="/orderhistory">Order History</Link>
                        </li>
                        <li>
                          <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <Link to="/signin">Sign In</Link>
                  )
                }
            </div>
            </header>
            <main>
                <Route path="/cart/:id?" component={CartScreen}></Route>
                <Route path="/product/:id" component={ProductScreen}></Route>
                <Route path="/signin" component={SigninScreen}></Route>
                <Route path="/register" component={RegisterScreen}></Route>
                <Route path="/shipping" component={ShippingScreen}></Route>
                <Route path="/payment" component={PaymentScreen}></Route>
                <Route path="/placeorder" component={PlaceOrder}></Route>
                <Route path="/order/:id" component={OrderScreen}></Route>
                <Route path="/orderhistory" component={OrderHistory}></Route>
                <Route path="/" component={HomeScreen} exact></Route>
            </main>
            <footer className="row center">All right reserved</footer>
        </div>
    </BrowserRouter>
  )
}

export default App;
