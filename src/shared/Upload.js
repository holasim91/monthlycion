import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";

const Upload = (props) => {
  const dispatch = useDispatch()
  const fileInput = useRef();
  const is_uploading = useSelector((state) => state.image.uploading)
  const selectFile = (e) => {
    console.log(e);
    console.log(e.target);
    console.log(e.target.files);

    console.log(fileInput.current.files[0]);

    const reader =new FileReader()
    const file = fileInput.current.files[0]
    reader.readAsDataURL(file)
    reader.onloadend = () =>{
      console.log(reader.result)
      dispatch(imageActions.setPreview(reader.result))
    }
  };

  return (
    <>
      <input type="file" onChange={selectFile} ref={fileInput} disabled={is_uploading} />
    </>
  );
};

Upload.defaultProps = {};

export default Upload;
