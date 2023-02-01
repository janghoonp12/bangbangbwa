import React from "react";
// import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import logosample from '../../assets/logosample.png';
import styled from "styled-components";

const SCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 400px;
  margin-right: 50px;
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
  width: 250px;
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
    const { post, onClick } = props;
    const deleteRecentView = () => {
      
    }

    return (
      <SCardDiv onDoubleClick={onClick}>
        <SCardImg variant="top" src={logosample} alt="이미지" />
        <SCardBodyDiv>
          <SCardTitleP>{post.title}</SCardTitleP>
          <SCardContentP>
            {post.type},
            {post.building_type},
            {post.manage_fee}
          </SCardContentP>
        </SCardBodyDiv>
        <Button variant="danger" onClick={deleteRecentView}>삭제</Button>
      </SCardDiv>
    )
}

export default RecentViewListItem;