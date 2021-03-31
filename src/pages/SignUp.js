import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Grid, Input, Text } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck } from "../shared/common";

const SignUp = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const onChnageEmail = useCallback((e) => setEmail(e.target.value),[])
  const [nickname, setNickname] = useState("");
  const onChnageNickname = useCallback((e) => setNickname(e.target.value),[])
  const [pwd, setPwd] = useState("");
  const onChangePwd = useCallback((e) => setPwd(e.target.value),[])
  const [pwdCheck, setPwdCheck] = useState("");
  const onChangePwdCheck = useCallback((e) => setPwdCheck(e.target.value),[])


  const signup = () => {
    if (email === "" || pwd === "" || nickname === "") {
      window.alert("이메일/패스워드/닉네임을 모두 입력해주세요");
      return;
    }

    if (!emailCheck(email)) {
      window.alert("이메일 형식을 확인 해주세요");
      return;
    }

    if (pwd !== pwdCheck) {
      window.alert("비밀번호를 확안해주세요!");
      return;
    }
    dispatch(userActions.signupFB(email, pwd, nickname));
  window.alert('회원가입 완료!!')
  };

  return (
    <>
      <Grid>
        <Text size="32px" bold>
          회원가입
        </Text>

        <Grid padding="16px 0">
          <Input
            label="이메일"
            placeholder="이메일을 입력해주세요"
            _onChange={onChnageEmail}
          />
        </Grid>

        <Grid padding="16px 0">
          <Input
            label="닉네임"
            placeholder="닉네임를 입력해주세요"
            _onChange={onChnageNickname}
          />
        </Grid>

        <Grid padding="16px 0">
          <Input
            type="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            _onChange={onChangePwd}
          />
        </Grid>

        <Grid padding="16px 0">
          <Input
            type="password"
            label="비밀번호 확인"
            placeholder="비밀번호를  다시 입력해주세요"
            _onChange={onChangePwdCheck}
          />
        </Grid>

        <Button text="회원가입" _onClick={signup} />
      </Grid>
    </>
  );
};

export default SignUp;
