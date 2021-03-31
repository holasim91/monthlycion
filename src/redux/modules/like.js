import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, realtime } from "../../shared/firebase";
import {actionCreators as postActions} from './post'
import moment from 'moment';

import firebase from 'firebase/app'

const SET_LIKE = "SET_LIKE";
const ADD_LIKE = "ADD_LIKE";
const DELETE_LIKE = 'DELETE_LIKE'

const setLike = createAction(SET_LIKE, (like_post_list) => ({
    like_post_list
  })); 
const addLike = createAction(ADD_LIKE, (post_id) => ({
    post_id
  }));
const deleteLike = createAction(DELETE_LIKE, (post_id) => ({
    post_id
  }));
  
const setLikeFB = (user_id) =>{
    return function(dispatch, getState, {history}){
        const likeDB = firestore.collection('like')
        likeDB.doc(user_id)
        .get()
        .then((docs)=>{
        dispatch(setLike(docs.data().like_posts))
        })
        .catch(e => 
            console.error(e))
    }
}

const deleteLikeFB = (post_id) =>{
    return function(dispatch, getState, {history}){
        const likeDB = firestore.collection('like')
        const _user = getState().user.user;
        const likeRef = likeDB.doc(_user.uid)
        likeRef.update({
            like_posts: firebase.firestore.FieldValue.arrayRemove(`${post_id}`)
        }).then(()=>{
        })
        const postDB = firestore.collection("post");
        const post = getState().post.list.find((l) => l.id === post_id);
        const increment = firebase.firestore.FieldValue.increment(-1);
        postDB
        .doc(post_id)
        .update({ like_cnt: increment })
        .then((_post) => {
            dispatch(deleteLike(post_id))
            if (post) {
                dispatch(
                  postActions.editPost(post_id, {
                    like_cnt: parseInt(post.like_cnt) - 1,
                  })
                );
              }
          });
    }
}
const addLikeFB = (post_id) =>{
    return function(dispatch, getState, {history}){
        const likeDB = firestore.collection('like')
        const user_info = getState().user.user;       

        if(!user_info.uid === null){
          console.log('로그인 해줘잉')
          return
        }
        const likeRef = likeDB.doc(user_info.uid)
        likeRef.update({
            like_posts: firebase.firestore.FieldValue.arrayUnion(`${post_id}`)
        }).then(()=>{
        })
        
        const postDB = firestore.collection("post");
        const post = getState().post.list.find((l) => l.id === post_id);
        const increment = firebase.firestore.FieldValue.increment(1);
        postDB
        .doc(post_id)
        .update({ like_cnt: increment })
        .then((_post) => {
            dispatch(addLike(post_id))
            if (post) {
                dispatch(
                  postActions.editPost(post_id, {
                    like_cnt: parseInt(post.like_cnt) + 1,
                  })
                );
              }
              // 전체를 다 넣는다는 생각으로 만들고, 마지막에 if문으로
              // 시간을 어디서 끌고온담
              const _noti_item = realtime.ref(`noti/${post.user_info.user_id}/list`).push()
              _noti_item.set({
                post_id: post.id,
                user_name:  user_info.name,
                image_url : post.image_url,
                insert_dt: moment().format('YYYY-MM-DD hh:mm:ss')
              }, (err)=>{
                if(err){
                    console.log('알람저장 실패')
                }else{
                  const notiDB = realtime.ref(`noti/${post.user_info.user_id}`)
                  if(post.user_info.user_id === user_info.uid){
                    return
                  }
                  notiDB.update( {read:false})
                }
              })
          });
    }
}

  const initialState = {
    like_posts: []
  };

  export default handleActions(
    {

        [SET_LIKE]: (state, action) =>
        produce(state, draft =>{
            draft.like_posts = action.payload.like_post_list
        }),

        [ADD_LIKE]: (state, action) =>
        produce(state, draft =>{
            draft.like_posts.push(action.payload.post_id)
        }),

        [DELETE_LIKE]: (state, action) =>
        produce(state, draft =>{
            draft.like_posts = draft.like_posts.filter((v) => v  !== action.payload.post_id)
        })
    },initialState)


    const actionCreators = {
        addLike,
        deleteLike,
        setLike,
        addLikeFB,
        deleteLikeFB,
        setLikeFB,
      };
      
      export { actionCreators };
      