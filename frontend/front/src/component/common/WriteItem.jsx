import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { writeItemAsync, clearWriteItemDone } from "../../reducers/itemSlice"
import styled from "styled-components";
import Button from "./ui/Button";
import DaumPostcode from 'react-daum-postcode';
import { useDispatch, useSelector } from 'react-redux';


const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Container = styled.div`
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { writeItemDone } = useSelector((state) => state.itemSlice);
  // 카카오 주소 검색 API
  const [postCode, setPostCode] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  
  // 주소 선택 이벤트
  const selectAddress = (data) => {
    setPostCode(data)
    // // 주소 토대로 위도, 경도 반환받는 API 요청
    var geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(data.address, function(result, status) {

      // 정상적으로 검색이 완료됐으면 
      if (status === window.kakao.maps.services.Status.OK) {
        var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        setLat(coords.La) // 경도
        setLng(coords.Ma) // 위도
      }
    })
  }

  useEffect(() => {
    if (writeItemDone) {
      dispatch(clearWriteItemDone())
      navigate('/items');
    }
  })

  

  // 직접 입력하는 자료
  const [roomType, setRoomType] = useState('');
  const [dealType, setDealType] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemDetail, setItemDetail] = useState('');
  const [roomNum, setRoomNum] = useState('');
  const [toiletNum, setToiletNum] = useState('');
  const [monthRent, setMonthRent] = useState(null);
  const [deposit, setDeposit] = useState(null);
  const [buyPrice, setBuyPrice] = useState(null);
  const [floor, setFloor] = useState(1);
  const [totalFloor, setTotalFloor] = useState('');
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


  const addNewItem = () => {
    let bon = ''
    let bu = ''
    let temp = ''
    for(var i=0; i<postCode.address.length; i++) {
      if (postCode.address[i] === '-') {
        bon = temp
        temp = ''
      } else if (parseInt(postCode.address[i])) {
          temp += postCode.address[i]
        }
      }
    bu = temp

    // 오늘 날짜 가져오기
    let today = new Date();   

    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜  

    let realToday = `${year}-${month}-${date}`

    const data = {
      "item": {
        "item_bonbun": bon,
        "item_bubun": bu,                                      
        "item_build_year": buildYear,
        "item_building_name": postCode.buildingName,
        "item_building_type": roomType-1,
        "item_buildingcode": postCode.buildingCode,                            
        "item_deal_complete": false,
        "item_deal_type": dealType-1,
        "item_description": itemDetail,
        "item_dong": postCode.bname,
        "item_dongcode": postCode.bcode,  
        "item_eubmyundongcode": postCode.bcode,   
        "item_exclusive_area": exclusiveArea,
        "item_floor": floor,                                                 
        "item_heating": parseInt(heating)-1,        
        "item_jibun": postCode.jibunAddress,
        "item_lat": lat,
        "item_lng": lng,
        "item_manage_fee": parseInt(manageFee),
        "item_manage_type": 0,
        "item_move_in_date": (moveIn) ? realToday : moveInDate,
        "item_move_in_type": (moveIn) ? 0 : 1,                                    
        "item_road_name": postCode.roadname,
        "item_road_name_bonbun": bon,
        "item_roadname_bubun": bu,
        "item_roadname_code": postCode.roadnameCode,
        "item_room": roomNum,
        "item_sigungucode": postCode.sigunguCode,
        "item_status": 1,
        "item_supply_area": supplyArea,
        "item_toilet": toiletNum,
        "item_title": itemName,
        "item_total_floor": totalFloor,
        "item_type": roomType-1,
        "item_zonecode": postCode.zonecode
         },
        "itemPrice": {
          "item_price_buy_house": (dealType === '3') ? buyPrice : null,
          "item_price_house_deposit": (dealType === '2') ? deposit : null,
          "item_price_month_deposit": (dealType === '1') ? deposit : null,
          "item_price_month_rent": (dealType === '1') ? monthRent : null
        },
        "manageOption": {                                          
          "manage_option_clean": optclean,
          "manage_option_electric": optElectric,
          "manage_option_etc": optEtc,                  
          "manage_option_gas": optGas,
          "manage_option_internet": optInternet,
          "manage_option_tv": optTv,
          "manage_option_water": optWater
        },
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
    
    dispatch(writeItemAsync(data))
  }


  // 변수 실시간 추적
  const itemNameChange = (e) => {
    setItemName(e.target.value)
  }
  const itemDetailChange = (e) => {
    setItemDetail(e.target.value)
  }
  const toiletChange = (e) => {
    setToiletNum(parseInt(e.target.value))
  }
  const roomChange = (e) => {
    setRoomNum(parseInt(e.target.value))
  }
  const monthRentChange = (e) => {
    setMonthRent(parseInt(e.target.value))
  }
  const depositChange = (e) => {
    setDeposit(parseInt(e.target.value))
  }
  const buyPriceChange = (e) => {
    setBuyPrice(parseInt(e.target.value))
  }
  const floorChange = (e) => {
    if (e.target.value > totalFloor) {
      alert('총 층수보다 높을 수 없습니다.')
      setFloor(parseInt(totalFloor))
    } else {
      setFloor(parseInt(e.target.value))
    }
  }
  const totalFloorChange = (e) => {
    setTotalFloor(parseInt(e.target.value))
  }

  const isBasementChange = (e) => {
    setFloor(floor*-1)
  }

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

  const[buildYear, setBuildyear] = useState();
  const dateChange = (e) => {
    const year = e.target.value[0] + e.target.value[1] + e.target.value[2] + e.target.value[3]
    setBuildyear(year)
  }

  const [supplyArea, setSupplyArea] = useState(0);
  const [exclusiveArea, setExclusiveArea] = useState(0);

  const supplyAreaChange = (e) => {
    setSupplyArea(parseInt(e.target.value))
  }

  const exclusiveAreaChange = (e) => {
    setExclusiveArea(parseInt(e.target.value))
  }

  const [heating, setHeating] = useState('');
  const heatingChange = (value, e) => {
    if (!heating) {
      setHeating(value)
    } else if (heating === value) {
      setHeating('')
    }
  }

  const [manageFee, setManageFee] = useState(0);
  const manageFeeChange = (e) => {
    setManageFee(e.target.value)
  }

  const [moveIn, setMoveIn] = useState(false);
  const [moveInDate, setMoveInDate] = useState('');

  const moveInChange = () => {
    setMoveIn(!moveIn)
  }
  
  const moveInDateChange = (e) => {
    const date = e.target.value[0] + e.target.value[1] + e.target.value[2] + e.target.value[3]
    setMoveInDate(date)
  }


  // 관리비 옵션
  const [optclean, setOptclean] = useState(false);
  const [optElectric, setOptElectric] = useState(false);
  const [optGas, setOptGas] = useState(false);
  const [optInternet, setOptInternet] = useState(false);
  const [optTv, setOptTv] = useState(false);
  const [optWater, setOptWater] = useState(false);
  const [optEtc, setOptEtc] = useState('');

  const optCleanChange = () => {
    setOptclean(!optclean)
  }
  const optElectricChange = () => {
    setOptElectric(!optElectric)
  }
  const optGasChange = () => {
    setOptGas(!optGas)
  }
  const optInternetChange = () => {
    setOptInternet(!optInternet)
  }
  const optTvChange = () => {
    setOptTv(!optTv)
  }
  const optWaterChange = () => {
    setOptWater(!optWater)
  }

  const optEtcChange = (e) => {
    setOptEtc(e.target.value)
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
            onComplete={selectAddress}  // 값을 선택할 경우 실행되는 이벤트
            autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
          />
          <div style={{display: 'flex'}}>
            <input type="text" value={(postCode) ? postCode.address : ''} style={{marginTop: '20px', width: '300px', marginRight: '30px'}} disabled />
            {/* <p style={{marginTop: '20px', marginBottom: '0px', fontSize: '20px', paddingRight: '10px', marginRight: '0px'}}>상세 주소 :</p>
            <input type="text" style={{marginTop: '20px', width: '400px'}} disabled={(!postCode) ? true : false} /> */}
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
          <STitleP>면적</STitleP>
          <div>
            공급면적&nbsp;:&nbsp;<input onChange={supplyAreaChange} type="number" placeholder=" 공급면적" style={{width: '100px', marginRight: '20px'}} />
            전용면적&nbsp;:&nbsp;<input onChange={exclusiveAreaChange} type="number" placeholder=" 전용면적" style={{width: '100px'}} />
          </div>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>방/화장실</STitleP>
          <div>
            방&nbsp;:&nbsp;<input onChange={roomChange} type="number" min="0" placeholder=" 방 수" style={{width: '100px', marginRight: '20px'}} />
            화장실&nbsp;:&nbsp;<input onChange={toiletChange} type="number" min="0" placeholder=" 화장실 수" style={{width: '100px'}} />
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
            <input onChange={depositChange} type="number" min="0" step="100" placeholder=" 000" style={{width: '100px'}} disabled={(dealType === '1' || dealType === '2') ? false : true} />&nbsp;만원
          </div>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>월세</STitleP>
          <div>
            <input onChange={monthRentChange} type="number" min="0" step="10" placeholder=" 00" style={{width: '100px'}} disabled={(dealType === '1') ? false : true} />&nbsp;만원
          </div>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>매매가</STitleP>
          <div>
            <input onChange={buyPriceChange}  type="number" min="0" step="1000" placeholder=" 0000" style={{width: '100px'}} disabled={(dealType === '3') ? false : true} />&nbsp;만원
          </div>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>관리비</STitleP>
          <div>
            <input onChange={manageFeeChange}  type="number" min="0" placeholder=" 00" style={{width: '100px'}} />&nbsp;만원
          </div>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>관리비 포함 내역</STitleP>
          <SGridListDiv>
            <SP><input onChange={optCleanChange} type="checkbox"/> 청소비</SP>
            <SP><input onChange={optElectricChange} type="checkbox"/> 전기</SP>
            <SP><input onChange={optGasChange} type="checkbox"/> 가스</SP>
            <SP><input onChange={optInternetChange} type="checkbox"/> 인터넷</SP>
            <SP><input onChange={optTvChange} type="checkbox"/> 유선TV</SP>
            <SP><input onChange={optWaterChange} type="checkbox"/> 수도</SP>
            <SP>기타 &nbsp;<input onChange={optEtcChange} type="text"/></SP>
          </SGridListDiv>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>층수</STitleP>
          <div style={{display: 'flex'}}>
            총 층수&nbsp;:&nbsp;<input onChange={totalFloorChange} type="number" min="0" placeholder=" 총 층수" style={{width: '100px', marginRight: '20px'}} />
            해당 층수&nbsp;:&nbsp;<input onChange={floorChange} type="number" min="0" placeholder=" 해당 층수" style={{width: '100px', marginRight: '20px'}} />
            <SP style={{marginRight: '20px'}}><input onChange={isBasementChange} type="checkbox"/> 지하 여부</SP>
            <SP style={{color: 'red'}}>*지하 여부 체크시, 층수를 '2'로 입력하면 지하 2층으로 입력됩니다.</SP>
          </div>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>입주일</STitleP>
          <SGridListDiv>
            <SP><input onChange={moveInChange} type="checkbox"/>즉시 입주</SP>
            <SP><input onChange={moveInDateChange} disabled={(moveIn) ? true : false} type="date"/>입주 가능일</SP>
          </SGridListDiv>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>사용 승인일</STitleP>
            <input onChange={dateChange} type="date"/>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>난방 종류</STitleP>
          <SGridListDiv>
            <SP><input type="checkbox" onClick={(e) => heatingChange('1', e)} disabled={(heating === '1' || !heating) ? false : true}/> 개별 난방</SP>
            <SP><input type="checkbox" onClick={(e) => heatingChange('2', e)} disabled={(heating === '2' || !heating) ? false : true}/> 지역 난방</SP>
            <SP><input type="checkbox" onClick={(e) => heatingChange('3', e)} disabled={(heating === '3' || !heating) ? false : true}/> 중앙 난방</SP>
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
            title="등록하기"
            onClick={addNewItem}
          />
        </div>
      </Container>
    </Wrapper>
  )
}

export default WriteItem;