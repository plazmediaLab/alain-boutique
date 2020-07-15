import React, { useReducer } from 'react';
import UserContext from './UserContext';
import UserReducer from './UserReducer';

import {
  EMAIL_AUTH,
  GOOGLE_AUTH,
  LOG_OUT,
  AUTH_STATE,
} from '../types';


const UserState = ({ children }) => {
  
  // State de pedidos
  const initialState = {
    user: null,
    page: ''
  };

  const [ state, dispatch ] = useReducer(UserReducer, initialState);

  // Autenticación por correo electrónico
  const emailAuthMethod = data => {
    dispatch({
      type: EMAIL_AUTH,
      payload: data
    })
  };
  const googleAuthMethod = data => {
    dispatch({
      type: GOOGLE_AUTH,
      payload: data
    })
  };
  const logOutMethod = () => {
    dispatch({
      type: LOG_OUT
    });
  }
  const authStateMethod = data =>{
    dispatch({
      type: AUTH_STATE,
      payload: data
    })
  }
  
  return (
    <UserContext.Provider
      value={{
        user: state.user,
        emailAuthMethod,
        googleAuthMethod,
        logOutMethod,
        authStateMethod,
      }}
    >

      { children }
      
    </UserContext.Provider>
  );
};

export default UserState;