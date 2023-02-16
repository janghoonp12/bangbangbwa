import React from "react";
import sample from '../../assets/logosample.png';
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { searchDetailItemAsync } from "../../reducers/itemSlice"


const SCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 400px;
  margin-left: 25px;
  margin-right: 25px;
  margin-bottom: 0px;
  border: 1px solid grey;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
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
  :hover {
    filter: brightness(0.9);
  }
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

const SButton = styled.button`
  width: 250px;
  height: 40px;
  margin-left: 25px;
  margin-right: 25px;
  margin-bottom: 30px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  color: black;
  border: 0.5px solid lightgrey;
  :hover {
    border: 1px solid black;
  }
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


function RecentViewListItem(props) {
  console.log(props)
  const dispatch = useDispatch();
  
  const onClick = () => {
    dispatch(searchDetailItemAsync(props.posts.item_id))
  }

  return (
    <div>
      <SCardDiv onClick={onClick}>
        <SCardImg variant="top" src={sample} alt="이미지" />
        <SCardBodyDiv>
          <SCardTitleP>{props.posts.item_title}</SCardTitleP>
          <SCardContentP>
            {props.posts.item_type},
            {props.posts.item_building_type},
            {props.posts.item_manage_fee}
          </SCardContentP>
        </SCardBodyDiv>
      </SCardDiv>
    </div>
  )
}

export default RecentViewListItem;