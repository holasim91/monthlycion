import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Grid, Input, Text } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck } from "../shared/common";

const SignUp = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");


  const signup = () => {
    if (email === "" || pwd === "" || nickname === "") {
      window.alert("아이디/패스워드/닉네임을 모두 입력해주세요");
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
            label="아이디"
            placeholder="아이디를 입력해주세요"
            _onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>

        <Grid padding="16px 0">
          <Input
            label="닉네임"
            placeholder="닉네임를 입력해주세요"
            _onChange={(e) => setNickname(e.target.value)}
          />
        </Grid>

        <Grid padding="16px 0">
          <Input
            type="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            _onChange={(e) => setPwd(e.target.value)}
          />
        </Grid>

        <Grid padding="16px 0">
          <Input
            type="password"
            label="비밀번호 확인"
            placeholder="비밀번호를  다시 입력해주세요"
            _onChange={(e) => setPwdCheck(e.target.value)}
          />
        </Grid>

        <Button text="회원가입" _onClick={signup} />
      </Grid>
    </>
  );
};

export default SignUp;
