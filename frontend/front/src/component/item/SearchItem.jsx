import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { searchDetailItemAsync } from "../../reducers/itemSlice"
import useKakaoMap from "../../hooks/useKakaoMap"


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

const SImgDiv = styled.div`
  width: 248px;
  height: 250px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
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
  font-size: 1.5rem;
`;

const SCardContentP = styled.p`
  font-size: 1.2rem;
`;

// TitleText를 이용해서 props로 받은 post객체내의 title문자열을 표시해준다
function SearchItem(props) {

  const item = props.item
  const prices = item.itemPrice

  const dealType = (item.item_deal_type === 0) ? '월세' : (item.item_deal_type === 1) ? '전세' : '매매'
  const itemType = (item.item_type === 0) ? '원룸' : (item.item_type === 1) ? '투,쓰리룸' : (item.item_type === 2) ? '오피스텔' : '아파트'
  const price = (prices) ? (
    (dealType === '월세') ? `${prices.item_price_month_deposit}/${prices.item_price_month_rent}` : 
    (dealType === '전세') ? prices.item_price_house_deposit : (dealType === '매매 ') ? prices.item_price_buy_house : '가격 문의'
  ) : '가격 문의'

  useKakaoMap(props);

  const dispatch = useDispatch();

  const imgClick = (e) => {
    e.preventDefault();
  }
  const onClick = () => {
    dispatch(searchDetailItemAsync(item.item_id))
  }
  console.log(item)
  return (
      <SCardDiv onDoubleClick={onClick}>
        <SImgDiv onDoubleClick={onClick} onClick={imgClick} id={item.item_id}> </SImgDiv>
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

export default SearchItem;