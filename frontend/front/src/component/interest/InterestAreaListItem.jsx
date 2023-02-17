import React from "react";
import sample from '../../assets/logo.png';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 400px;
  margin-right: 25px;
  margin-left: 25px;
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


function RecentViewListItem(props) {
    const data = props.data;
    const navigate = useNavigate(); 

    const onClick = () => {
      navigate(`/items/${data.id}`)
    }

    return (
      <SCardDiv onDoubleClick={onClick}>
        <SCardImg variant="top" src={sample} alt="이미지" />
        <SCardBodyDiv>
          <SCardTitleP>{data.title}</SCardTitleP>
          <SCardContentP>
            {data.type},
            {data.building_type},
            {data.manage_fee}
          </SCardContentP>
        </SCardBodyDiv>
      </SCardDiv>
    )
}

export default RecentViewListItem;