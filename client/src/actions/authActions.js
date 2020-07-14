import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/users/register", userData)
    .then(res => {

      axios
        .post("/users/login", userData)
        .then(res => {

          // console.log('DID IT WORK?')
          // Save to localStorage
          // Set token to localStorage
          const { token } = res.data;
          localStorage.setItem("jwtToken", token);
          // Set token to Auth header
          setAuthToken(token);
          // Decode token to get user data
          const decoded = jwt_decode(token);
          // Set current user
          dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );


    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const registerSocialUser = (userData, history) => dispatch => {
  axios
    .post("/users/social-register", userData)
    .then(res => {

      // console.log('RAN THIS PART')
      //
      // axios
      //   .post("/users/social-login", userData)
      //   .then(res => {
      //     // Save to localStorage
      //     // Set token to localStorage
      //     console.log('RAN RES')
      //     const { token } = res.data;
      //     localStorage.setItem("jwtToken", token);
      //     // Set token to Auth header
      //     setAuthToken(token);
      //     // Decode token to get user data
      //     const decoded = jwt_decode(token);
      //     // Set current user
      //     dispatch(setCurrentUser(decoded));
      //   })
      //   .catch(err =>
      //     dispatch({
      //       type: GET_ERRORS,
      //       payload: err.response.data
      //     })
      //   );
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Update User
export const updateUser = (userData, history) => dispatch => {
  axios
    .post("/users/update", userData)
    .then(res => console.log('res', res))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })

    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  // console.log('something worked', userData);
  axios
    .post("/users/login", userData)
    .then(res => {

      // console.log('DID IT WORK?')
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const socialLoginUser = (userData, history) => dispatch => {
  console.log('something worked', userData);
  axios
    .post("/users/social-login", userData)
    .then(res => {


      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));

      history.push('/home');
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
