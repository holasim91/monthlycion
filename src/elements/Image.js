import React from 'react'
import styled from 'styled-components'

const Image = (props) => {
    const {shape, src, size} = props

    const styles = {
        src: src,
        size: size
    }

    if(shape === 'circle'){
        return(
            <ImageCircle {...styles}>

            </ImageCircle>
        )
    }

    if(shape === 'rectangle'){
    return (
        <AspectOutter>
            <AspectInner {...styles} />
        </AspectOutter>
    )}

    return(
        <>
            <ImageDefault {...styles}/>
        </>
    )
}

Image.defaultProps = {
    shape: 'circle',
    src: 'https://i.pinimg.com/originals/70/98/dd/7098dd7e46ee7b223ce933aa2557ebca.jpg',
    size: 36,

  };

const ImageDefault = styled.div`
    --size: ${(props) => props.size}px;
    width: var(--size);
    height: var(--size);
    background-image: url("${(props) => props.src }");
    background-size: cover; //종횡비 맞춰준다

`
  
const AspectOutter = styled.div`
    width: 100%;
    min-width: 250px;
`

const AspectInner = styled.div`
    position: relative;
    padding-top: 75%; //넓이의 4:3을 맞추기위해
   overflow: hidden; //넘치면 잘라
   background-image: url("${(props)=>props.src}");
   background-size: cover;
`

  const ImageCircle = styled.div`
    --size: ${(props) => props.size}px;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);
    background-image: url("${(props) => props.src }");
    background-size: cover; //종횡비 맞춰준다
    margin: 4px;


  `;
  

export default Image
