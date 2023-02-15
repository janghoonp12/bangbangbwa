import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Button from "./ui/Button";
import { useDispatch, useSelector } from 'react-redux';
import { FilterItemAsync, FilterBroadcastAsync, clearFilterItemDone, clearfilterBroadcastDone } from "../../reducers/filterSlice"

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Container = styled.div`
  // display: flex;
  width: 100%;
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

function Filter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // item 필터인지, broadcast 필터인지 확인 후 axios 요청
  const location = useLocation();
  const where = location.pathname


  const filtered = () => {
    const data = {
      "item_build_year": buildYear,
      "item_deal_type": dealType,
      "item_exclusive_area": exclusiveArea,
      "item_floor": floor,
      "item_price_buy_house": (dealType.length && dealType.includes('2')) ? buyPrice : [0, 0],
      "item_price_house_deposit": (dealType.length && dealType.includes('1')) ? deposit : [0, 0],
      "item_price_month_deposit": (dealType.length && dealType.includes('0')) ? monthDeposit : [0, 0],
      "item_price_month_rent": (dealType.length && dealType.includes('0')) ? monthDeposit : [0, 0],
      "item_type": roomType,
      "option": {
        "option_aircon": aircon,
        "option_bed": bed,
        "option_bidet": bidet,
        "option_closet": closet,
        "option_doorlock": doorlock,
        "option_duplex": duplex,
        "option_elevator": elevator,
        "option_gasrange": gasrange,
        "option_induction": induction,
        "option_microwave": microwave,
        "option_parking": parking,
        "option_refrigerator": refrigerator,
        "option_separation": separation,
        "option_shoe": shoe,
        "option_table": table,
        "option_tv": tv,
        "option_veranda": veranda,
        "option_washer": washer
      }
    }
    
    if (where.includes('broadcast')) {
      dispatch(FilterBroadcastAsync(data))
    } else if (where.includes('item')) {
      dispatch(FilterItemAsync(data))
    }
  }

  // axios 완료 후 이동
  const { filterItemDone, filterBroadcastDone } = useSelector((state) => state.filterSlice);

  useEffect(() => {
    if (filterItemDone) {
      dispatch(clearFilterItemDone())
      navigate('/items/filter');
    }
    if (filterBroadcastDone) {
      dispatch(clearfilterBroadcastDone())
      navigate('/broadcasts/filter');
    }
  })

  // 매물 종류
  const [roomType, setRoomType] = useState([]);
  const roomTypeChange = (value, e) => {
    if (value === 'all') {
      if (roomType.length !== 4) {
        setRoomType(['0', '1', '2', '3'])
      } else {
        setRoomType([])
      }
    } else if (roomType.length && roomType.includes(value)) {
      const newRoomType = roomType.filter((elem) => elem !== value)
      setRoomType(newRoomType)
    } else {
      setRoomType([value, ...roomType])
    }
  }

  // 거래 종류
  const [dealType, setDealType] = useState([]);
  const dealTypeChange = (value, e) => {
    if (value === 'all') {
      if (dealType.length !== 3) {
        setDealType(['0', '1', '2'])
      } else {
        setDealType([])
      }
    } else if (dealType.length && dealType.includes(value)) {
      const newDealType = dealType.filter((elem) => elem !== value)
      setDealType(newDealType)
    } else {
      setDealType([value, ...dealType])
    }
  }

  // 전용 면적
  const [exclusiveArea, setExclusiveArea] = useState([0, 100000]);
  const exclusiveAreaChange = (value, e) => {
    if (value === 'min') {
      setExclusiveArea([parseInt(e.target.value), exclusiveArea[1]])
    } else if (value === 'max') {
      setExclusiveArea([exclusiveArea[0], parseInt(e.target.value)])
    }
  }


  // 층수
  const [floor, setFloor] = useState([]);
  const floorChange = (value, e) => {
    if (value === 'all') {
      if (floor.length !== 5) {
        setFloor(['0', '1', '2', '3', '4'])
      } else {
        setFloor([])
      }
    } else if (floor.length && floor.includes(value)) {
      const newFloor = floor.filter((elem) => elem !== value)
      setFloor(newFloor)
    } else {
      setFloor([value, ...floor])
    }
  }

  // 사용 승인일
  const [buildYear, setBuildYear] = useState([]);
  const buildYearChange = (value, e) => {
    if (value === 'all') {
      if (buildYear.length !== 5) {
        setBuildYear(['0', '1', '2', '3', '4'])
      } else {
        setBuildYear([])
      }
    } else if (buildYear.length && buildYear.includes(value)) {
      const newBuildYear = buildYear.filter((elem) => elem !== value)
      setBuildYear(newBuildYear)
    } else {
      setBuildYear([value, ...buildYear])
    }
  }


  // 가격
  const [monthRent, setMonthRent] = useState([0, 100000000]);
  const [monthDeposit, setMonthDeposit] = useState([0, 100000000]);
  const [deposit, setDeposit] = useState([0, 100000000]);
  const [buyPrice, setBuyPrice] = useState([0, 100000000]);

  const monthRentChange = (value, e) => {
    if (value === 'min') {
      setMonthRent([parseInt(e.target.value), monthRent[1]])
    } else if (value === 'max') {
      setMonthRent([monthRent[0], parseInt(e.target.value)])
    }
  }
  const monthDepositChange = (value, e) => {
    if (value === 'min') {
      setMonthDeposit([parseInt(e.target.value), monthDeposit[1]])
    } else if (value === 'max') {
      setMonthDeposit([monthDeposit[0], parseInt(e.target.value)])
    }
  }
  const depositChange = (value, e) => {
    if (value === 'min') {
      setDeposit([parseInt(e.target.value), deposit[1]])
    } else if (value === 'max') {
      setDeposit([deposit[0], parseInt(e.target.value)])
    }
  }
  const buyPriceChange = (value, e) => {
    if (value === 'min') {
      setBuyPrice([parseInt(e.target.value), buyPrice[1]])
    } else if (value === 'max') {
      setBuyPrice([buyPrice[0], parseInt(e.target.value)])
    }
  }




  // 옵션들
  const [elevator, setElevator] = useState(false);
  const [parking, setParking] = useState(false);
  const [duplex, setDuplex] = useState(false);
  const [separation, setSeparation] = useState(false);
  const [induction, setInduction] = useState(false);
  const [microwave, setMicrowave] = useState(false);
  const [aircon, setAircon] = useState(false);
  const [washer, setWasher] = useState(false);
  const [tv, setTv] = useState(false);
  const [closet, setCloset] = useState(false);
  const [bed, setBed] = useState(false);
  const [table, setTable] = useState(false);
  const [shoe, setShoe] = useState(false);
  const [bidet, setBidet] = useState(false);
  const [gasrange, setGasrange] = useState(false);
  const [refrigerator, setRefrigerator] = useState(false);
  const [doorlock, setDoorlock] = useState(false);
  const [veranda, setVeranda] = useState(false);

  const elevatorChange = () => {
    setElevator(!elevator)
  }
  const parkingChange = () => {
    setParking(!parking)
  }
  const duplexChange = () => {
    setDuplex(!duplex)
  }
  const separationChange = () => {
    setSeparation(!separation)
  }
  const inductionChange = () => {
    setInduction(!induction)
  }
  const microwaveChange = () => {
    setMicrowave(!microwave)
  }
  const airconChange = () => {
    setAircon(!aircon)
  }
  const washerChange = () => {
    setWasher(!washer)
  }
  const tvChange = () => {
    setTv(!tv)
  }
  const closetChange = () => {
    setCloset(!closet)
  }
  const bedChange = () => {
    setBed(!bed)
  }
  const tableChange = () => {
    setTable(!table)
  }
  const shoeChange = () => {
    setShoe(!shoe)
  }
  const bidetChange = () => {
    setBidet(!bidet)
  }
  const gasrangeChange = () => {
    setGasrange(!gasrange)
  }
  const refrigeratorChange = () => {
    setRefrigerator(!refrigerator)
  }
  const doorlockChange = () => {
    setDoorlock(!doorlock)
  }
  const verandaChange = () => {
    setVeranda(!veranda)
  }


  return (
    <Wrapper>
      <Container>
        <h1>필터</h1>
        <SGridDiv style={{marginTop: "5%"}}>
          <STitleP>매물 종류</STitleP>
          <SGridListDiv>
            <SP><input type="checkbox" onChange={(e) => roomTypeChange('all', e)} checked={(roomType.length === 4) ? true : false} /> 전체</SP>
            <SP><input type="checkbox" onChange={(e) => roomTypeChange('0', e)} checked={(roomType.length && roomType.includes('0')) ? true : false} /> 원룸</SP>
            <SP><input type="checkbox" onChange={(e) => roomTypeChange('1', e)} checked={(roomType.length && roomType.includes('1')) ? true : false} /> 투,쓰리룸</SP>
            <SP><input type="checkbox" onChange={(e) => roomTypeChange('2', e)} checked={(roomType.length && roomType.includes('2')) ? true : false} /> 오피스텔</SP>
            <SP><input type="checkbox" onChange={(e) => roomTypeChange('3', e)} checked={(roomType.length && roomType.includes('3')) ? true : false} /> 아파트</SP>
          </SGridListDiv>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>거래 종류</STitleP>
          <SGridListDiv>
            <SP><input type="checkbox" onChange={(e) => dealTypeChange('all', e)} checked={(dealType.length === 3) ? true : false} /> 전체</SP>
            <SP><input type="checkbox" onChange={(e) => dealTypeChange('0', e)} checked={(dealType.length && dealType.includes('0')) ? true : false} /> 월세</SP>
            <SP><input type="checkbox" onChange={(e) => dealTypeChange('1', e)} checked={(dealType.length && dealType.includes('1')) ? true : false} /> 전세</SP>
            <SP><input type="checkbox" onChange={(e) => dealTypeChange('2', e)} checked={(dealType.length && dealType.includes('2')) ? true : false} /> 매매</SP>
          </SGridListDiv>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>월세</STitleP>
          <SGridListDiv>
            <SP>보증금 <input onChange={(e) => monthRentChange('min', e)} type="number" min="0" step="10" placeholder=" 00" style={{width: '100px'}} disabled={(dealType.length && dealType.includes('0')) ? false : true} /> 이상</SP>
            <SP>보증금 <input onChange={(e) => monthRentChange('max', e)} type="number" min="0" step="10" placeholder=" 00" style={{width: '100px'}} disabled={(dealType.length && dealType.includes('0')) ? false : true} /> 이하</SP>
            <SP>월세 <input onChange={(e) => monthDepositChange('min', e)} type="number" min="0" step="10" placeholder=" 00" style={{width: '100px'}} disabled={(dealType.length && dealType.includes('0')) ? false : true} /> 이상</SP>
            <SP>월세 <input onChange={(e) => monthDepositChange('max', e)} type="number" min="0" step="10" placeholder=" 00" style={{width: '100px'}} disabled={(dealType.length && dealType.includes('0')) ? false : true} /> 이하</SP>
          </SGridListDiv>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>전세 보증금</STitleP>
          <SGridListDiv>
            <SP><input onChange={(e) => depositChange('min', e)} type="number" min="0" step="100" placeholder=" 000" style={{width: '100px'}} disabled={(dealType.length && dealType.includes('1')) ? false : true} /> 이상</SP>
            <SP><input onChange={(e) => depositChange('max', e)} type="number" min="0" step="100" placeholder=" 000" style={{width: '100px'}} disabled={(dealType.length && dealType.includes('1')) ? false : true} /> 이하</SP>
          </SGridListDiv>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>매매가</STitleP>
          <SGridListDiv>
            <SP><input onChange={(e) => buyPriceChange('min', e)}  type="number" min="0" step="1000" placeholder=" 0000" style={{width: '100px'}} disabled={(dealType.length && dealType.includes('2')) ? false : true} /> 만원</SP>
            <SP><input onChange={(e) => buyPriceChange('max', e)}  type="number" min="0" step="1000" placeholder=" 0000" style={{width: '100px'}} disabled={(dealType.length && dealType.includes('2')) ? false : true} /> 만원</SP>
          </SGridListDiv>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>면적(제곱미터)</STitleP>
          <SGridListDiv>
            <SP><input onChange={(e) => exclusiveAreaChange('min', e)} type="number" min="0" placeholder=" 00" style={{width: '100px', marginRight: '20px'}} />이상</SP>
            <SP><input onChange={(e) => exclusiveAreaChange('max', e)} type="number" min="0" placeholder=" 00" style={{width: '100px', marginRight: '20px'}} />이하</SP>
          </SGridListDiv>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>층수</STitleP>
          <SGridListDiv>
            <SP><input type="checkbox" onChange={(e) => floorChange('all', e)} checked={(floor.length === 5) ? true : false} /> 전체</SP>
            <SP><input type="checkbox" onChange={(e) => floorChange('0', e)} checked={(floor.length && floor.includes('0')) ? true : false} /> 반지하</SP>
            <SP><input type="checkbox" onChange={(e) => floorChange('1', e)} checked={(floor.length && floor.includes('1')) ? true : false} /> 1층</SP>
            <SP><input type="checkbox" onChange={(e) => floorChange('2', e)} checked={(floor.length && floor.includes('2')) ? true : false} /> 2층</SP>
            <SP><input type="checkbox" onChange={(e) => floorChange('3', e)} checked={(floor.length && floor.includes('3')) ? true : false} /> 3층</SP>
            <SP><input type="checkbox" onChange={(e) => floorChange('4', e)} checked={(floor.length && floor.includes('4')) ? true : false} /> 3층이상</SP>
          </SGridListDiv>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>사용 승인일</STitleP>
          <SGridListDiv>
            <SP><input type="checkbox" onChange={(e) => buildYearChange('all', e)} checked={(buildYear.length === 5) ? true : false} /> 전체</SP>
            <SP><input type="checkbox" onChange={(e) => buildYearChange('0', e)} checked={(buildYear.length && buildYear.includes('0')) ? true : false} /> 1년 이내</SP>
            <SP><input type="checkbox" onChange={(e) => buildYearChange('1', e)} checked={(buildYear.length && buildYear.includes('1')) ? true : false} /> 5년 이내</SP>
            <SP><input type="checkbox" onChange={(e) => buildYearChange('2', e)} checked={(buildYear.length && buildYear.includes('2')) ? true : false} /> 10년 이내</SP>
            <SP><input type="checkbox" onChange={(e) => buildYearChange('3', e)} checked={(buildYear.length && buildYear.includes('3')) ? true : false} /> 15년 이내</SP>
            <SP><input type="checkbox" onChange={(e) => buildYearChange('4', e)} checked={(buildYear.length && buildYear.includes('4')) ? true : false} /> 15년 이상</SP>
          </SGridListDiv>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>추가 옵션</STitleP>
          <SGridListDiv>
          <SP><input onChange={elevatorChange} type="checkbox"/> 엘리베이터</SP>
            <SP><input onChange={parkingChange} type="checkbox"/> 주차</SP>
            <SP><input onChange={duplexChange} type="checkbox"/> 복층</SP>
            <SP><input onChange={separationChange} type="checkbox"/> 주방분리형</SP>
            <SP><input onChange={inductionChange} type="checkbox"/> 인덕션</SP>
            <SP><input onChange={microwaveChange} type="checkbox"/> 전자레인지</SP>
            <SP><input onChange={airconChange} type="checkbox"/> 에어컨</SP>
            <SP><input onChange={washerChange} type="checkbox"/> 세탁기</SP>
            <SP><input onChange={tvChange} type="checkbox"/> TV</SP>
            <SP><input onChange={closetChange} type="checkbox"/> 옷장</SP>
            <SP><input onChange={bedChange} type="checkbox"/> 침대</SP>
            <SP><input onChange={tableChange} type="checkbox"/> 책상</SP>
            <SP><input onChange={shoeChange} type="checkbox"/> 신발장</SP>
            <SP><input onChange={bidetChange} type="checkbox"/> 비데</SP>
            <SP><input onChange={gasrangeChange} type="checkbox"/> 가스레인지</SP>
            <SP><input onChange={refrigeratorChange} type="checkbox"/> 냉장고</SP>
            <SP><input onChange={doorlockChange} type="checkbox"/> 전자도어락</SP>
            <SP><input onChange={verandaChange} type="checkbox"/> 베란다/발코니</SP>
          </SGridListDiv>
        </SGridDiv>
        <hr />
        <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
          <Button
            title="적용하기"
            onClick={filtered}
          />
        </div>
      </Container>
    </Wrapper>
  )
}

export default Filter;