import React, { useEffect } from "react";
// import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react"; 
import styled from "styled-components";
import throttle from "../../utils/Throttle"
import { useDispatch, useSelector } from 'react-redux';
import { searchDetailItemAsync, clearSearchDetailItemDone } from "../../reducers/itemSlice"


const SCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 400px;
  margin-left: 25px;
  margin-right: 25px;
  margin-bottom: 0px;
  border: 1px solid grey;
  border-radius: 8px;
  cursor: pointer;
  background: white;
  :hover {
    background: lightgrey;
  }
  text-align: center;
`;


const SCardImg = styled.img`
  width: 248px;
  height: 250px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const SCardBodyDiv = styled.div`
  // width: 100%;
`;

const SCardTitleP = styled.p`
  margin-top: 10px;
  font-size: 30px;
`;

const SCardContentP = styled.p`
  font-size: 20px;
`;

// TitleText를 이용해서 props로 받은 post객체내의 title문자열을 표시해준다
function ItemListItem(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { searchDetailItemDone } = useSelector((state) => state.itemSlice);

  useEffect(() => {
    if (searchDetailItemDone) {
      dispatch(clearSearchDetailItemDone())
      navigate(`/items/${props.posts.item.item_id}`)
    }
  })
  const onClick = () => {
    dispatch(searchDetailItemAsync(props.posts.item.item_id))
  }
  
  return (
      <SCardDiv onDoubleClick={onClick}>
        <SCardImg variant="top" src="logo512.png" alt="이미지" />
        <SCardBodyDiv>
          <SCardTitleP>{props.posts.item.item_title}</SCardTitleP>
          <SCardContentP>
            {props.posts.item.item_type},
            {props.posts.item_building_type},
            {props.posts.item_manage_fee}
          </SCardContentP>
        </SCardBodyDiv>
      </SCardDiv>
    )
}

export default ItemListItem