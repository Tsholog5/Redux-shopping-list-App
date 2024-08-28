import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGOUT
  } from './authActions';
  
  const initialState = {
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return { ...state, currentUser: action.payload, error: null };
      case LOGIN_FAILURE:
        return { ...state, error: action.payload };
      case REGISTER_SUCCESS:
        return { ...state, currentUser: action.payload, error: null };
      case REGISTER_FAILURE:
        return { ...state, error: action.payload };
      case LOGOUT:
        return { ...state, currentUser: null, error: null };
      default:
        return state;
    }
  };
  
  export default authReducer;