import React from "react";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
    ${(props) =>
        props.height && `height: ${props.height}px;`
    }
    padding: 25px;
    font-size: 16px;
    line-height: 100%;
    height: 100%;
`;

/*
TextInput의 props
높이설정을 위한 height
입력된 값을 표시하기 위한 value
변경된 값을 상위 컴포넌트로 전달하기 위한 onChange
*/
function TextInput(props) {
    const {height, value, onChange } = props;

    return <StyledTextarea height={height} value={value} onChange={onChange} />;
}

export default TextInput;