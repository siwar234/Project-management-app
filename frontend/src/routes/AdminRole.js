import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login2 from '../views/authentication/Login';
import { useEffect } from 'react';
import {  useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { currentUser } from "src/JS/actions/user";
function PrivateRole({ children }) {

  // Check if user has isAdmin role
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);
   
  const user = useSelector((state) => state.userReducer.user);
  const adminRole = user?.Roles?.find(role => role.name === 'admin');

  // const isadmin = user?.isAdmin 


  //  console.log(isadmin)

  if (adminRole) {
    return children;

  }

  return <Login2/>;
}

export default PrivateRole;


