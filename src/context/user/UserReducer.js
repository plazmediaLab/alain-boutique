import {
  EMAIL_AUTH,
  GOOGLE_AUTH,
  LOG_OUT,
  AUTH_STATE
} from '../types';

export default ( state, action ) => {
  switch (action.type) {
    case EMAIL_AUTH:
      return{
        ...state,
        user: action.payload
      }
    case GOOGLE_AUTH:
      return{
        ...state,
        user: action.payload
      }
    case LOG_OUT:
      return{
        user: null
      }
    case AUTH_STATE:
      return{
        ...state,
        user: action.payload
      }
      
  
    default:
      return state;
  }
};