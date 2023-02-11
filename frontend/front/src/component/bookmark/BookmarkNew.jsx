import React, { useState, useEffect } from "react";
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

const SSelect = styled.select`
  margin-right: 10px;
`;

function BookmarkNew() {
  // 시도 고르기
  const [sidoAll, setSidoAll] = useState('')
  const [sido, setSido] = useState('')
  const sidoSelect = (e) => {
    setSido(e.target.value)
    axios.get(`/items/gugun/${e.target.value}`)
    .then(res => {
      setGugunAll(res.data)
      console.log(sido)
    })
    .catch(err => {
      alert('지역 정보를 받아오는데 실패하였습니다.')
      console.log(err)
    })
  };

  // 구군 고르기
  const [gugunAll, setGugunAll] = useState('')
  const [gugun, setGugun] = useState('')
  const gugunSelect = (e) => {
    setGugun(e.target.value)
    axios.get(`/items/dong/${e.target.value}`)
    .then(res => {
      setDongAll(res.data)
      console.log(gugun)
    })
    .catch(err => {
      alert('지역 정보를 받아오는데 실패하였습니다.')
      console.log(err)
    })
  };

  // 동 고르기
  const [dongAll, setDongAll] = useState('')
  const [dong, setDong] = useState('')
  const dongSelect = (e) => {
    setDong(e.target.value)
  };


  const navigate = useNavigate();
  // 페이지 렌더링 시 axios 요청해서 시도 코드 받아오기
  const getData = async () => {
    const res = await axios.get('/items/sido')
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })

    setSidoAll(res);
  };

  useEffect(() => {
    getData();
  }, []);

  
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
  const [monthMinPrice, setMonthMinPrice] = useState();
  const monthMinPriceChange = (e) => {
    setMonthMinPrice(parseInt(e.target.value))
  }
  const [monthMaxPrice, setMonthMaxPrice] = useState();
  const monthMaxPriceChange = (e) => {
    setMonthMaxPrice(parseInt(e.target.value))
  }
  const [minDeposit, setMinDeposit] = useState();
  const minDepositChange = (e) => {
    setMinDeposit(parseInt(e.target.value))
  }
  const [maxDeposit, setMaxDeposit] = useState();
  const maxDepositChange = (e) => {
    setMaxDeposit(parseInt(e.target.value))
  }
  const [minBuyPrice, setMinBuyPrice] = useState();
  const minBuyPriceChange = (e) => {
    setMinBuyPrice(parseInt(e.target.value))
  }
  const [maxBuyPrice, setMaxBuyPrice] = useState();
  const maxBuyPriceChange = (e) => {
    setMaxBuyPrice(parseInt(e.target.value))
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

    // const data = {
    //   'bookmarkTitle': title,
    //   'bookmarkComment': comment,
    //   'bookmarkItemType': dealType-1,
    //   'bookmarkBuildingType': roomType-1,
    //   'bookmarkMinArea': minArea,
    //   'bookmarkMaxArea': maxArea,
    //   'bookmarkItemBuildMinYear': buildMinYear,
    //   'bookmarkItemBuildMaxYear': buildMaxYear,
    //   'dongCode': dong,
    //   'bookmarkItemMonthMinPrice': (dealType === '1') ? monthMinPrice : null,
    //   'bookmarkItemMonthMaxPrice': (dealType === '1') ? monthMaxPrice : null,
    //   'bookmarkItemMinDeposit': (dealType === '1' || dealType === '2') ? minDeposit : null,
    //   'bookmarkItemMaxDeposit': (dealType === '1' || dealType === '2') ? maxDeposit : null,
    //   'bookmarkItemBuyMinPrice': (dealType === '3') ? minBuyPrice : null,
    //   'bookmarkItemBuyMaxPrice': (dealType === '3') ? maxBuyPrice : null
    // }
    const data = {
      'bookmark_title': title,
      'bookmark_comment': comment,
      'bookmark_item_type': dealType-1,
      'bookmark_building_type': roomType-1,
      'bookmark_min_area': minArea,
      'bookmark_max_area': maxArea,
      'bookmark_item_build_min_year': buildMinYear,
      'bookmark_item_build_max_year': buildMaxYear,
      'dongCode': dong,
      'bookmark_item_month_min_price': (dealType === '1') ? monthMinPrice : null,
      'bookmark_item_month_max_price': (dealType === '1') ? monthMaxPrice : null,
      'bookmark_item_min_deposit': (dealType === '1' || dealType === '2') ? minDeposit : null,
      'bookmark_item_max_deposit': (dealType === '1' || dealType === '2') ? maxDeposit : null,
      'bookmark_item_buy_min_price': (dealType === '3') ? minBuyPrice : null,
      'bookmark_item_buy_max_price': (dealType === '3') ? maxBuyPrice : null
    }

    console.log(data)

    const accessToken = sessionStorage.getItem("access-token");

    axios.post('/user/bookmarks/new', data, {
      headers: {
        "X-AUTH-TOKEN" : `Bearer ${accessToken}`
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
          <STitleP>지역</STitleP>
          <SGridListDiv>
            <SSelect onChange={sidoSelect}>
              {(sidoAll) ? sidoAll.map((sido, index) => {
                return (
                  <option key={sido.sidoCode} value={sido.sidoCode}>{sido.sidoName}</option>
                )
              }) : null}
            </SSelect>
            <SSelect onChange={gugunSelect}>
              {(gugunAll) ? gugunAll.map((gugun, index) => {
                return (
                  <option key={gugun.gugunCode} value={gugun.gugunCode}>{gugun.gugunName}</option>
                )
              }) : null}
            </SSelect>
            <SSelect onChange={dongSelect}>
              {(dongAll) ? dongAll.map((dong, index) => {
                return (
                  <option key={dong.dongCode} value={dong.dongCode}>{dong.dongName}</option>
                )
              }) : null}
            </SSelect>
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
          <STitleP>보증금/전세가</STitleP>
          <div>
            <input onChange={minDepositChange} type="number" min="0" step="100" placeholder=" 000" style={{width: '100px'}} disabled={(dealType === '1' || dealType === '2') ? false : true} />&nbsp;만원부터
            <input onChange={maxDepositChange} type="number" min="0" step="100" placeholder=" 000" style={{width: '100px'}} disabled={(dealType === '1' || dealType === '2') ? false : true} />&nbsp;만원까지
          </div>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>월세</STitleP>
          <div>
            <input onChange={monthMinPriceChange} type="number" min="0" step="10" placeholder=" 00" style={{width: '100px'}} disabled={(dealType === '1') ? false : true} />&nbsp;만원부터
            <input onChange={monthMaxPriceChange} type="number" min="0" step="10" placeholder=" 00" style={{width: '100px'}} disabled={(dealType === '1') ? false : true} />&nbsp;만원까지
          </div>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>매매가</STitleP>
          <div>
            <input onChange={minBuyPriceChange}  type="number" min="0" step="1000" placeholder=" 0000" style={{width: '100px'}} disabled={(dealType === '3') ? false : true} />&nbsp;만원부터
            <input onChange={maxBuyPriceChange}  type="number" min="0" step="1000" placeholder=" 0000" style={{width: '100px'}} disabled={(dealType === '3') ? false : true} />&nbsp;만원까지
          </div>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>사용 승인일</STitleP>
            <SGridListDiv>
              <input onChange={minDateChange} type="month"/> &nbsp; 부터
              <input onChange={maxDateChange} type="month"/> &nbsp; 까지
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