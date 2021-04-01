import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Text, Button } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";

import { history } from "../redux/configStore";

import { apiKey } from "../shared/firebase";
import NotiBadge from "./NotiBadge";

const Header = (props) => {
  
  const dispatch = useDispatch();

  const is_login = useSelector((state) => state.user.is_login);
const user_info = useSelector((state) => state.user.user)
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;

  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  if (is_login && is_session) {
    return (
      <>
        <Grid is_flex padding="0 16px">
          <Grid>
            <Text margin="0px" size="24px" bold>
              {`${user_info.name}님! 안녕하세요!!`}
            </Text>
          </Grid>

          <Grid is_flex width='50%'>
            <Button text="홈으로" _onClick={()=>history.push('/')} />
            <NotiBadge _onClick={()=>history.push('/noti')} />
            <Button
              text="로그아웃"
              _onClick={() => dispatch(userActions.logoutFB())}
            />
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid is_flex padding="0 16px">
        <Grid>
          <Text margin="0px" size="24px" bold>
            안녕하세요!!
          </Text>
        </Grid>

        <Grid is_flex>
        <Button text="홈으로" _onClick={()=>history.push('/')} />
          <Button text="로그인" _onClick={() => history.push("/login")} />
          <Button text="회원가입" _onClick={() => history.push("/signup")} />
        </Grid>
      </Grid>
    </>
  );
};
Header.defaultProps = {};

export default Header;
