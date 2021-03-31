import React, { useCallback, useState } from "react";
import { Input, Text, Grid, Button } from "../elements";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck } from "../shared/common";

const Login = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('')
  const onChnageEmail = useCallback((e) => setEmail(e.target.value),[])

  const [pwd, setPwd] = useState('')
  const onChangePwd = useCallback((e) => setPwd(e.target.value),[])
  const login = () => {
    if(email===''||pwd===''){
      window.alert(
        '아이디 혹은 비밀번호를 입력해주세요'
      )
      return
    }
    if(!emailCheck(email)){
      window.alert(
        '이메일 형식을 확인 해주세요'
      )
      return ; 
    }
    dispatch(userActions.loginFB(email, pwd))
  };
  // login()
  
  return (
    <>
      <Grid padding="16px">
        <Text size="32px" bold>
          로그인
        </Text>
        <Grid padding="16px 0">
          <Input
            label="아이디"
            placeholder="아이디를 입력해주세요"
            _onChange={onChnageEmail}
          />
        </Grid>
        <Grid padding="16px 0">
          <Input
          type='password'
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            _onChange={onChangePwd}
            value={pwd}
            is_submit
            onSubmit={login}
          />
        </Grid>

        <Button text="로그인하기" _onClick={login} />
      </Grid>
    </>
  );
};

export default Login;
