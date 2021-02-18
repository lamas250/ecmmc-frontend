import React, { useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import { detailsUser } from '../../redux/actions/userActions';

export default function Profile() {
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin; 
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);
  const {loading, error, user } = userDetails;

  useEffect(() => {
    dispatch(detailsUser(userInfo._id));
  },[dispatch, userInfo._id]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update
  }

  return (
    <div>
      <form 
        className="form" 
        onSubmit={submitHandler}
      >
         <div>
           <h1>User Profile</h1>
         </div>
         {
           loading ? <LoadingBox></LoadingBox>
           : error ? <MessageBox variant="danger">{error}</MessageBox>
           : (
             <>
                <div>
                  <label htmlFor="name">Name</label>
                  <input id="name" type="text" 
                    placeholder="Enter name"
                    value={user.name}
                  ></input>
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input id="email" type="text" 
                    placeholder="Enter email"
                    value={user.email}
                  ></input>
                </div>
                <div>
                  <label>Password</label>
                  <input id="password" type="text" 
                    placeholder="Enter password"
                  ></input>
                </div>
                <div>
                  <label></label>
                  <button className="primary" type="submit">Update</button>
                </div>
             </>
           )
         }

       </form>
    </div>
  )
}