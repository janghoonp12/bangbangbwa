import React, { useRef, useState } from "react";
import styled from "styled-components";
import InterestAreaListItem from "./InterestAreaListItem";
import data from '../../data.json';
import throttle from "../../utils/Throttle";


const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  overflow-x: auto;
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

const H3 = styled.h3`
 text-align: center;
 padding-top: 20px;
 padding-bottom: 20px;
 padding-left: 20px;
`


const AreaDiv = styled.div`
 background-color: rgba(223, 211, 195, 0.5);
 border-radius: 2em;
 margin-bottom: 100px;
`;

const SButton = styled.button`
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 20px;
  width: 100px;
  height: 40px;
  border-radius: 8px;
  border: 0.5px solid lightgrey;
  background-color: rgba(255, 0, 0, 0.2);
  
  :hover {
    border: 1px solid black;
    background-color: rgba(255, 0, 0, 0.5);
  }
`;

const SHeadDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;



function InterestAreaList(props) {
  const area = props.area

  // 좌우 스크롤 움직임은 해당 DOM의 scrollLeft로 움직임
    // 해당 scrollLeft를 얻기 위해 useRef로 DOM에 접근
    const scrollRef = useRef(null);
    const [isDrag, setIsDrag] = useState(false); // 드래그중인지를 알기위한 변수, 기본값은 false
    const [startX, setStartX] = useState(); // 

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

    const delay = 10;
    const onThrottleDragMove = throttle(onDragMove, delay);

  
  const onClick = () => {
    alert('삭제되었습니다.')
  }


  return (
    <AreaDiv>
      <SHeadDiv>
        <H3>{area.si_name} {area.gugun_name} {area.dong_name}</H3>
        <SButton onClick={onClick}>삭제</SButton>
      </SHeadDiv>
      <Wrapper
        onMouseDown={onDragStart}
        onMouseMove={isDrag ? onThrottleDragMove : null}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        ref={scrollRef}
      >
        {data.map((data, index) => {
          return (
            <InterestAreaListItem
              key={`${area.id}_${data.id}`}
              area={area}
              data={data}
            />
          );
        })}
      </Wrapper>
    </AreaDiv>
  );
}

export default InterestAreaList;