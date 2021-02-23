import axios from "axios";
import { 
  PRODUCT_LIST_FAIL, 
  PRODUCT_LIST_REQUEST, 
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL
} from "../constants/productConstants";

export const listProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST
  });
  try {
    const { data } = await axios.get('/api/products');
    dispatch({type: PRODUCT_LIST_SUCCESS, payload: data})
  } catch (error) {
    dispatch({type: PRODUCT_LIST_FAIL, payload: error.message})
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({type: PRODUCT_DETAILS_REQUEST, 
    payload: productId});
  try {
    const {data} = await axios.get(`/api/products/${productId}`);
    dispatch({type: PRODUCT_DETAILS_SUCCESS, 
      payload: data})
  } catch (error) {
    dispatch({type: PRODUCT_DETAILS_FAIL, 
      payload: error.response && 
      error.response.data.message ? 
      error.response.data.message: 
      error.message
    })
  }
}

export const createProduct = (data) => async (dispatch) => {
  dispatch({type: PRODUCT_CREATE_REQUEST,  payload: data});
  const prudctData = {...data, image: "/images/p1.jpg", rating: "4", numReviews: "10"};
  try {
    const {product} = await axios.post('/api/products/create', prudctData);
    dispatch({type: PRODUCT_CREATE_SUCCESS, payload: product});
  } catch (error) {
    console.log("erroe create",error)
    dispatch({type: PRODUCT_CREATE_FAIL, 
      payload: error.response && 
      error.response.data.message ? 
      error.response.data.message: 
      error.message
    })
  }
}

export const deleteProduct = (id) => async (dispatch) => {
  dispatch({type: PRODUCT_DELETE_REQUEST, payload: id});
  try {
    const _id = id;
    await axios.delete('/api/products/delete', _id);
    dispatch({type: PRODUCT_DELETE_SUCCESS});
  } catch (error) {
    dispatch({type: PRODUCT_DELETE_FAIL, 
      payload: error.response && 
      error.response.data.message ? 
      error.response.data.message: 
      error.message
    })
  }
}