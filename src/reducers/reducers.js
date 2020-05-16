import {
  AUTHENTICATE,
  LOGIN_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  auth: {
    isAuthenticated: false,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, auth: { isAuthenticated: true } };
    case AUTHENTICATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
