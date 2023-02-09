import React, { useState, useEffect } from "react";
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

const SInput = styled.input`
  width: 40%;
  height: 60px;
  border-radius: 8px;
  border: 0.5px solid lightgrey;
`;

const SButton = styled.button`
  border-radius: 8px;
  margin-left: 10px;
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

// 한글 조사 처리 함수
function checkName(name){
  const charCode = name.charCodeAt(name.length - 1);

  const consonantCode = (charCode - 44032) % 28;
  
  if(consonantCode === 0){
      return `${name}가`;
  }
  return `${name}이`;
}


function InterestAreaAdd() {
  const [area, setArea] = useState('')
  const [onAdd, setOnAdd] = useState(false)
  const onChange = (e) => {
    setArea(e.target.value)
  };

  // 페이지 렌더링 시 시군구 코드 받아오기
  useEffect(() => {
    axios.get('/items/sido')
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  })

  const onClick = () => {
    setOnAdd(true)
  };

  const adding = () => {
    if (area) {
      const josa = checkName(area)
      alert(`즐겨찾기에 ${josa} 등록되었습니다.`)
      setArea('')
      setOnAdd(false)
    }
  }

  const activeEnter = (e) => {
    if (e.key === 'Enter') {
      adding()
    }
  }

  return (
    <SDiv>
      {!onAdd && <SImg src={addimg} alt="#" onClick={onClick} />}
      {onAdd && <SInput type="text" value={area} onChange={onChange} placeholder=" 찾으시는 지역을 입력해주세요." onKeyDown={(e) => activeEnter(e)} />}
      {onAdd && <SButton disabled={(area) ? false : true} onClick={adding}>등록</SButton>}
    </SDiv>
  )
}

export default InterestAreaAdd;