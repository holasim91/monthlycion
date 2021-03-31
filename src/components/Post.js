import React from "react";
import { Button, Grid, Image, Text } from "../elements";
import { history } from "../redux/configStore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as likeActions } from "../redux/modules/like";

const Post = (props) => {
  const is_login = useSelector((state) => state.user.is_login);
  const like_post = useSelector((state) => state.like.like_posts);
  const dispatch = useDispatch();
  const deletePost = () => {
    window.confirm("정말 삭제하시겠습니까?");
    dispatch(postActions.deletePostFB(props.id));
  };
  return (
    <>
      <Grid border margin="10px 0 20px 0" >
        <Grid is_flex padding="16px">
          <Grid is_flex width="auto">
            <Image src={props.src} shape="circle" />
            <Text bold margin="0">
              {props.user_info.user_name}
            </Text>
          </Grid>
          <Grid is_flex width="auto">
            <Text>{props.insert_dt}</Text>
            {props.is_me && history.location.pathname !== "/" && (
              <>
                <Button
                  padding="4px"
                  width="auto"
                  margin="4px"
                  text="수정"
                  _onClick={() => {
                    history.push(`write/${props.id}`);
                  }}
                />
                <Button
                  padding="4px"
                  width="auto"
                  margin="4px"
                  text="삭제"
                  _onClick={deletePost}
                />
              </>
            )}
          </Grid>
        </Grid>

        {props.layout_type === "a" && (
          <>
            <Grid>
              <Image shape="rectangle" src={props.image_url} />
            </Grid>
            <Grid padding="16px" >
              <Text>{props.contents}</Text>
            </Grid>
          </>
        )}

        {props.layout_type === "b" && (
          <>
            <Grid is_flex>
              <Grid width="50%" padding="16px">
                <Text>{props.contents}</Text>
              </Grid>
              <Image shape="rectangle" src={props.image_url} />
            </Grid>
          </>
        )}

        {props.layout_type === "c" && (
          <>
            <Grid is_flex>
              <Image shape="rectangle" src={props.image_url} />
              <Grid width="50%" padding="16px">
                <Text>{props.contents}</Text>
              </Grid>
            </Grid>
          </>
        )}

        <Grid padding="16px" is_flex>
          <Text bold margin="0">
            좋아요 {props.like_cnt}개
          </Text>
          {history.location.pathname==='/'?
          ''
          :(
          <>
          {
          like_post.findIndex((p) => p === props.id) >= 0 ? (
            <FavoriteIcon
              color="secondary"
              onClick={() => {
                is_login?
                dispatch(likeActions.deleteLikeFB(props.id))
                :window.alert('로그인을 해주세요')
              }}
            />
          ) : (
            <FavoriteIcon
              color="disabled"
              cursor='pointer'
              onClick={() => {
                is_login?
                dispatch(likeActions.addLikeFB(props.id))
                 :window.alert('로그인을 해주세요');
                 history.push('/login')
              }}
            />
          )}
          </>)}
        </Grid>
      </Grid>
    </>
  );
};

Post.defaultProps = {
  user_info: {
    user_name: "default_user",
    user_profile:
      "https://i.pinimg.com/originals/70/98/dd/7098dd7e46ee7b223ce933aa2557ebca.jpg",
    like_posts: [],
  },
  image_url:
    "https://firebasestorage.googleapis.com/v0/b/image-community-3fdad.appspot.com/o/images%2F6EA2E1C6-79DC-4D05-8231-729104F8CB34.jpeg?alt=media&token=de2ace18-7643-43e5-9746-018c0cd9afcb",
  contents: "숑이랑 방구 안녕!",
  like_cnt: 0,
  insert_dt: "2021-03-26 16:21:00",
  is_me: false,
};

export default Post;
