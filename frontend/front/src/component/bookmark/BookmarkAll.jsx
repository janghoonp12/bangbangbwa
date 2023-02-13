import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom/dist";
import BookmarkList from "./BookmarkList";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { firstSearchBookmarkAsync } from "../../reducers/bookmarkSlice"

const SDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const SH3 = styled.h2`
  text-align: center;
  margin-bottom: 5px;
`;

const SBtnDiv = styled.div`
  padding: 20px;
  margin-right: 50px;
  margin-bottom: 60px;
  text-align: center;
`;

const SButton = styled.button`
  float: right;
  width: 150px;
  height: 50px;
  border-radius: 5px;
  background-color: rgba(180, 191, 240, 0.3);
  font-size: 20px;
  border: 0.5px solid lightgrey;

  :hover {
    border: 1px solid black;
  }
`;

function BookmarkAll() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { bookmarks } = useSelector((state) => state.bookmarkSlice);

  useEffect(() => {
    dispatch(firstSearchBookmarkAsync())
  }, [])

  const onClick = () => {
    navigate('new')
  }
  
  return (
    <div>
      <SH3>즐겨찾기</SH3>
      <SBtnDiv>
        <SButton onClick={onClick}>즐겨찾기 등록</SButton>
      </SBtnDiv>
      <SDiv>
        <br />
        <BookmarkList bookmarks={bookmarks} />
      </SDiv>
    </div>
  )
}

export default BookmarkAll;