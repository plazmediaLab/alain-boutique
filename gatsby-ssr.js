import React, { useEffect } from 'react';
// Context (State)
import UserState from './src/context/user/UserState';

export const wrapRootElement = ({ element }) => {
  
  return (
    <UserState>
      { element }
    </UserState>
  )
};