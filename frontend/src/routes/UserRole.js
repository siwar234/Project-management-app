import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login2 from '../views/authentication/Login';
import { useEffect } from 'react';
import {  useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { currentUser } from "src/JS/actions/user";

function UserRole({ children }) {

  // Check if user has isAdmin role
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);
   
  const user = useSelector((state) => state.userReducer.user);
  const userRole = user?.Roles?.find(role => role.name === 'user');

  console.log(userRole);


   console.log(userRole)

  if (userRole) {
    return children;

  }

  return <Login2/>;
}

export default UserRole;


