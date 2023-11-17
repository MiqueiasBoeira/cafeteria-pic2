// userReducer.js
const initialState = {
    usernameId: null,
    isLoggedIn: false,
  };
  
 export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          usernameId: action.payload,
          isLoggedIn: true,
        };
      case 'LOGOUT':
        return {
          ...state,
          usernameId: null,
          isLoggedIn: false,
        };
      default:
        return state;
    }
  };
  
  