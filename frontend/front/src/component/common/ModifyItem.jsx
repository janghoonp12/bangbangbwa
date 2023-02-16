import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { modifyItemAsync, clearModifyItemDone } from "../../reducers/itemSlice"
import styled from "styled-components";
import Button from "./ui/Button";
import DaumPostcode from 'react-daum-postcode';
import ImageUpload from "./ImageUpload";
import { useDispatch, useSelector } from 'react-redux';


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

function ModifyItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { modifyItemDone, itemDetail } = useSelector((state) => state.itemSlice);
  // 카카오 주소 검색 API
  const [postCode, setPostCode] = useState('');
  const [lat, setLat] = useState(itemDetail.item.item_lat);
  const [lng, setLng] = useState(itemDetail.item.item_lng);
  
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
    if (modifyItemDone) {
      dispatch(clearModifyItemDone())
      navigate(-1);
    }
  })

  console.log(itemDetail)  

  // 직접 입력하는 자료
  const [roomType, setRoomType] = useState(itemDetail.item.item_type);
  const [dealType, setDealType] = useState(itemDetail.item.item_deal_type);
  const [itemName, setItemName] = useState(itemDetail.item.item_title);
  const [item_description, setItemDetail] = useState(itemDetail.item.item_description);
  const [roomNum, setRoomNum] = useState(itemDetail.item.item_room);
  const [toiletNum, setToiletNum] = useState(itemDetail.item.item_toilet);
  const [monthRent, setMonthRent] = useState(itemDetail.itemPrice.item_price_month_rent);
  const [deposit, setDeposit] = useState((itemDetail.item.item_deal_type === 0) ? itemDetail.itemPrice.item_price_month_deposit : itemDetail.itemPrice.item_price_house_deposit);
  const [buyPrice, setBuyPrice] = useState(itemDetail.itemPrice.item_price_buy_house);
  const [floor, setFloor] = useState(itemDetail.item.item_floor);
  const [totalFloor, setTotalFloor] = useState(itemDetail.item.item_total_floor);
  const [elevator, setElevator] = useState(itemDetail.option.option_elevator);
  const [parking, setParking] = useState(itemDetail.option.option_parking);
  const [duplex, setDuplex] = useState(itemDetail.option.option_duplex);
  const [separation, setSeparation] = useState(itemDetail.option.option_separation);
  const [induction, setInduction] = useState(itemDetail.option.option_induction);
  const [microwave, setMicrowave] = useState(itemDetail.option.option_microwave);
  const [aircon, setAircon] = useState(itemDetail.option.option_aircon);
  const [washer, setWasher] = useState(itemDetail.option.option_washer);
  const [tv, setTv] = useState(itemDetail.option.option_tv);
  const [closet, setCloset] = useState(itemDetail.option.option_closet);
  const [bed, setBed] = useState(itemDetail.option.option_bed);
  const [table, setTable] = useState(itemDetail.option.option_table);
  const [shoe, setShoe] = useState(itemDetail.option.option_shoe);
  const [bidet, setBidet] = useState(itemDetail.option.option_bidet);
  const [gasrange, setGasrange] = useState(itemDetail.option.option_gasrange);
  const [refrigerator, setRefrigerator] = useState(itemDetail.option.option_refrigerator);
  const [doorlock, setDoorlock] = useState(itemDetail.option.option_doorlock);
  const [veranda, setVeranda] = useState(itemDetail.option.option_veranda);

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

  const [oriBon, setOriBon] = useState(itemDetail.item.item_bonbun);
  const [oriBu, setOriBu] = useState(itemDetail.item.item_bubun);

  const modifyItem = () => {
    if (!!postCode && itemDetail.item.item_road_name !== postCode.roadname) {
      let temp = ''
      for(var i=0; i<postCode.address.length; i++) {
        if (postCode.address[i] === '-') {
          setOriBon(temp)
          temp = ''
        } else if (parseInt(postCode.address[i])) {
            temp += postCode.address[i]
          }
        }
      setOriBu(temp)
    }

    // 오늘 날짜 가져오기
    let today = new Date();   

    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜  

    let realToday = `${year}-${month}-${date}`

    const data = {
      "item": {
        // "broker_id": 1,
        "item_bonbun": oriBon,
        "item_bubun": oriBu,                                      
        "item_build_year": buildYear,
        "item_building_name": postCode.buildingName,
        "item_building_type": roomType,
        "item_buildingcode": postCode.buildingCode,                            
        "item_deal_complete": false,
        "item_deal_type": dealType,
        "item_description": item_description,
        "item_dong": postCode.bname,
        "item_dongcode": postCode.bcode,  
        "item_eubmyundongcode": postCode.bcode,   
        "item_exclusive_area": exclusiveArea,
        "item_floor": floor,                                                 
        "item_heating": parseInt(heating),        
        "item_jibun": postCode.jibunAddress,
        "item_lat": lat,
        "item_lng": lng,
        "item_manage_fee": parseInt(manageFee),
        "item_manage_type": 0,
        "item_move_in_date": (moveIn) ? realToday : moveInDate,
        "item_move_in_type": (moveIn) ? 0 : 1,                                    
        "item_road_name": postCode.roadname,
        "item_road_name_bonbun": oriBon,
        "item_roadname_bubun": oriBu,
        "item_roadname_code": postCode.roadnameCode,
        "item_room": roomNum,
        "item_sigungucode": postCode.sigunguCode,
        "item_status": 1,
        "item_supply_area": supplyArea,
        "item_toilet": toiletNum,
        "item_title": itemName,
        "item_total_floor": totalFloor,
        "item_type": roomType,
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
    
    dispatch(modifyItemAsync(data))
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

  const[buildYear, setBuildyear] = useState(itemDetail.item.item_build_year);
  const dateChange = (e) => {
    const year = e.target.value[0] + e.target.value[1] + e.target.value[2] + e.target.value[3]
    setBuildyear(year)
  }

  const [supplyArea, setSupplyArea] = useState(itemDetail.item.item_supply_area);
  const [exclusiveArea, setExclusiveArea] = useState(itemDetail.item.item_exclusive_area);

  const supplyAreaChange = (e) => {
    setSupplyArea(parseInt(e.target.value))
  }

  const exclusiveAreaChange = (e) => {
    setExclusiveArea(parseInt(e.target.value))
  }

  const [heating, setHeating] = useState(itemDetail.item.item_heating);
  const heatingChange = (value, e) => {
    if (!heating) {
      setHeating(value)
    } else if (heating === value) {
      setHeating('')
    }
  }

  const [manageFee, setManageFee] = useState(itemDetail.item.item_manage_fee);
  const manageFeeChange = (e) => {
    setManageFee(e.target.value)
  }

  const [moveIn, setMoveIn] = useState(itemDetail.item.item_move_in_type);
  const [moveInDate, setMoveInDate] = useState(itemDetail.item.item_move_in_date);

  const moveInChange = () => {
    setMoveIn(!moveIn)
  }
  
  const moveInDateChange = (e) => {
    const date = e.target.value[0] + e.target.value[1] + e.target.value[2] + e.target.value[3]
    setMoveInDate(date)
  }


  // 관리비 옵션
  const [optclean, setOptclean] = useState(itemDetail?.manageOption.manage_option_clean || false);
  const [optElectric, setOptElectric] = useState(itemDetail?.manageOption.manage_option_electric || false);
  const [optGas, setOptGas] = useState(itemDetail?.manageOption.manage_option_gas || false);
  const [optInternet, setOptInternet] = useState(itemDetail?.manageOption.manage_option_internet || false);
  const [optTv, setOptTv] = useState(itemDetail?.manageOption.manage_option_tv || false);
  const [optWater, setOptWater] = useState(itemDetail?.manageOption.manage_option_water || false);
  const [optEtc, setOptEtc] = useState(itemDetail?.manageOption.manage_option_etc || '');

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
          <textarea value={itemName} rows="2" onChange={itemNameChange} placeholder=" 매물명" />
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
            <input type="text" value={(postCode) ? postCode.address : itemDetail.item.item_road_name} style={{marginTop: '20px', width: '300px', marginRight: '30px'}} disabled />
            {/* <p style={{marginTop: '20px', marginBottom: '0px', fontSize: '20px', paddingRight: '10px', marginRight: '0px'}}>상세 주소 :</p>
            <input type="text" style={{marginTop: '20px', width: '400px'}} disabled={(!postCode) ? true : false} /> */}
          </div>
          </div>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>매물 상세 설명</STitleP>
          <textarea value={item_description} rows="5" onChange={itemDetailChange} placeholder=" 매물 상세 설명" />
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>면적</STitleP>
          <div>
            공급면적&nbsp;:&nbsp;<input onChange={supplyAreaChange} value={supplyArea} type="number" placeholder=" 공급면적" style={{width: '100px', marginRight: '20px'}} />
            전용면적&nbsp;:&nbsp;<input onChange={exclusiveAreaChange} value={exclusiveArea} type="number" placeholder=" 전용면적" style={{width: '100px'}} />
          </div>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>방/화장실</STitleP>
          <div>
            방&nbsp;:&nbsp;<input value={roomNum} onChange={roomChange} type="number" min="0" placeholder=" 방 수" style={{width: '100px', marginRight: '20px'}} />
            화장실&nbsp;:&nbsp;<input value={toiletNum} onChange={toiletChange} type="number" min="0" placeholder=" 화장실 수" style={{width: '100px'}} />
          </div>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>매물 종류</STitleP>
          <SGridListDiv>
            <SP><input type="checkbox" checked={(roomType === 0) ? true : false} onChange={(e) => roomTypeChange(0, e)} disabled={(roomType === 0 || !roomType) ? false : true} /> 원룸</SP>
            <SP><input type="checkbox" checked={(roomType === 1) ? true : false} onChange={(e) => roomTypeChange(1, e)} disabled={(roomType === 1 || !roomType) ? false : true} /> 투,쓰리룸</SP>
            <SP><input type="checkbox" checked={(roomType === 2) ? true : false} onChange={(e) => roomTypeChange(2, e)} disabled={(roomType === 2 || !roomType) ? false : true} /> 오피스텔</SP>
            <SP><input type="checkbox" checked={(roomType === 3) ? true : false} onChange={(e) => roomTypeChange(3, e)} disabled={(roomType === 3 || !roomType) ? false : true} /> 아파트</SP>
          </SGridListDiv>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>거래 종류</STitleP>
          <SGridListDiv>
            <SP><input type="checkbox" checked={(dealType === 0) ? true : false} onChange={(e) => dealTypeChange(0, e)} disabled={(dealType === 0 || !dealType) ? false : true}/> 월세</SP>
            <SP><input type="checkbox" checked={(dealType === 1) ? true : false} onChange={(e) => dealTypeChange(1, e)} disabled={(dealType === 1 || !dealType) ? false : true}/> 전세</SP>
            <SP><input type="checkbox" checked={(dealType === 2) ? true : false} onChange={(e) => dealTypeChange(2, e)} disabled={(dealType === 2 || !dealType) ? false : true}/> 매매</SP>
          </SGridListDiv>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>보증금/전세가</STitleP>
          <div>
            <input onChange={depositChange} value={(dealType !== 2) ? deposit : '000'} type="number" min="0" step="100" placeholder=" 000" style={{width: '100px'}} disabled={(dealType === 0 || dealType === 1) ? false : true} />&nbsp;만원
          </div>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>월세</STitleP>
          <div>
            <input onChange={monthRentChange} value={(dealType === 0) ? monthRent : '00'} type="number" min="0" step="10" placeholder=" 00" style={{width: '100px'}} disabled={(dealType === 0) ? false : true} />&nbsp;만원
          </div>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>매매가</STitleP>
          <div>
            <input onChange={buyPriceChange} value={(dealType === 2) ? buyPrice : '0000'}  type="number" min="0" step="1000" placeholder=" 0000" style={{width: '100px'}} disabled={(dealType === 2) ? false : true} />&nbsp;만원
          </div>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>관리비</STitleP>
          <div>
            <input onChange={manageFeeChange} value={manageFee}  type="number" min="0" placeholder=" 00" style={{width: '100px'}} />&nbsp;만원
          </div>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>관리비 포함 내역</STitleP>
          <SGridListDiv>
            <SP><input checked={(optclean) ? true : false} onChange={optCleanChange} type="checkbox"/> 청소비</SP>
            <SP><input checked={(optElectric) ? true : false} onChange={optElectricChange} type="checkbox"/> 전기</SP>
            <SP><input checked={(optGas) ? true : false} onChange={optGasChange} type="checkbox"/> 가스</SP>
            <SP><input checked={(optInternet) ? true : false} onChange={optInternetChange} type="checkbox"/> 인터넷</SP>
            <SP><input checked={(optTv) ? true : false} onChange={optTvChange} type="checkbox"/> 유선TV</SP>
            <SP><input checked={(optWater) ? true : false} onChange={optWaterChange} type="checkbox"/> 수도</SP>
            <SP>기타 &nbsp;<input value={optEtc} onChange={optEtcChange} type="text"/></SP>
          </SGridListDiv>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>층수</STitleP>
          <div style={{display: 'flex'}}>
            총 층수&nbsp;:&nbsp;<input value={(totalFloor) ? totalFloor : floor} onChange={totalFloorChange} type="number" min="0" placeholder=" 총 층수" style={{width: '100px', marginRight: '20px'}} />
            해당 층수&nbsp;:&nbsp;<input value={floor} onChange={floorChange} type="number" min="0" placeholder=" 해당 층수" style={{width: '100px', marginRight: '20px'}} />
            <SP style={{marginRight: '20px'}}><input checked={(floor < 0) ? true : false} onChange={isBasementChange} type="checkbox"/> 지하 여부</SP>
            <SP style={{color: 'red'}}>*지하 여부 체크시, 층수를 '2'로 입력하면 지하 2층으로 입력됩니다.</SP>
          </div>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>입주일</STitleP>
          <SGridListDiv>
            <SP><input checked={(moveIn) ? true : false} onChange={moveInChange} type="checkbox"/>즉시 입주</SP>
            <SP><input value={(moveIn) ? '2023-02-17' : `${moveInDate}-01-01`} onChange={moveInDateChange} disabled={(moveIn) ? true : false} type="date"/>입주 가능일</SP>
          </SGridListDiv>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>사용 승인일</STitleP>
            <input value={`${buildYear}-01-01`} onChange={dateChange} type="date"/>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>난방 종류</STitleP>
          <SGridListDiv>
            <SP><input checked={(heating === 0) ? true : false} type="checkbox" onClick={(e) => heatingChange(0, e)} disabled={(heating === 0 || !heating) ? false : true}/> 개별 난방</SP>
            <SP><input checked={(heating === 1) ? true : false} type="checkbox" onClick={(e) => heatingChange(1, e)} disabled={(heating === 1 || !heating) ? false : true}/> 지역 난방</SP>
            <SP><input checked={(heating === 2) ? true : false} type="checkbox" onClick={(e) => heatingChange(2, e)} disabled={(heating === 2 || !heating) ? false : true}/> 중앙 난방</SP>
          </SGridListDiv>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>추가 옵션</STitleP>
          <SGridListDiv>
            <SP><input checked={(elevator) ? true : false} onChange={elevatorChange} type="checkbox"/> 엘리베이터</SP>
            <SP><input checked={(parking) ? true : false} onChange={parkingChange} type="checkbox"/> 주차</SP>
            <SP><input checked={(duplex) ? true : false} onChange={duplexChange} type="checkbox"/> 복층</SP>
            <SP><input checked={(separation) ? true : false} onChange={separationChange} type="checkbox"/> 주방분리형</SP>
            <SP><input checked={(induction) ? true : false} onChange={inductionChange} type="checkbox"/> 인덕션</SP>
            <SP><input checked={(microwave) ? true : false} onChange={microwaveChange} type="checkbox"/> 전자레인지</SP>
            <SP><input checked={(aircon) ? true : false} onChange={airconChange} type="checkbox"/> 에어컨</SP>
            <SP><input checked={(washer) ? true : false} onChange={washerChange} type="checkbox"/> 세탁기</SP>
            <SP><input checked={(tv) ? true : false} onChange={tvChange} type="checkbox"/> TV</SP>
            <SP><input checked={(closet) ? true : false} onChange={closetChange} type="checkbox"/> 옷장</SP>
            <SP><input checked={(bed) ? true : false} onChange={bedChange} type="checkbox"/> 침대</SP>
            <SP><input checked={(table) ? true : false} onChange={tableChange} type="checkbox"/> 책상</SP>
            <SP><input checked={(shoe) ? true : false} onChange={shoeChange} type="checkbox"/> 신발장</SP>
            <SP><input checked={(bidet) ? true : false} onChange={bidetChange} type="checkbox"/> 비데</SP>
            <SP><input checked={(gasrange) ? true : false} onChange={gasrangeChange} type="checkbox"/> 가스레인지</SP>
            <SP><input checked={(refrigerator) ? true : false} onChange={refrigeratorChange} type="checkbox"/> 냉장고</SP>
            <SP><input checked={(doorlock) ? true : false} onChange={doorlockChange} type="checkbox"/> 전자도어락</SP>
            <SP><input checked={(veranda) ? true : false} onChange={verandaChange} type="checkbox"/> 베란다/발코니</SP>
          </SGridListDiv>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>사진</STitleP>
          <SGridListDiv>
            <ImageUpload/>
          </SGridListDiv>
        </SGridDiv>
        <hr />
        <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
          <Button
            title="수정하기"
            onClick={modifyItem}
          />
        </div>
      </Container>
    </Wrapper>
  )
}

export default ModifyItem;