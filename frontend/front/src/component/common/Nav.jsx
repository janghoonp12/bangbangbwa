import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Navbar = styled.nav`
  position: flex;
  top: 0;
  width: 100%;
  height: 60px;
  background-color: #F8EDE3;
  display: flex;
  border: solid 2px;
`;

const NavDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    background: #DFD3C3;
  }
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


const Nav = () => {
  return (
    <Navbar>
      <NavDiv>
        <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/">
          홈
        </NavLink>
      </NavDiv>
      <NavDiv>
        <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/broadcasts">
          방송
        </NavLink>
      </NavDiv>
      <NavDiv>
        <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/items">
          매물
        </NavLink>
      </NavDiv>
      <NavDiv>
        <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/interests">
          관심
        </NavLink>
      </NavDiv>
      <NavDiv>
        <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/notices">
          공지
        </NavLink>
      </NavDiv>
      <NavDiv>
        <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/alarm ">
          알림
        </NavLink>
      </NavDiv>
      <NavDiv>
        <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/mypage">
          MyPage
        </NavLink>
      </NavDiv>
    </Navbar>
  );
};

export default Nav;