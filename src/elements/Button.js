import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { text, _onClick, is_float, children, margin, width, padding } = props;

  if (is_float) {
    return (
      <FloatButton  onClick={_onClick}>{text ? text : children}</FloatButton>
    );
  }

const styles = {
  margin:margin,
  width: width,
  padding: padding,
}

  return (
    <>
      <ElButton {...styles} onClick={_onClick}>{text ? text : children}</ElButton>
    </>
  );
};

const ElButton = styled.button`
  width: ${(props) => props.width};
  background-color: #212121;
  color: #fff;
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border: none;
  ${(props) => (props.margin? `margin:${props.margin}`:'')}
  &:hover{
    background-color:#ccc;
    color: #212121
  }
`;

const FloatButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: #212121;
  color: #fff;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  bottom: 50px;
  right: 16px;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 50px;
  &:hover{
    background-color:#ccc;
    color: #212121
  }

`;

Button.defaultProps = {
  text: false,
  children: null,
  _onClick: () => {},
  is_float: false,
  margin:false,
  width: '100%',
  padding: '12px 0',
};

export default Button;
