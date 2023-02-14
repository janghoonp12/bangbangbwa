import React from "react";
import styled from "styled-components";
import itemImage from "../../assets/logo.png"

const Wrapper = styled.div`
  width: calc(100% - 32px);
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  // justify-content: center;
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

const SItemImg = styled.img`
  height: 100px;
  width: 100px;
`;

const STextDiv = styled.div`
  text-align: left;
  margin-top: 15px;
  margin-left: 20px;
`;

// TitleText를 이용해서 props로 받은 post객체내의 title문자열을 표시해준다
function PostListItem(props) {
  const { post, onClick } = props;
  return (
    <Wrapper onClick={onClick}>
      <div>
        <SItemImg src={itemImage} alt="이미지샘플"/>
      </div>
      <STextDiv>
        <STitleTextP>{props.post.item.item_title}</STitleTextP>
        <SContentDiv>
          <SContentTextP>{props.post.item.item_type}</SContentTextP>
          <SContentTextP>{props.post.item.item_building_type}</SContentTextP>
          <SContentTextP>{props.post.item.item_manage_fee}</SContentTextP>
        </SContentDiv>
      </STextDiv>
      
    </Wrapper>
  );
}

export default PostListItem