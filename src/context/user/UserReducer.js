import {
  GET_USER,
  LOG_OUT
} from '../types';

export default ( state, action ) => {
  switch (action.type) {
    case GET_USER:
      return{
        ...state,
        user: action.payload
      }
    case LOG_OUT:
      return{
        user: null
      }
      
  
    default:
      return state;
  }
};