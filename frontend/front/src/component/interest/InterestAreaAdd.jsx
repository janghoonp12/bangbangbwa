import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import addimg from "../../assets/addimg.png"

const SDiv = styled.div`
  background-color: #DFD3C3;
  border-radius: 2em;
  margin-bottom: 60px;
  height: 100px;  
  justify-content: center;
  display: flex;
  align-items: center;
`;

const SImg = styled.img`
  width: 80px;
  height: 80px;
  :hover {
    cursor: pointer;
  }
`;

const SButton = styled.button`
  border-radius: 8px;
  width: 10%;
  height: 60px;
  font-size: 30px;
  border: 0.5px solid lightgrey;
  background-color: rgba(183, 217, 98, 0.5);

  :hover {
    border: 1px solid black;
    background-color: rgba(183, 217, 98, 1);
  }
`;

const SSelect = styled.select`
  margin-right: 50px;
  height: 50px;
  width: 200px;
`;


function InterestAreaAdd() {

  const [onAdd, setOnAdd] = useState(false)
  // 시도 고르기
  const [sidoAll, setSidoAll] = useState('')
  const [sido, setSido] = useState('')
  const sidoSelect = (e) => {
    setSido(e.target.value)
    axios.get(`/items/gugun/${e.target.value}`)
    .then(res => {
      setGugunAll(res.data)
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

  const onClick = () => {
    axios.get('/items/sido')
    .then(res => {
      setSidoAll(res.data)
    })
    .catch(err => {
      console.log(err)
    })
    setOnAdd(true)
  };

  // 등록
  const adding = () => {
    const accessToken = sessionStorage.getItem("access-token");

    if (dong) {
      const data = {
        'interest_dongcode': dong
      }
      axios.post('/user/interest/areas/new', data, {
        headers: {
          "X-AUTH-TOKEN" : `Bearer ${accessToken}`
        }
      })
      .then(response => {
        alert(`${sido} ${gugun} ${dong}이 관심지역에 추가되었습니다.`)
        setOnAdd(false)
        setSidoAll('')
        setGugunAll('')
        setDongAll('')
      })
      .catch(error => {
        console.error(error);
      })
    }
  }

  return (
    <SDiv>
      {!onAdd && <SImg src={addimg} alt="#" onClick={onClick} />}
      {onAdd && 
      <div>
        <SSelect onChange={sidoSelect}>
        <option value="" disabled selected style={{display: "none"}}>시/도</option>
          {(sidoAll) ? sidoAll.map((sido, index) => {
            return (
              <option key={sido.sidoCode} value={sido.sidoCode}>{sido.sidoName}</option>
            )
          }) : null}
        </SSelect>
        <SSelect onChange={gugunSelect}>
        <option value="" disabled selected style={{display: "none"}}>구/군</option>
          {(gugunAll) ? gugunAll.map((gugun, index) => {
            return (
              <option key={gugun.gugunCode} value={gugun.gugunCode}>{gugun.gugunName}</option>
            )
          }) : null}
        </SSelect>
        <SSelect onChange={dongSelect}>
        <option value="" disabled selected style={{display: "none"}}>동/리</option>
          {(dongAll) ? dongAll.map((dong, index) => {
            return (
              <option key={dong.dongCode} value={dong.dongCode}>{dong.dongName}</option>
            )
          }) : null}
        </SSelect>
      </div>}
      {onAdd && <SButton disabled={(dong) ? false : true} onClick={adding}>등록</SButton>}
    </SDiv>
  )
}

export default InterestAreaAdd;