import React, { useReducer } from 'react';
import UserContext from './UserContext';
import UserReducer from './UserReducer';

import {
  
} from '../types';

const UserState = ({ children }) => {

  // State de pedidos
  const initialState = {
    user: null
  };

  const [ state, dispatch ] = useReducer(UserReducer, initialState);

  // Functions
  const Test = () => {
    console.log('Test Context');
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        Test
      }}
    >

      { children }
      
    </UserContext.Provider>
  );
};

export default UserState;