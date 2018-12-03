import { ADD_ARTICLE, CREATE_POST, LOAD_POSTS } from "../constants/action-types.js";
import jwtDecode from 'jwt-decode';
import * as auth from '../actions/auth';

const initialState = {
  access: undefined,
  refresh: undefined,
  errors: {},
  subreddits: [],
  data: []
};

const rootReducer = (state=initialState, action) => {
  switch (action.type) {
    case CREATE_POST:
      return { ...state, data: [...state.data, action.content] };
    case LOAD_POSTS:
      return { ...state, data: [...state.data, ...action.content] };
    case auth.LOGIN_SUCCESS:
      return {
        access: {
          token: action.payload.access,
          ...jwtDecode(action.payload.access)
        },
        refresh: {
          token: action.payload.refresh,
          ...jwtDecode(action.payload.refresh)
        },
        errors: {}
    }
    case auth.TOKEN_RECEIVED:
      return {
        ...state,
        access: {
          token: action.payload.access,
          ...jwtDecode(action.payload.access)
        }
      }
    case auth.LOGIN_FAILURE:
    case auth.TOKEN_FAILURE:
      return {
         access: undefined,
         refresh: undefined,
         errors:
             action.payload.response ||
                {'non_field_errors': action.payload.statusText},
      }
    default:
      return state;
  }
};
export default rootReducer;

export function accessToken(state) {
    if (state.access) {
        return  state.access.token
    }
}

export function refreshToken(state) {
    if (state.refresh) {
        return  state.refresh.token
    }
}

export function isAccessTokenExpired(state) {
  if (state.access && state.access.exp) {
    return 1000 * state.access.exp - (new Date()).getTime() < 5000
  }
  return true
}
export function isRefreshTokenExpired(state) {
  if (state.refresh && state.refresh.exp) {
    return 1000 * state.refresh.exp - (new Date()).getTime() < 5000
  }
  return true
}
export function isAuthenticated(state) {
  return !isRefreshTokenExpired(state)
}
export function errors(state) {
   return  state.errors
}