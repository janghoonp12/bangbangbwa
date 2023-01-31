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
  border-radius: 2em;
`;

const Navdiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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


const AdminNav = () => {
  const location = useLocation();

  let active = location.pathname === '/admin' ? true : false;

  return (
    <Navbar>
      <Navdiv>
        <NavLink style={active ? activeStyle : nonActiveStyle} to="/admin">
          유저
        </NavLink>
      </Navdiv>
      <Navdiv>
        <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/admin/items">
          매물
        </NavLink>
      </Navdiv>
      <Navdiv>
        <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/admin/broadcasts">
          방송
        </NavLink>
      </Navdiv>
      <Navdiv>
        <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/admin/brokers">
          중개사
        </NavLink>
      </Navdiv>
      <Navdiv>
        <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/admin/notices">
          공지
        </NavLink>
      </Navdiv>
      <Navdiv>
        <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/admin/lives">
          라이브
        </NavLink>
      </Navdiv>
    </Navbar>
  );
};

export default AdminNav;