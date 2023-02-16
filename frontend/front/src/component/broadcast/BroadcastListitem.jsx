import React from "react";
// import Card from 'react-bootstrap/Card';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { choiceWatchingBroadCast } from "../../reducers/broadcastSlice"
import Swal from "sweetalert2";

const SCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 400px;
  margin-left: 25px;
  margin-right: 5px;
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

function BroadcastListItem(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClick = () => {
    if(props.posts.broadcastStatus === 2) {
      dispatch(choiceWatchingBroadCast(props.posts))
      navigate(`/live/${props.posts.broadcastId}`)
    } else if (props.posts.broadcastStatus === 3) {
      Swal.fire({
        icon: 'error',
        title: '종료된 방송입니다.',
        showConfirmButton: false,
        timer: 2000
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: '시작되지 않은 방송입니다.',
        showConfirmButton: false,
        timer: 2000
      })
    }
  }

  return (
    <SCardDiv onDoubleClick={onClick}>
      <SCardImg variant="top" src={props.posts.imagePath} alt="이미지" />
      <SCardBodyDiv>
        <SCardTitleP>{props.posts.broadcastTitle}</SCardTitleP>
        <SCardContentP>
          {props.posts.broadcastDescription},
        </SCardContentP>
      </SCardBodyDiv>
    </SCardDiv>
  )
}

export default BroadcastListItem;