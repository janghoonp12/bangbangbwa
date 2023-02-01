import React from "react";
// import Card from 'react-bootstrap/Card'; 
import styled from "styled-components";

const SCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 300px;
  margin-left: 50px;
  border: 1px solid grey;
  border-radius: 8px;
  cursor: pointer;
  background: white;
  :hover {
    background: lightgrey;
  }
`;

const SCardImg = styled.img`
  // width: 100%;
`;

const SCardBodyDiv = styled.div`
  // width: 100%;
`;

const SCardTitleP = styled.p`
  // width: 100%;
`;

const SCardContentP = styled.p`
  // width: 100%;
`;

// TitleText를 이용해서 props로 받은 post객체내의 title문자열을 표시해준다
function ItemListItem(props) {
    const { post, onClick } = props;
    return (
      <SCardDiv onClick={onClick}>
        <SCardImg variant="top" src="logo512.png" alt="이미지" />
        <SCardBodyDiv>
          <SCardTitleP>{post.title}</SCardTitleP>
          <SCardContentP>
            {post.type},
            {post.building_type},
            {post.manage_fee}
          </SCardContentP>
        </SCardBodyDiv>
      </SCardDiv>
    )
}

export default ItemListItem