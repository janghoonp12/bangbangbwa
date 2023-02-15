import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import noticelogo from "../../assets/noticelogo.png"
// import alarmlogo from "../../assets/alarmlogo.png"
import mypagelogo from "../../assets/mypagelogo.png"
import logo from "../../assets/logo.png"
import searchbutton from "../../assets/searchbutton.png"
// import AlarmList from "../alarm/AlarmList";
import axios from "axios";
import SearchInfoModal from "./ui/SearchInfoModal";
import { FaSignOutAlt } from "react-icons/fa";

import { useDispatch, useSelector } from 'react-redux';

import { logout } from "../../reducers/userSlice"

const Navbar = styled.nav`
  position: flex;
  top: 0;
  width: 100%;
  height: 60px;
  background-color: #F8EDE3;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const NavDiv = styled.div`
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    background: #DFD3C3;
  }
`;

const NavSearchBarDiv = styled.div`
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const NavLeftDiv = styled.div`
  height: 60px;
  display: flex;
  flex-direction: row;
  margin-left: 20px;
`;

const NavRightDiv = styled.div`
  height: 60px;
  display: flex;
  flex-direction: row;
  margin-right: 20px;
`;

const NavNameDiv = styled.div`
  width: 50px;
  height: 60px;
  margin-left: 15px;
  margin-right: 5px;
  font-size: 25px;
  font-weight: bold;
  color: rgba(214, 174, 242, 1);
`;


const activeStyle = {
  'textDecoration': 'none',
  color: '#289951',
  fontWeight: 700,
};

const nonActiveStyle = {
  'textDecoration': 'none',
  color: '#000000',
};

const SImg = styled.img`
  width: 30px;
  height: 30px;
`;

const SButton = styled.button`
  border-radius: 10px;
  margin-left: 10px;
  height: 35px;
  border: 0 solid black;
  background-color: #00ff0000; 
`;

const SLogoImg = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 7px;
`;

const SInput = styled.input`
  width: 300px;
  height: 35px;
  border-radius: 10px;
  border: 0 solid black;
`;

// const TestDiv = styled.div`
//   position: absolute;
//   top: 65px;
//   right: 10px;
//   background-color: white;
//   border: 1px solid lightgrey;
//   border-radius: 8px;
// `;

const SSelect = styled.select`
  margin-right: 2 0px;
  height: 40px;
  width: 200px;
  border-radius: 8px;
`;

const LogoutIcon = styled(FaSignOutAlt)`
  cursor: pointer;
  font-size: 30px;

`


const Nav = () => {
  const dispatch = useDispatch();
  // 로그인 여부 파악
  const { me } = useSelector((state) => state.userSlice);

  // 페이지 렌더링시 시도코드 받아오기
  useEffect(() => {
    axios.get('/items/sido')
    .then(res => {
      setSidoAll(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  },[])


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


  // const [alarmBar, setAlarmBar] = useState(false);
  const [search, setSearch] = useState('');
  const onChange = (e) => {
          setSearch(e.target.value)
      }
 
  const activeEnter = (e) => {
    if (e.key === 'Enter') {
      onClick()
    }
  }

  const navigate = useNavigate();

  // 검색
  const onClick = () => {
    if (search || dong) {
      navigate(`/items/search/${search}&${dong}`)
      console.log(sido, gugun)
      setSearch('')
      setGugunAll('')
      setDongAll('')
      setDong('')
    }
  }

  const signOut = () => {
    dispatch(logout());
    navigate("/")
  }


  return (
    <Navbar>
      <NavLeftDiv>
        <NavDiv>
          <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/">
          <SLogoImg src={logo} alt="#" />
          </NavLink>
        </NavDiv>
        <NavNameDiv>
          <p style={{lineHeight: '60px'}}>방방</p>
        </NavNameDiv>
        <NavDiv>
          <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/broadcasts">
            방송
          </NavLink>
        </NavDiv>
          <p style={{lineHeight: '60px'}}>|</p>
        <NavDiv>
          <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/items">
            매물
          </NavLink>
        </NavDiv>
        <p style={{lineHeight: '60px'}}>|</p>
        <NavDiv>
          <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/interests">
            관심
          </NavLink>
        </NavDiv>
      </NavLeftDiv>
      <NavRightDiv>
        <NavSearchBarDiv>
          <SearchInfoModal />
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
        </NavSearchBarDiv>
        <NavSearchBarDiv>
           <SInput type="text" value={search} onChange={onChange} onKeyDown={(e) => activeEnter(e)} placeholder=" 검색어를 입력하세요" />
           <SButton disabled={(search || dong) ? false : true}><SImg src={searchbutton} alt="#" onClick={onClick} /></SButton>
        </NavSearchBarDiv>
        <NavDiv>
          <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/notices">
            <SImg src={noticelogo} alt="#" />
          </NavLink>
        </NavDiv>
        {/* <NavDiv
          onMouseEnter={() => setAlarmBar(true)}
          onMouseLeave={() => setAlarmBar(false)}
        >
          <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/alarm ">
          <SImg src={alarmlogo} alt="#" />
          </NavLink>
          {alarmBar && (
            <TestDiv
              onMouseEnter={() => setAlarmBar(true)}
              onMouseLeave={() => setAlarmBar(false)}
            >
              <AlarmList />
            </TestDiv>
          )}
        </NavDiv> */}
          { me ? <NavDiv><NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/mypage">
          <SImg src={mypagelogo} alt="#" />
          </NavLink></NavDiv> : <></>
          }
          {/* {isLogin &&
          <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/mypage">
          <SImg src={mypagelogo} alt="#" />
          </NavLink>
          }
          {!isLogin &&
          <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/signin">
            로그인  
          </NavLink>
          } */}
        <NavDiv>
        { me ? <LogoutIcon onClick={signOut}></LogoutIcon> : <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/signin">
            로그인  
          </NavLink>
          }
        </NavDiv>
      </NavRightDiv>
    </Navbar>
  );
};

export default Nav;