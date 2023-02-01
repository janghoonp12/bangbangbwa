import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SDiv = styled.div`
  border: 1px solid gold;
  width: 350x;
  height: 350px;
  margin-right: 20px;
  border-radius: 5px;
`;

const SImg = styled.img`
  object-fit: cover;
  width: 290px;
  height: 200px;
  cursor: pointer;
`;

const SButton = styled.button`
  margin: auto;
  display: block;
  float: right;
  margin-right: 10px;
  margin-bottom: 10px;
  width: 60px;
  height: 30px;
  border-radius: 5px;
  background-color: white;
  color: black;
  border: 0.5px solid lightgrey;

  :hover {
    border: 1px solid black;
  }
`;

const SP = styled.p`
  margin-top: 10px;
  text-align: center;
`;


function BookmarkListItem(props) {
  const bookmark = props.post;
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/')
  }
  const deleteBookmaark = () => {
    if (window.confirm(`${bookmark.title}을 삭제하시겠습니까?`)) {
      alert("삭제되었습니다.");
    }
  };

  return (
    <SDiv>
      <div>
        <h3 align="center"><b>{bookmark.title}</b></h3>
      </div>
      <div>
        <SButton onClick={deleteBookmaark}>삭제</SButton>
      </div>
      <div>
        <SImg onClick={onClick} src={bookmark.img_url} alt="즐겨찾기 이미지" />
      </div>
      <div>
        <SP>{bookmark.description}</SP>
      </div>
    </SDiv>
  )
}

export default BookmarkListItem;