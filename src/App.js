import { BrowserRouter, Link, Route } from 'react-router-dom'
import HomeScreen from "./views/HomeScreen/HomeScreen";
import ProductScreen from "./views/ProductScreen/ProductScreen";
import CartScreen from './views/CartScreen/CartScreen'
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SigninScreen from './views/Signin/SigninScreen';
import { signout } from './redux/actions/userActions';

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
                <Route path="/" component={HomeScreen} exact></Route>
                <Route path="/signin" component={SigninScreen} exact></Route>
            </main>
            <footer className="row center">All right reserved</footer>
        </div>
    </BrowserRouter>
  )
}

export default App;
