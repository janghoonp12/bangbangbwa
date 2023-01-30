import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SDiv = styled.div`
  border: 1px solid black;
  width: 350x;
  height: 300px;
  margin-right: 20px;
  cursor: pointer;
`;

const SImg = styled.img`
  object-fit: cover;
  width: 290px;
  height: 200px;
`;

const SButton = styled.button`
  margin: auto;
  display: block;
  margin-bottom: 5px;
`;

function BookmarkListItem(props) {
  const bookmark = props.post;
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/')
  }

  return (
    <SDiv onClick={onClick}>
      <h3 align="center"><b>{bookmark.title}</b></h3>
      <SButton>삭제</SButton>
      <SImg src={bookmark.img_url} alt="즐겨찾기 이미지" />
      <p align="center">{bookmark.description}</p>
    </SDiv>
  )
}

export default BookmarkListItem;