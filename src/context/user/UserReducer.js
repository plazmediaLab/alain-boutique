import {
  EMAIL_AUTH,
  GOOGLE_AUTH,
  FACEBOOK_AUTH,
  LOG_OUT,
  AUTH_STATE,
  GET_PRODUCTS,
  OPEN_MODAL,
  CLOSE_MODAL
} from '../types';

// TODO · Refactorisar los reducer que se puedan 07/24/2020 
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
    case FACEBOOK_AUTH:
      return{
        ...state,
        user: action.payload
      }
    case LOG_OUT:
      return{
        user: null,
        products: null,
      }
    case AUTH_STATE:
      return{
        ...state,
        user: action.payload
      }
    case GET_PRODUCTS:
      return{
        ...state,
        products: action.payload
      }
    case OPEN_MODAL:
      return{
        ...state,
        modalOpen: true
      }
    case CLOSE_MODAL:
      return{
        ...state,
        modalOpen: false
      }
  
    default:
      return state;
  }
};