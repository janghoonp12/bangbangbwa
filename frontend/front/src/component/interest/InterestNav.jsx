import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Navbar = styled.nav`
  position: flex;
  top: 0;
  width: 50%;
  height: 50px;
  margin: auto;
  display: flex;
  border: solid 2px grey;
`;

const Navdiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const activeStyle = {
  'text-decoration': 'none',
  color: '#289951',
  fontWeight: 700,
};

const nonActiveStyle = {
  'text-decoration': 'none',
  color: '#000000',
};

const InterestNav = () => {
  return (
    <Navbar>
      <Navdiv>
        <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/interests/recents">
          최근 본 매물
        </NavLink>
      </Navdiv>
      <Navdiv>
        <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/interests/items">
          관심 매물
        </NavLink>
      </Navdiv>
      <Navdiv>
        <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/interests/areas">
          관심 지역
        </NavLink>
      </Navdiv>
      <Navdiv>
        <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/interests/bookmarks">
          즐겨찾기
        </NavLink>
      </Navdiv>
    </Navbar>
  );
};

export default InterestNav;