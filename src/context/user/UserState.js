import React, { useReducer } from 'react';
import UserContext from './UserContext';
import UserReducer from './UserReducer';

import {
  EMAIL_AUTH,
  GOOGLE_AUTH,
  FACEBOOK_AUTH,
  LOG_OUT,
  AUTH_STATE,
  GET_PRODUCTS,
  GET_GROUPS,
  ACTIVE_GROUP,
  OPEN_MODAL,
  CLOSE_MODAL
} from '../types';


const UserState = ({ children }) => {
  
  // State de pedidos
  const initialState = {
    user: null,
    products: [],
    groups: [],
    modalOpen: false,
    activeGroup: ''
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
  // Products & Groups
  const getProductsMethod = data => {
    dispatch({
      type: GET_PRODUCTS,
      payload: data
    })
  };
  const getGroupsMethod = data => {
    dispatch({
      type: GET_GROUPS,
      payload: data
    })
  };
  const activeGroupMethod = group => {
    dispatch({
      type: ACTIVE_GROUP,
      payload: group
    })
  };

  // Modal 
  function openModal() {
    dispatch({
      type: OPEN_MODAL
    })
  }
  function closeModal(){
    dispatch({
      type: CLOSE_MODAL
    })
  }
  
  return (
    <UserContext.Provider
      value={{
        user: state.user,
        products: state.products,
        groups: state.groups,
        modalOpen: state.modalOpen,
        activeGroup: state.activeGroup,
        emailAuthMethod,
        googleAuthMethod,
        facebookAuthMethod,
        logOutMethod,
        authStateMethod,
        getProductsMethod,
        getGroupsMethod,
        activeGroupMethod,
        openModal,
        closeModal
      }}
    >

      { children }
      
    </UserContext.Provider>
  );
};

export default UserState;