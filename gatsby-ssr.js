import React from 'react';
// Context (State)
import UserState from './src/context/user/UserState';

import "firebase/auth"
import "firebase/firestore"
import "firebase/functions"

export const wrapRootElement = ({ element }) => {
  
  return (
    <UserState>
      { element }
    </UserState>
  )
};