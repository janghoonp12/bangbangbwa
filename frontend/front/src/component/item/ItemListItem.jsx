import React, { useEffect } from "react";
// import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react"; 
import styled from "styled-components";
import throttle from "../../utils/Throttle"
import { useDispatch, useSelector } from 'react-redux';
import { searchDetailItemAsync, clearSearchDetailItemDone } from "../../reducers/itemSlice"

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin-top: 30px;
    align-items: flex-start;
    justify-content: center;
    white-space: nowrap;
    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
    &::-webkit-scrollbar {
      display: none;
    }
`;

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
    // 좌우 스크롤 움직임은 해당 DOM의 scrollLeft로 움직임
    // 해당 scrollLeft를 얻기 위해 useRef로 DOM에 접근
    const scrollRef = useRef(null);
    const [isDrag, setIsDrag] = useState(false); // 드래그중인지를 알기위한 변수, 기본값은 false
  const [startX, setStartX] = useState(); //
  
  const { searchDetailItemDone } = useSelector((state) => state.itemSlice);

    const onDragStart = (e) => {
      e.preventDefault();
      setIsDrag(true);
      setStartX(e.pageX + scrollRef.current.scrollLeft);
    };

    const onDragEnd = () => {
      setIsDrag(false);
    };
    
    // 최좌측이면 움직이고 있는 마우스의 X좌표가 곧 startX좌표
    // 최우측이면 움직이고 있는 마우스의 X좌표에 현재 스크롤된 길이 scrollLeft를 더해 설정
    const onDragMove = (e) => {
      if (isDrag) {
        const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;

        scrollRef.current.scrollLeft = startX - e.pageX;

        if (scrollLeft === 0) {
          setStartX(e.pageX);
        } else if (scrollWidth <= clientWidth + scrollLeft) {
          setStartX(e.pageX + scrollLeft);
        }
      }
  };
  useEffect(() => {
    if (searchDetailItemDone) {
      dispatch(clearSearchDetailItemDone())
      navigate(`/items/${props.posts.item.item_id}`)
    }
  })
  const onClick = () => {
    dispatch(searchDetailItemAsync(props.posts.item.item_id))
    console.log(searchDetailItemDone)
  }

    const delay = 10;
  const onThrottleDragMove = throttle(onDragMove, delay);
  
  return (
      <Wrapper>
        <SCardDiv onDoubleClick={onClick}
          onMouseDown={onDragStart}
          onMouseMove={isDrag ? onThrottleDragMove : null}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          ref={scrollRef}>
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
      </Wrapper>
    )
}

export default ItemListItem