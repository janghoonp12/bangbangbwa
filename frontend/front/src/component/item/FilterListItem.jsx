import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { searchDetailItemAsync } from "../../reducers/itemSlice"
import logosample from "../../assets/logosample.png"


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
function FilterListItem(props) {

  const item = props.item.item
  const prices = item.itemPrice
  console.log(item)

  const dealType = (item.item_deal_type === 0) ? '월세' : (item.item_deal_type === 1) ? '전세' : '매매'
  const itemType = (item.item_type === 0) ? '원룸' : (item.item_type === 1) ? '투,쓰리룸' : (item.item_type === 2) ? '오피스텔' : '아파트'
  const price = (
    (dealType === '월세') ? `${prices.item_price_month_deposit}/${prices.item_price_month_rent}` : 
    (dealType === '전세') ? prices.item_price_house_deposit : prices.item_price_buy_house
  )

  const dispatch = useDispatch();
  
  const onClick = () => {
    dispatch(searchDetailItemAsync(item.item_id))
  }
  
  return (
      <SCardDiv onDoubleClick={onClick}>
        <SCardImg variant="top" src={logosample} alt="이미지" />
        <SCardBodyDiv>
          {item ? <SCardTitleP>{item.item_title}</SCardTitleP> : null }
          {item ?
          <SCardContentP>
            {itemType}&nbsp;|&nbsp;
            {dealType}&nbsp;|&nbsp;
            {price}
          </SCardContentP> : null }
        </SCardBodyDiv>
      </SCardDiv>
    )
}

export default FilterListItem;