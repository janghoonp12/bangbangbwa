import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Navbar = styled.nav`
  position: flex;
  top: 0;
  width: 100%;
  height: 60px;
  
  display: flex;
  border: solid 2px;
`;

const Navdiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nav = () => {
  return (
    <Navbar>
      <Navdiv>
        <NavLink to="/">
          Home
        </NavLink>
      </Navdiv>
      <Navdiv>
        <NavLink to="/items">
          Items
        </NavLink>
      </Navdiv>
      <Navdiv>
        <NavLink to="/broadcasts">
          Broadcasts
        </NavLink>
      </Navdiv>
      <Navdiv>
        <NavLink to="/mypage">
          MyPage
        </NavLink>
      </Navdiv>
    </Navbar>
  );
};

export default Nav;