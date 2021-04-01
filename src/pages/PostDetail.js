import React, { useEffect } from "react";
import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
const PostDetail = (props) => {
  const id = props.match.params.id;
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user);
  const post_list = useSelector((state) => state.post.list);
  const post_idx = post_list.findIndex((p) => p.id === id);
  const post = post_list[post_idx];

  useEffect(() => {
    if (post) {
      return;
    }
    dispatch(postActions.getOnePostFB(id));
  }, []);

  return (
    <>
      {post && (
        <Post {...post} is_me={post.user_info.user_id === user_info?.uid} />
      )}
    </>
  );
};

export default PostDetail;
