import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import {  setCookie, delCookie } from "../../shared/Cookie";
import firebase from 'firebase/app'
import { auth, firestore } from "../../shared/firebase";

import { actionCreators as likeActions } from "./like";


const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

const loginFB = (email, pwd) => {
  return function (dispatch, getState, { history }) {
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {
      auth
        .signInWithEmailAndPassword(email, pwd)
        .then((user) => {
          dispatch(
            setUser({
              name: user.user.displayName,
              email: email,
              user_profile: "",
              uid:user.user.uid
            })
          );
          dispatch(likeActions.setLikeFB(user.user.uid));
          history.push("/");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.error("LoginError", errorCode, errorMessage);
        });
    });
  };
};

const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            name: user.displayName,
            email: user.email,
            user_profile: "",
            uid: user.uid,
          })
        );
      }else{
        dispatch(logOut())
      }
    });
  };
};

const signupFB = (email, pwd, name) => {
  return function (dispatch, getState, { history }) {
    auth
      .createUserWithEmailAndPassword(email, pwd)
      .then((user) => {
        auth.currentUser
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            dispatch(setUser({ name: name, email: email, user_profile: "", uid: user.user.uid }));
            history.push("/");
          })
          .catch((error) => {
            console.error(error);
            window.alert(error)
          });
          const likeDB = firestore.collection("like");
          likeDB
            .doc(user.user.uid)
            .set({
              like_posts: [],
            })
            .then(() => {
              console.log("좋아요 collection 추가 성공!");
            })
            .catch((e) => {
              console.error(e);
            });

      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error('SignUpError',errorCode, errorMessage);
        // ..
      });
  };
};

const logoutFB = () =>{
    return function(dispatch, getState, {history}){
      auth.signOut().then(()=>
      dispatch(logOut()))
      history.replace('/')
    }
}

const initialState = {
  user: null,
  is_login: false,
};

export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        delCookie("is_login");
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

const actionCreators = {
  logOut,
  getUser,
  signupFB,
  loginFB,
  loginCheckFB,
  logoutFB
};

export { actionCreators };
