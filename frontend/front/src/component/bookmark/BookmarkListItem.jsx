import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SDiv = styled.div`
  border: 1px solid gold;
  width: 350x;
  height: 350px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 5px;
`;

const SImg = styled.img`
  object-fit: cover;
  width: 290px;
  height: 200px;
  cursor: pointer;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
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

function checkName(name){
  //name의 마지막 음절의 유니코드(UTF-16) 
  const charCode = name.charCodeAt(name.length - 1);

  //유니코드의 한글 범위 내에서 해당 코드의 받침 확인
  const consonantCode = (charCode - 44032) % 28;
  
  if(consonantCode === 0){
      //0이면 받침 없음 -> 를
      return `${name}를`;
  }
  //1이상이면 받침 있음 -> 을
  return `${name}을`;
}



function BookmarkListItem(props) {
  const bookmark = props.post;
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/')
  }
  const deleteBookmaark = () => {
    const josa = checkName(bookmark.title)

    if (window.confirm(`즐겨찾기에서 ${josa} 삭제하시겠습니까?`)) {
      alert("삭제되었습니다.");
    }
  };

  return (
    <SDiv>
      <div>
        <h3 align="center"><b>{bookmark.bookmarkTitle}</b></h3>
      </div>
      <div>
        <SButton onClick={deleteBookmaark}>삭제</SButton>
      </div>
      <div>
        <SImg onClick={onClick} src='/img/bundang.png' alt="즐겨찾기 이미지" />
      </div>
      <div>
        <SP>{bookmark.bookmarkComment}</SP>
      </div>
    </SDiv>
  )
}

export default BookmarkListItem;