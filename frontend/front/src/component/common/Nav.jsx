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
          홈
        </NavLink>
      </Navdiv>
      <Navdiv>
        <NavLink to="/broadcasts">
          방송
        </NavLink>
      </Navdiv>
      <Navdiv>
        <NavLink to="/items">
          매물
        </NavLink>
      </Navdiv>
      <Navdiv>
        <NavLink to="/interests">
          관심
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