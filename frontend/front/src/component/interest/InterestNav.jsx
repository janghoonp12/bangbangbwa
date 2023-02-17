import React from "react";
import { NavLink, useLocation } from "react-router-dom";
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
  :hover {
    background-color: lightgrey;
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
  const location = useLocation();

  let active = location.pathname === '/interests' ? true : false;

  return (
    <Navbar>
      <Navdiv>
        <NavLink style={active ? activeStyle : nonActiveStyle} to="/interests">
          최근 본 매물
        </NavLink>
      </Navdiv>
      <Navdiv>
        <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/interests/items">
          관심 매물
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

export default Nav;