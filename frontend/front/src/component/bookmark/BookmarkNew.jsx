import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom/dist";
import Button from "../common/ui/Button";


const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Container = styled.div`
  // display: flex;
  width: 100%;
  max-width: 70%;
  margin-top: 5%;
  margin-bottom: 5%;
`;

const SGridDiv = styled.div`
  display: grid;
  grid-template-columns: 0.25fr 0.75fr;
`;


const SSelect = styled.select`
  width: 200px;
  height: 40px;

  :invalid {
    color: red;
  }
`;

const STitleP = styled.p`
  margin-bottom: 0px;
  display: flex;
  align-items: center;
  font-size: 20px;
`;

const SP = styled.p`
  margin-bottom: 0px;
`;

const SGridListDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

function BookmarkNew() {
  const navigate = useNavigate();
  
  // 매물 종류
  const [roomType, setRoomType] = useState('');
  const roomTypeChange = (value, e) => {
    if (!roomType) {
      setRoomType(value)
    } else if (roomType === value) {
      setRoomType('')
    }
  }

  // 거래 종류
  const [dealType, setDealType] = useState('');
  const dealTypeChange = (value, e) => {
    if (!dealType) {
      setDealType(value)
    } else if (dealType === value) {
      setDealType('')
    }
  }

  // 사용 승인일
  const [buildMinYear, setBuildMinYear] = useState();
  const minDateChange = (e) => {
    const year = e.target.value[0] + e.target.value[1] + e.target.value[2] + e.target.value[3]
    setBuildMinYear(year)
  }
  const [buildMaxYear, setBuildMaxYear] = useState();
  const maxDateChange = (e) => {
    const year = e.target.value[0] + e.target.value[1] + e.target.value[2] + e.target.value[3]
    setBuildMaxYear(year)
  }

  // 가격
  const [minPrice, setMinPrice] = useState();
  const minPriceChange = (e) => {
    setMinPrice(parseInt(e.target.value))
  }
  const [maxPrice, setMaxPrice] = useState();
  const maxPriceChange = (e) => {
    setMaxPrice(parseInt(e.target.value))
  }

  // 면적
  const [minArea, setMinArea] = useState();
  const minAreaChange = (e) => {
    setMinArea(parseFloat(e.target.value))
  }
  const [maxArea, setMaxArea] = useState();
  const maxAreaChange = (e) => {
    setMaxArea(parseFloat(e.target.value))
  }

  // 별명
  const [title, setTitle] = useState();
  const titleChange = (e) => {
    setTitle(e.target.value)
  }

  // 설명
  const [comment, setComment] = useState();
  const commentChange = (e) => {
    setComment(e.target.value)
  }

  const createBookmark = () => {

    const data = {
      'bookmark_title': title,
      'bookmark_comment': comment,
      'bookmark_item_type': dealType-1,
      'bookmark_building_type': roomType-1,
      'bookmark_min_area': minArea,
      'bookmark_max_area': maxArea,
      'bookmark_item_build_min_year': buildMinYear,
      'bookmark_item_build_max_year': buildMaxYear,
      'dongCode': "string",
      'bookmark_item_min_price': minPrice,
      'bookmark_item_max_price': maxPrice
    }

    axios.post('/user/bookmarks/new', data, {
      headers: {
        "X-AUTH-TOKEN" : sessionStorage.getItem("access-token")
      }
    })
    .then(response => {
      console.log(response);
      navigate('/interests/bookmarks')
    })
    .catch(error => {
      console.error(error);
    })
  }

  return (
    <Wrapper>
      <Container>
        <h1>즐겨찾기 등록</h1>
        <SGridDiv style={{marginTop: "5%"}}>
          <STitleP>별명</STitleP>
          <input onChange={titleChange} placeholder=" 제목을 입력하세요." />
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>상세 설명</STitleP>
          <textarea onChange={commentChange} rows="5" placeholder=" 내용을 입력하세요." />
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>거래 종류</STitleP>
          <SGridListDiv>
            <SP><input type="checkbox" onClick={(e) => dealTypeChange('1', e)} disabled={(dealType === '1' || !dealType) ? false : true}/> 월세</SP>
            <SP><input type="checkbox" onClick={(e) => dealTypeChange('2', e)} disabled={(dealType === '2' || !dealType) ? false : true}/> 전세</SP>
            <SP><input type="checkbox" onClick={(e) => dealTypeChange('3', e)} disabled={(dealType === '3' || !dealType) ? false : true}/> 매매</SP>
          </SGridListDiv>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>매물 종류</STitleP>
          <SGridListDiv>
            <SP><input type="checkbox" onClick={(e) => roomTypeChange('1', e)} disabled={(roomType === '1' || !roomType) ? false : true} /> 원룸</SP>
            <SP><input type="checkbox" onClick={(e) => roomTypeChange('2', e)} disabled={(roomType === '2' || !roomType) ? false : true} /> 투,쓰리룸</SP>
            <SP><input type="checkbox" onClick={(e) => roomTypeChange('3', e)} disabled={(roomType === '3' || !roomType) ? false : true} /> 오피스텔</SP>
            <SP><input type="checkbox" onClick={(e) => roomTypeChange('4', e)} disabled={(roomType === '4' || !roomType) ? false : true} /> 아파트</SP>
          </SGridListDiv>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>면적</STitleP>
            <SGridListDiv>
              <input onChange={minAreaChange} placeholder=" 00" min="0" type="number"/> &nbsp; 제곱미터 이상
              <input onChange={maxAreaChange} placeholder=" 00" min="0" type="number"/> &nbsp; 제곱미터 이하
            </SGridListDiv>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>가격</STitleP>
            <SGridListDiv>
              <input onChange={minPriceChange} placeholder=" 00" min="0" step="100" type="number"/> &nbsp; 만원 이상
              <input onChange={maxPriceChange} placeholder=" 00" min="0" step="100" type="number"/> &nbsp; 만원 이하
            </SGridListDiv>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>사용 승인일</STitleP>
            <SGridListDiv>
              <input onChange={minDateChange} type="date"/> &nbsp; 부터
              <input onChange={maxDateChange} type="date"/> &nbsp; 까지
            </SGridListDiv>
        </SGridDiv>
        <hr />
        <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
          <Button
            title="등록하기"
            onClick={createBookmark}
            />
        </div>
      </Container>
    </Wrapper>
  )
}

export default BookmarkNew;