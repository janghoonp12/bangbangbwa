import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import noticelogo from "../../assets/noticelogo.png"
import alarmlogo from "../../assets/alarmlogo.png"
import mypagelogo from "../../assets/mypagelogo.png"
import logo from "../../assets/logo.png"
import searchbutton from "../../assets/searchbutton.png"

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
  width: 600px;
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
`;

const SInput = styled.input`
  width: 400px;
  height: 35px;
  border-radius: 10px;
  border: 0 solid black;
`;


const Nav = () => {
  const [search, setSearch] = useState("");
  const onChange = (e) => {
          setSearch(e.target.value)
      }
 
  const activeEnter = (e) => {
    if (e.key === 'Enter') {
      onClick()
    }
  }

  const navigate = useNavigate();
  const onClick = () => {
    if (search) {
      alert(`${search} 검색`)
      setSearch('')
      navigate('/')
    }
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
           <SInput type="text" value={search} onChange={onChange} onKeyDown={(e) => activeEnter(e)} placeholder=" 검색어를 입력하세요" />
           <SButton disabled={(search) ? false : true}><SImg src={searchbutton} alt="#" onClick={onClick} /></SButton>
        </NavSearchBarDiv>
        <NavDiv>
          <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/notices">
            <SImg src={noticelogo} alt="#" />
          </NavLink>
        </NavDiv>
        <NavDiv>
          <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/alarm ">
          <SImg src={alarmlogo} alt="#" />
          </NavLink>
        </NavDiv>
        <NavDiv>
          <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/mypage">
          <SImg src={mypagelogo} alt="#" />
          </NavLink>
        </NavDiv>
      </NavRightDiv>
    </Navbar>
  );
};

export default Nav;