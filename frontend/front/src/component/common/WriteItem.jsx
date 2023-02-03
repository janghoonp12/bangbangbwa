import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./ui/Button";

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
  const [roomType, setRoomType] = useState('');
  const [dealType, setDealType] = useState('');
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


  return (
    <Wrapper>
      <Container>
        <h1>매물 등록</h1>
        <SGridDiv style={{marginTop: "5%"}}>
          <STitleP>매물 개요</STitleP>
          <textarea rows="2" placeholder=" 매물 개요" />
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>매물 상세 설명</STitleP>
          <textarea rows="5" placeholder=" 매물 상세 설명" />
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
          <STitleP>방크기</STitleP>
          <input type="range" />
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




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import TextInput from "./ui/TextInput";
// import Button from "./ui/Button";

// const Wrapper = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
// `;

// const Container = styled.div`
//     display: flex;
//     flex-direction: column;
//     width: 100%;
//     max-width: 70%;

// `;

// function WriteItem() {
//   const navigate = useNavigate();

//   const [title, setTitle] = useState("매물이름");
//   const [type, setType] = useState("매물종류");
//   const [building_type, setBuildingType] = useState("건물유형");
//   const [zonecode, setZonecode] = useState("우편번호");
//   const [deal_type, setDealType] = useState("거래종류");
//   const [supply_area, setSupplyArea] = useState("공급면적");
//   const [exclusive_area, setExclusiveArea] = useState("전용면적");
//   const [total_floor, setTotalFloor] = useState("전체층수");
//   const [floor, setFloor] = useState("해당층수");
//   const [heating, setHeating] = useState("난방종류");
//   const [move_in_type, setMoveInType] = useState("입주가능여부");
//   const [move_in_date, setMoveInDate] = useState("입주가능시기");
//   const [manage_fee, setManageFee] = useState("관리비용");
//   const [manage_type, setManageType] = useState("관리비타입");
//   const [description, setDescription] = useState("매물상세설명");
//   const [buildingcode, setBuildingcode] = useState("건물코드");
//   const [build_year, setBuildYear] = useState("건축년도");
//   const [road_name, setRoadName] = useState("도로명");
//   const [roadname_bonbun, setRoadnameBonbun] = useState("도로명본번");
//   const [roadname_bubun, setRoadnameBubun] = useState("도로명부번");
//   const [roadname_code, setRoadnameCode] = useState("도로명코드");
//   const [dong, setDong] = useState("동이름");
//   const [bonbun, setBonbun] = useState("본번");
//   const [bubun, setBubun] = useState("부번");
//   const [sigungucode, setSigungucode] = useState("시군구코드");
//   const [eubmyundongcode, setEubmyundongcode] = useState("읍면동코드");
//   const [dongcode, setDongcode] = useState("동코드");
//   const [building_name, setBuildingName] = useState("건물이름");
//   const [jibun, setJibun] = useState("지번");
//   const [lng, setLng] = useState("경도");
//   const [lat, setLat] = useState("위도");
//   const [deal_complete, setDealComplete] = useState("거래완료여부");
  
//   return (
//     <Wrapper>
//       <Button
//         title="뒤로가기"
//         onClick={() => {
//           navigate(-1);
//         }}
//       />
//       <Container>
//         <TextInput
//           height={20}
//           value={title}
//           onChange={(event) => {
//             setTitle(event.target.value);
//           }}
//         />
//         <TextInput
//           height={20}
//           value={type}
//           onChange={(event) => {
//             setType(event.target.value);
//           }}
//         />
//         <TextInput
//           height={20}
//           value={building_type}
//           onChange={(event) => {
//             setBuildingType(event.target.value);
//           }}
//         />
//         <TextInput
//           height={20}
//           value={zonecode}
//           onChange={(event) => {
//             setZonecode(event.target.value);
//           }}
//         />
//         <TextInput
//           height={20}
//           value={deal_type}
//           onChange={(event) => {
//             setDealType(event.target.value);
//           }}
//         />
//         <TextInput
//           height={20}
//           value={supply_area}
//           onChange={(event) => {
//             setSupplyArea(event.target.value);
//           }}
//         />
//         <TextInput
//           height={20}
//           value={exclusive_area}
//           onChange={(event) => {
//             setExclusiveArea(event.target.value);
//           }}
//         />
//         <TextInput
//           height={20}
//           value={total_floor}
//           onChange={(event) => {
//             setTotalFloor(event.target.value);
//           }}
//         />
//         <TextInput
//           height={20}
//           value={floor}
//           onChange={(event) => {
//             setFloor(event.target.value);
//           }}
//         />
//         <TextInput
//           height={20}
//           value={heating}
//           onChange={(event) => {
//             setHeating(event.target.value);
//           }}
//         />
//         <TextInput
//           height={20}
//           value={move_in_type}
//           onChange={(event) => {
//             setMoveInType(event.target.value);
//           }}
//         />
//         <TextInput
//           height={20}
//           value={move_in_date}
//           onChange={(event) => {
//             setMoveInDate(event.target.value);
//           }}
//         />
//         <TextInput
//           height={20}
//           value={manage_fee}
//           onChange={(event) => {
//             setManageFee(event.target.value);
//           }}
//         />
//         <TextInput
//           height={20}
//           value={manage_type}
//           onChange={(event) => {
//             setManageType(event.target.value);
//           }}
//         />
//         <TextInput
//           height={20}
//           value={description}
//           onChange={(event) => {
//             setDescription(event.target.value);
//           }}
//         />
//         <TextInput
//           height={20}
//           value={buildingcode}
//           onChange={(event) => {
//             setBuildingcode(event.target.value);
//           }}
//         />
//         <TextInput
//           height={20}
//           value={build_year}
//           onChange={(event) => {
//             setBuildYear(event.target.value);
//           }}
//         />
//         <TextInput
//           height={20}
//           value={road_name}
//           onChange={(event) => {
//             setRoadName(event.target.value);
//           }}
//         />
//         <TextInput
//           height={20}
//           value={roadname_bonbun}
//           onChange={(event) => {
//             setRoadnameBonbun(event.target.value);
//           }}
//         />
//         <TextInput
//           height={20}
//           value={roadname_bubun}
//           onChange={(event) => {
//             setRoadnameBubun(event.target.value);
//           }}
//         />
//         <TextInput
//           height={20}
//           value={roadname_code}
//           onChange={(event) => {
//             setRoadnameCode(event.target.value);
//           }}
//         />
//         <TextInput
//           height={20}
//           value={dong}
//           onChange={(event) => {
//             setDong(event.target.value);
//           }}
//         />
//         <TextInput
//           height={20}
//           value={bonbun}
//           onChange={(event) => {
//             setBonbun(event.target.value);
//           }}
//         />
//         <TextInput
//           height={20}
//           value={bubun}
//           onChange={(event) => {
//             setBubun(event.target.value);
//           }}
//         />
//         <TextInput
//           height={20}
//           value={sigungucode}
//           onChange={(event) => {
//             setSigungucode(event.target.value);
//           }}
//         />
//         <TextInput
//           height={20}
//           value={eubmyundongcode}
//           onChange={(event) => {
//             setEubmyundongcode(event.target.value);
//           }}
//         />
//         <TextInput
//           height={20}
//           value={dongcode}
//           onChange={(event) => {
//             setDongcode(event.target.value);
//           }}
//         />
//         <TextInput
//           height={20}
//           value={building_name}
//           onChange={(event) => {
//             setBuildingName(event.target.value);
//           }}
//         />
//         <TextInput
//           height={20}
//           value={jibun}
//           onChange={(event) => {
//             setJibun(event.target.value);
//           }}
//         />
//         <TextInput
//           height={20}
//           value={lng}
//           onChange={(event) => {
//             setLng(event.target.value);
//           }}
//         />
//         <TextInput
//           height={20}
//           value={lat}
//           onChange={(event) => {
//             setLat(event.target.value);
//           }}
//         />
//         <TextInput
//           height={20}
//           value={deal_complete}
//           onChange={(event) => {
//             setDealComplete(event.target.value);
//           }}
//         />
//         <Button
//           title="등록하기"
//           onClick={() => {
//             navigate("/");
//           }}
//         />
//       </Container>
//     </Wrapper>
//   )
// }

// export default WriteItem;