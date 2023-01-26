import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TextInput from "./ui/TextInput";
import Button from "./ui/Button";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 70%;

`;

function WriteItem() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("매물이름");
  const [type, setType] = useState("매물종류");
  const [building_type, setBuildingType] = useState("건물유형");
  const [zonecode, setZonecode] = useState("우편번호");
  const [deal_type, setDealType] = useState("거래종류");
  const [supply_area, setSupplyArea] = useState("공급면적");
  const [exclusive_area, setExclusiveArea] = useState("전용면적");
  const [total_floor, setTotalFloor] = useState("전체층수");
  const [floor, setFloor] = useState("해당층수");
  const [heating, setHeating] = useState("난방종류");
  const [move_in_type, setMoveInType] = useState("입주가능여부");
  const [move_in_date, setMoveInDate] = useState("입주가능시기");
  const [manage_fee, setManageFee] = useState("관리비용");
  const [manage_type, setManageType] = useState("관리비타입");
  const [description, setDescription] = useState("매물상세설명");
  const [buildingcode, setBuildingcode] = useState("건물코드");
  const [build_year, setBuildYear] = useState("건축년도");
  const [road_name, setRoadName] = useState("도로명");
  const [roadname_bonbun, setRoadnameBonbun] = useState("도로명본번");
  const [roadname_bubun, setRoadnameBubun] = useState("도로명부번");
  const [roadname_code, setRoadnameCode] = useState("도로명코드");
  const [dong, setDong] = useState("동이름");
  const [bonbun, setBonbun] = useState("본번");
  const [bubun, setBubun] = useState("부번");
  const [sigungucode, setSigungucode] = useState("시군구코드");
  const [eubmyundongcode, setEubmyundongcode] = useState("읍면동코드");
  const [dongcode, setDongcode] = useState("동코드");
  const [building_name, setBuildingName] = useState("건물이름");
  const [jibun, setJibun] = useState("지번");
  const [lng, setLng] = useState("경도");
  const [lat, setLat] = useState("위도");
  const [deal_complete, setDealComplete] = useState("거래완료여부");
  
  return (
    <Wrapper>
      <Button
        title="뒤로가기"
        onClick={() => {
          navigate(-1);
        }}
      />
      <Container>
        <TextInput
          height={20}
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <TextInput
          height={20}
          value={type}
          onChange={(event) => {
            setType(event.target.value);
          }}
        />
        <TextInput
          height={20}
          value={building_type}
          onChange={(event) => {
            setBuildingType(event.target.value);
          }}
        />
        <TextInput
          height={20}
          value={zonecode}
          onChange={(event) => {
            setZonecode(event.target.value);
          }}
        />
        <TextInput
          height={20}
          value={deal_type}
          onChange={(event) => {
            setDealType(event.target.value);
          }}
        />
        <TextInput
          height={20}
          value={supply_area}
          onChange={(event) => {
            setSupplyArea(event.target.value);
          }}
        />
        <TextInput
          height={20}
          value={exclusive_area}
          onChange={(event) => {
            setExclusiveArea(event.target.value);
          }}
        />
        <TextInput
          height={20}
          value={total_floor}
          onChange={(event) => {
            setTotalFloor(event.target.value);
          }}
        />
        <TextInput
          height={20}
          value={floor}
          onChange={(event) => {
            setFloor(event.target.value);
          }}
        />
        <TextInput
          height={20}
          value={heating}
          onChange={(event) => {
            setHeating(event.target.value);
          }}
        />
        <TextInput
          height={20}
          value={move_in_type}
          onChange={(event) => {
            setMoveInType(event.target.value);
          }}
        />
        <TextInput
          height={20}
          value={move_in_date}
          onChange={(event) => {
            setMoveInDate(event.target.value);
          }}
        />
        <TextInput
          height={20}
          value={manage_fee}
          onChange={(event) => {
            setManageFee(event.target.value);
          }}
        />
        <TextInput
          height={20}
          value={manage_type}
          onChange={(event) => {
            setManageType(event.target.value);
          }}
        />
        <TextInput
          height={20}
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <TextInput
          height={20}
          value={buildingcode}
          onChange={(event) => {
            setBuildingcode(event.target.value);
          }}
        />
        <TextInput
          height={20}
          value={build_year}
          onChange={(event) => {
            setBuildYear(event.target.value);
          }}
        />
        <TextInput
          height={20}
          value={road_name}
          onChange={(event) => {
            setRoadName(event.target.value);
          }}
        />
        <TextInput
          height={20}
          value={roadname_bonbun}
          onChange={(event) => {
            setRoadnameBonbun(event.target.value);
          }}
        />
        <TextInput
          height={20}
          value={roadname_bubun}
          onChange={(event) => {
            setRoadnameBubun(event.target.value);
          }}
        />
        <TextInput
          height={20}
          value={roadname_code}
          onChange={(event) => {
            setRoadnameCode(event.target.value);
          }}
        />
        <TextInput
          height={20}
          value={dong}
          onChange={(event) => {
            setDong(event.target.value);
          }}
        />
        <TextInput
          height={20}
          value={bonbun}
          onChange={(event) => {
            setBonbun(event.target.value);
          }}
        />
        <TextInput
          height={20}
          value={bubun}
          onChange={(event) => {
            setBubun(event.target.value);
          }}
        />
        <TextInput
          height={20}
          value={sigungucode}
          onChange={(event) => {
            setSigungucode(event.target.value);
          }}
        />
        <TextInput
          height={20}
          value={eubmyundongcode}
          onChange={(event) => {
            setEubmyundongcode(event.target.value);
          }}
        />
        <TextInput
          height={20}
          value={dongcode}
          onChange={(event) => {
            setDongcode(event.target.value);
          }}
        />
        <TextInput
          height={20}
          value={building_name}
          onChange={(event) => {
            setBuildingName(event.target.value);
          }}
        />
        <TextInput
          height={20}
          value={jibun}
          onChange={(event) => {
            setJibun(event.target.value);
          }}
        />
        <TextInput
          height={20}
          value={lng}
          onChange={(event) => {
            setLng(event.target.value);
          }}
        />
        <TextInput
          height={20}
          value={lat}
          onChange={(event) => {
            setLat(event.target.value);
          }}
        />
        <TextInput
          height={20}
          value={deal_complete}
          onChange={(event) => {
            setDealComplete(event.target.value);
          }}
        />
        <Button
          title="등록하기"
          onClick={() => {
            navigate("/");
          }}
        />
      </Container>
    </Wrapper>
  )
}

export default WriteItem;