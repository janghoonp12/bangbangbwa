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

const STitleTextP = styled.p`
  font-size: 20px;
  font-weight: 500;
  justify-content: center;
  align-items: center;
`;

const SContentDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SContentTextP = styled.p`
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
      <STitleTextP>{post.title}</STitleTextP>
      <SContentDiv>
        <SContentTextP>{post.type}</SContentTextP>
        <SContentTextP>{post.building_type}</SContentTextP>
        <SContentTextP>{post.manage_fee}</SContentTextP>
      </SContentDiv>
    </Wrapper>
  );
}

export default PostListItem