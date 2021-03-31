import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";
import { Button, Grid, Image, Input, Text } from "../elements";
import Upload from "../shared/Upload";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

const PostWrite = (props) => {
  const is_login = useSelector((state) => state.user.is_login)
  const preview = useSelector((state)=>state.image.preview)
  const post_list = useSelector((state)=> state.post.list)
  const  dispatch = useDispatch()
  const {history} = props
  const post_id = props.match.params.id 
  const is_edit = post_id ? true: false;
  let _post = is_edit ?  post_list.find((p) => p.id === post_id) : null
  const [contents, setContents] = useState(_post ? _post.contents : '')
  const[layout_type, setLayout_type] = useState('a')
useEffect(()=>{
  if(is_edit && !_post){
    console.log('포스트 정보가 없어요')
    history.goBack()
    return
  }
if(is_edit){
  dispatch(imageActions.setPreview(_post.image_url))
}
},[])
  const changeContents = useCallback((e) => {
    setContents(e.target.value);
  }, []);

  const addPost=() => {dispatch(postActions.addPostFB(contents, layout_type))}
  const editPost = () =>{
    dispatch(postActions.editPostFB(post_id, {contents: contents}))
  }

  if(!is_login){
    return(
    <Grid margin='100px 0' padding='16px' center>
      <Text size='32px'>잠깐!</Text>
      <Text size='16px'>로그인을 하고 오너라 애송이</Text>
      <Button _onClick={()=>{history.replace('/login')}}>로그인하러가기</Button>
    </Grid>)
  }
  return (
    <>
      <Grid padding="16px">
        <Text margin="0" size="36px" bold>
          {is_edit ? "게시글 수정" : " 게시글 작성"}
        </Text>
        <Upload />
      </Grid>
      <Grid>
        <Grid padding="16px">
          <Text size="24px" margin="0"></Text>
        </Grid>

        <Image
          shape="rectangle"
          src={preview ? preview : "http://via.placeholder.com/400x300"}
        />

        <Grid padding="16px">
          <Input
            label="게시글 내용"
            placeholder="게시글 작성"
            multiLine
            _onChange={changeContents}
            value={contents}
          />
        </Grid>
        <Grid padding="16px">
          <FormLabel>레이이아웃 선택 </FormLabel>
          <RadioGroup row value={layout_type} onChange={(e)=>setLayout_type(e.target.value)}>
          <FormControlLabel value="a" control={<Radio />} label="A" />
          <FormControlLabel value="b" control={<Radio />} label="B" />
          <FormControlLabel value="c" control={<Radio />} label="C" />
          </RadioGroup>
        </Grid>
        <Grid padding="16px">
          {is_edit ? (
              <Grid is_flex>
            <Button text="게시글 수정" _onClick={editPost} />
            <Button text="취소" _onClick={()=>history.push('/')} />
            </Grid>
          ) : (
              <Grid is_flex>
            <Button text="게시글 작성" _onClick={addPost} />
            <Button text="취소" _onClick={()=>history.push('/')} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
};

PostWrite.defaultProps = {};
export default PostWrite;
