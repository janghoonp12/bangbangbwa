import React from "react";
import { useRef, useState } from "react";
import styled from "styled-components";
import HotBroadcastListItem from "./HotBroadcastListItem";
import throttle from "../../utils/Throttle"

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin-top: 30px;
    align-items: flex-start;
    white-space: nowrap;
    flex-wrap: nowrap;
    overflow-x: auto;
    // border: 1px solid grey;
    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
    &::-webkit-scrollbar {
      display: none;
    }
`;

function HotBroadcastList({ children }) {
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


    return (
      <Wrapper
        onMouseDown={onDragStart}
        onMouseMove={isDrag ? onThrottleDragMove : null}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        ref={scrollRef}
      >
        {children}
      </Wrapper>
    );
}

export default HotBroadcastList;