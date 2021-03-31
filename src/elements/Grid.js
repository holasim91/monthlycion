import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const { is_flex, width, padding, margin, background,center, _onClick, border, border_bottom,  hover, children } = props;

  const styles = {
      is_flex: is_flex,
      width: width,
      padding: padding,
      margin: margin,
      background: background,
      center:center,
      border: border,
      border_bottom : border_bottom,
      hover:hover
  }
  return (
    <>
      <GridBox {...styles} onClick={_onClick}>{children}</GridBox>
    </>
  );
};

Grid.defaultProps = {
  children: null,
  is_flex: false,
  width: "100%",
  padding: false,
  margin: false,
  background: false,
  center:false,
  _onClick: ()=>{},
  border: false,
  border_bottom:false,
  hover: false
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box; //구글링해봐잉
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) =>
    props.background ? `background-color: ${props.background};` : ""}
  ${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: space-between;`
      : ""}
  ${(props)=> props.center ? `text-align: center;` : ''}    
  ${(props)=> props.border ? `border: 1px solid #ccc ;` : ''}    
  ${(props)=> props.border_bottom ? `border-bottom: 1px solid #ccc ;` : ''}    
  ${(props)=> props.hover ? `&:hover{border: 2px solid #5f939a};` : ''}    

  
`;
export default Grid;
