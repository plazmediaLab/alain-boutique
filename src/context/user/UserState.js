import React, { useReducer } from 'react';
import UserContext from './UserContext';
import UserReducer from './UserReducer';

import {
  EMAIL_AUTH,
  GOOGLE_AUTH,
  FACEBOOK_AUTH,
  LOG_OUT,
  AUTH_STATE,
  GET_PRODUCTS
} from '../types';


const UserState = ({ children }) => {
  
  // State de pedidos
  const initialState = {
    user: null,
    products: [],
  };

  const [ state, dispatch ] = useReducer(UserReducer, initialState);

  // Metodos de autenticación
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
  const facebookAuthMethod = data => {
    dispatch({
      type: FACEBOOK_AUTH,
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
  // Products
  const getProductsMethod = data => {
    dispatch({
      type: GET_PRODUCTS,
      payload: data
    })
  };
  
  return (
    <UserContext.Provider
      value={{
        user: state.user,
        products: state.products,
        emailAuthMethod,
        googleAuthMethod,
        facebookAuthMethod,
        logOutMethod,
        authStateMethod,
        getProductsMethod
      }}
    >

      { children }
      
    </UserContext.Provider>
  );
};

export default UserState;