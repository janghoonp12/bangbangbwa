import React from "react";
import { NavLink } from "react-router-dom";
import '../styles/Nav.css'

const Nav = () => {
  return (
    <nav>
      <div>
        <NavLink to="/">
          Home
        </NavLink>
      </div>
      <div>
        <NavLink to="/items">
          Items
        </NavLink>
      </div>
      <div>
        <NavLink to="/broadcasts">
          Broadcasts
        </NavLink>
      </div>
      <div>
        <NavLink to="/mypage">
          MyPage
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;