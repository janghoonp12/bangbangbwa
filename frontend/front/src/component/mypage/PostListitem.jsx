import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: calc(100% - 32px);
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border: 1px solid grey;
    border-radius: 8px;
    cursor: pointer;
    background: white;
    :hover {
        background: lightgrey;
    }
`;

const TitleText = styled.p`
    font-size: 20px;
    font-weight: 500;
    justify-content: center;
    align-items: center;
`;

const ContentDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const ContentText = styled.p`
    display: flex;
    font-size: 15px;
    margin-right: 20px;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

// TitleText를 이용해서 props로 받은 post객체내의 title문자열을 표시해준다
function PostListItem(props) {
    const { post, onClick } = props;

    return (
        <Wrapper onClick={onClick}>
            <TitleText>{post.title}</TitleText>
            <ContentDiv>
                <ContentText>{post.type}</ContentText>
                <ContentText>{post.building_type}</ContentText>
                <ContentText>{post.manage_fee}</ContentText>
            </ContentDiv>

        </Wrapper>
    );
}

export default PostListItem