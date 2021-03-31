import React from "react";
import styled from "styled-components";
import { Text, Grid } from ".";

const Input = (props) => {
  const { type, label, placeholder, _onChange, multiLine, is_submit, value, onSubmit } = props;

  if (multiLine) {
    return (
      <Grid>
        {label  && <Text margin="0">{label}</Text>}
        <ElTextArea rows={10} placeholder={placeholder} onChange={_onChange} value={value} />
      </Grid>
    );
  }

  return (
    <>
      <Grid>
        {label && <Text margin="0">{label}</Text>}
        {is_submit ? (
          <ElInput
            type={type}
            placeholder={placeholder}
            onChange={_onChange}
            value={value}
            onKeyPress={(e) => {
              if(e.key === "Enter"){
                onSubmit(e);
              }
            }}
          />
        ) : (
          <ElInput type={type} placeholder={placeholder} onChange={_onChange} />
        )}
      </Grid>
    </>
  );
};

const ElInput = styled.input`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

const ElTextArea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

Input.defaultProps = {
  multiLine: false,
  label: false,
  placeholder: "텍스트 입력해줘잉",
  type: "text",
  vaule:"",
  is_submit: false,
  _onChange: () => {},
  onSubmit:() =>{}
};

export default Input;
