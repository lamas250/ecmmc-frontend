import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../redux/actions/userActions'

export default function SigninScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const userSignin = useSelector(state => state.userSignin)
  const { userInfo } = userSignin;

  const redirect = props.location.search 
    ? props.location.search.split('=')[1]
    : '/';

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if(userInfo){
      props.history.push(redirect);
    }
  },[userInfo])

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        <div>
          <label>Email</label>
          <input type="email" id="email" placeholder="Enter email" required
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input type="password" id="password" placeholder="Enter password" required
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">Sign In</button>
        </div>
        <div>
          <label />
          <div>
            New customer? {' '}
            <Link to="/register">Create your account</Link>
          </div>
        </div>
      </form>
    </div>
  )
}
