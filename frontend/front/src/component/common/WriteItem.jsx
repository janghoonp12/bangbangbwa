import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./ui/Button";
import DaumPostcode from 'react-daum-postcode';


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

const SGridListDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const SP = styled.p`
  margin-bottom: 0px;
`;

const STitleP = styled.p`
  margin-bottom: 0px;
  display: flex;
  align-items: center;
`;

function WriteItem() {
  const navigate = useNavigate();
  // 카카오 주소 검색 API
  const [postCode, setPostCode] = useState('');
  
  // 주소 선택 이벤트
  const selectAddress = (data) => {
    setPostCode(data)
  }

  // 주소 토대로 위도, 경도 반환받는 API 요청
  useEffect(() => {
    if (
      document.querySelector(
        `script[src="/dapi.kakao.com/v2/maps/sdk.js?appkey=29ac58808006227f8e7b1e0d891948e6&libraries=services"]`
      )
    )
      return;

    const script = document.createElement("script");
    script.src = "/dapi.kakao.com/v2/maps/sdk.js?appkey=29ac58808006227f8e7b1e0d891948e6&libraries=services";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  var geocoder = new kakao.maps.services.Geocoder();


  // 직접 입력하는 자료
  const [roomType, setRoomType] = useState('');
  const [dealType, setDealType] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemDetail, setItemDetail] = useState('');
  const roomTypeChange = (value, e) => {
    if (!roomType) {
      setRoomType(value)
    } else if (roomType === value) {
      setRoomType('')
    }
  }
  const dealTypeChange = (value, e) => {
    if (!dealType) {
      setDealType(value)
    } else if (dealType === value) {
      setDealType('')
    }
  }

  const itemNameChange = (e) => {
    setItemName(e.target.value)
  }

  const itemDetailChange = (e) => {
    setItemDetail(e.target.value)
  }


  return (
    <Wrapper>
      <Container>
        <h1>매물 등록</h1>
        <SGridDiv style={{marginTop: "5%"}}>
          <STitleP>매물명</STitleP>
          <textarea rows="2" onChange={itemNameChange} placeholder=" 매물명" />
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>주소</STitleP>
          <div>
          <DaumPostcode
            style={{height: '600px'}}
            onComplete={selectAddress}  // 값을 선택할 경우 실행되는 이벤트
            autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
          />
          <div style={{display: 'flex'}}>
            <input type="text" value={(postCode) ? postCode.address : ''} style={{marginTop: '20px', width: '300px', marginRight: '30px'}} disabled />
            <p style={{marginTop: '20px', marginBottom: '0px', fontSize: '20px', paddingRight: '10px', marginRight: '0px'}}>상세 주소 :</p>
            <input type="text" style={{marginTop: '20px', width: '400px'}} disabled={(!postCode) ? true : false} />
          </div>
          </div>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>매물 상세 설명</STitleP>
          <textarea rows="5" onChange={itemDetailChange} placeholder=" 매물 상세 설명" />
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>방/화장실</STitleP>
          <div>
            방&nbsp;:&nbsp;<input type="number" min="0" placeholder=" 방 수" style={{width: '100px', marginRight: '20px'}} />
            화장실&nbsp;:&nbsp;<input type="number" min="0" placeholder=" 화장실 수" style={{width: '100px'}} />
          </div>
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
          <STitleP>거래 종류</STitleP>
          <SGridListDiv>
            <SP><input type="checkbox" onClick={(e) => dealTypeChange('1', e)} disabled={(dealType === '1' || !dealType) ? false : true}/> 월세</SP>
            <SP><input type="checkbox" onClick={(e) => dealTypeChange('2', e)} disabled={(dealType === '2' || !dealType) ? false : true}/> 전세</SP>
            <SP><input type="checkbox" onClick={(e) => dealTypeChange('3', e)} disabled={(dealType === '3' || !dealType) ? false : true}/> 매매</SP>
          </SGridListDiv>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>보증금/전세가</STitleP>
          <div>
            <input type="number" min="0" step="100" placeholder=" 000" style={{width: '100px'}} disabled={(dealType === '1' || dealType === '2') ? false : true} />&nbsp;만원
          </div>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>월세</STitleP>
          <div>
            <input type="number" min="0" step="10" placeholder=" 00" style={{width: '100px'}} disabled={(dealType === '1') ? false : true} />&nbsp;만원
          </div>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>매매가</STitleP>
          <div>
            <input type="number" min="0" step="1000" placeholder=" 0000" style={{width: '100px'}} disabled={(dealType === '3') ? false : true} />&nbsp;만원
          </div>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>층수</STitleP>
          <div style={{display: 'flex'}}>
            총 층수&nbsp;:&nbsp;<input type="number" min="0" placeholder=" 총 층수" style={{width: '100px', marginRight: '20px'}} />
            해당 층수&nbsp;:&nbsp;<input type="number" min="0" placeholder=" 해당 층수" style={{width: '100px', marginRight: '20px'}} />
            <SP style={{marginRight: '20px'}}><input type="checkbox"/> 지하 여부</SP>
            <SP style={{color: 'red'}}>*지하 여부 체크시, 층수를 '2'로 입력하면 지하 2층으로 입력됩니다.</SP>
          </div>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>사용 승인일</STitleP>
            <input type="date"/>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>추가 옵션</STitleP>
          <SGridListDiv>
            <SP><input type="checkbox"/> 엘리베이터</SP>
            <SP><input type="checkbox"/> 주차</SP>
            <SP><input type="checkbox"/> 복층</SP>
            <SP><input type="checkbox"/> 주방분리형</SP>
            <SP><input type="checkbox"/> 인덕션</SP>
            <SP><input type="checkbox"/> 전자레인지</SP>
            <SP><input type="checkbox"/> 에어컨</SP>
            <SP><input type="checkbox"/> 세탁기</SP>
            <SP><input type="checkbox"/> TV</SP>
            <SP><input type="checkbox"/> 옷장</SP>
            <SP><input type="checkbox"/> 침대</SP>
            <SP><input type="checkbox"/> 책상</SP>
            <SP><input type="checkbox"/> 신발장</SP>
            <SP><input type="checkbox"/> 비데</SP>
            <SP><input type="checkbox"/> 가스레인지</SP>
            <SP><input type="checkbox"/> 냉장고</SP>
            <SP><input type="checkbox"/> 전자도어락</SP>
            <SP><input type="checkbox"/> 베란다/발코니</SP>
          </SGridListDiv>
        </SGridDiv>
        <hr />
        <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
          <Button
            title="등록하기"
            onClick={() => {
              navigate("/items");
            }}
          />
        </div>
      </Container>
    </Wrapper>
  )
}

export default WriteItem;