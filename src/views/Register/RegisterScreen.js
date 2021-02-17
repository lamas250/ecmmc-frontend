import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/actions/userActions'
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';

export default function RegisterScreen(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassowrd, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const userRegister = useSelector(state => state.userRegister)
  const { userInfo, loading, error } = userRegister;

  const redirect = props.location.search 
    ? props.location.search.split('=')[1]
    : '/';

  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== confirmPassowrd){
      alert('Passowrd and confirm passowrd are not match')
    }else{
      dispatch(register(name, email, password));
    }
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
          <h1>Register</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label>Name</label>
          <input type="text" id="name" placeholder="Enter name" required
            onChange={e => setName(e.target.value)}
          />
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
          <label>Confirm Password</label>
          <input type="password" id="confirmPassword" placeholder="Confirm password" required
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">Register</button>
        </div>
        <div>
          <label />
          <div>
            Already have an account? {' '}
            <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
          </div>
        </div>
      </form>
    </div>
  )
}
