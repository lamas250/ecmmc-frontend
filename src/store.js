import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import { cartReducer } from './redux/reducers/cartReducer';
import {productListReducer, productDetailReducer} from './redux/reducers/productReducers';
import { userSigninReducer, userRegisterReducer } from './redux/reducers/userReducer';

const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingAddress: localStorage.getItem('shippingAddress') ?
      JSON.parse(localStorage.getItem('shippingAddress'))
      : {}
  },
  userSignin: {
    userInfor: localStorage.getItem('userInfor')
      ? JSON.parse(localStorage.getItem('userInfor'))
      : null,
  }
};

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk))
  );

export default store;