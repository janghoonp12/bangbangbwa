import React from "react";
import styled from "styled-components";

// btn태그에 스타일을 입힌 StyledButton태그 생성
const StyledButton = styled.button`
    padding: 8px 16px;
    font-size: 16px;
    border-width: 1px;
    border-radius: 8px;
    cursor: pointer;

    :hover {
        background-color: lightgrey;
    }
`;

// Button컴포넌트에서 props로 받은 title이 버튼 목록에 표시되도록 함
// props로 받은 onClick은 StyledButton에 onClick으로 넣어줌으로써 상위 component에서 받을 수 있도록 함
function Button(props) {
    const { title, onClick } = props;

    return <StyledButton onClick={onClick}>{title || "button"}</StyledButton>
}

export default Button;