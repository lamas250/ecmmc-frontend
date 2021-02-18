import React, { useEffect, useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import { detailsUser, updateUserProfile } from '../../redux/actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../../redux/constants/userConstants';

export default function Profile() {
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin; 
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);
  const {loading, error, user } = userDetails;
  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const {success: successUpdate, error: errorUpdate, loading: loadingUpdate} = userUpdateProfile;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if(!user){
      dispatch({type: USER_UPDATE_PROFILE_RESET});
      dispatch(detailsUser(userInfo._id));
    }else{
      setName(user.name);
      setEmail(user.email);
    }
  },[dispatch, userInfo._id, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({userId: user._id, name, email, password}));
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
             {loadingUpdate && <LoadingBox></LoadingBox>}
             {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
             {successUpdate && <MessageBox variant="success">Profile Updated Successfully</MessageBox>}
                <div>
                  <label htmlFor="name">Name</label>
                  <input id="name" type="text" 
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input id="email" type="text" 
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label>Password</label>
                  <input id="password" type="text" 
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
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
