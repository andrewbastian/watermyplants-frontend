import { push } from "connected-react-router";
import API from "../utils/API";

export const LOGOUT_USER='LOGOUT_USER'

export function logoutUser (history) {
  return dispatch =>{
    dispatch({type: LOGOUT_USER});
    localStorage.removeItem('token')
    history.push('/login')
  }
}

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export function authenticateUser (userData , history) {

  return dispatch => {
    dispatch({ type: LOGIN_REQUEST });

  API().post("/login", userData)
    .then(response => {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem("userID", response.data.id)
      localStorage.setItem("username", response.data.username)
      dispatch({type: LOGIN_SUCCESS, payload: response.data})
      // dispatch(push("/dashboard"));
      history.push('/dashboard')
    })
    .catch(error =>
      dispatch({
        type: LOGIN_FAILURE,
        payload: error
      })
    );
}};

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const registerUser = (userData) => dispatch => {
  dispatch({ type: REGISTER_REQUEST });

  API().post("/register", userData)
    .then(response => {
      dispatch({ type: REGISTER_SUCCESS, payload: response.data });
      dispatch(push("/login"));
    })
    .catch(error =>
      dispatch({
        type: REGISTER_FAILURE,
        errorMessage: error.response.data.message
      })
    );
};

const ID = localStorage.getItem("userID");

export const UPDATE_PHONE_REQUEST = "UPDATE_PHONE_REQUEST";
export const UPDATE_PHONE_SUCCESS = "UPDATE_PHONE_SUCCESS";
export const UPDATE_PHONE_FAILURE = "UPDATE_PHONE_FAILURE";

export const updatePhone = (phone, props) => dispatch => {
  dispatch({ type: UPDATE_PHONE_REQUEST });

  API().put(`/dashboard/${ID}/user_settings`, phone)
    .then(response => {
      dispatch({ type: UPDATE_PHONE_SUCCESS, payload: response.data });
      dispatch(push('/'));
    })
    .catch(error => {
      dispatch({
        type: UPDATE_PHONE_FAILURE,
        errorMessage: error.response.data.message
      });
    });
};
