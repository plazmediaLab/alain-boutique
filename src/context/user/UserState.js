import React, { useReducer } from 'react';
import UserContext from './UserContext';
import UserReducer from './UserReducer';

import {
  GET_USER,
  LOG_OUT
} from '../types';

const UserState = ({ children }) => {

  // State de pedidos
  const initialState = {
    user: null
  };

  const [ state, dispatch ] = useReducer(UserReducer, initialState);

  // Functions /////////////////////////////////////////////////////
  // Obtener datos de usuario
  const getUser = user => {
    dispatch({
      type: GET_USER,
      payload: user
    })
  };
  // Cerrar sesión
  const logOut = () => {
    dispatch({
      type: LOG_OUT
    })
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        getUser,
        logOut
      }}
    >

      { children }
      
    </UserContext.Provider>
  );
};

export default UserState;