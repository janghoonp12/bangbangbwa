import React from "react";
import styled from "styled-components";
// import Filter from "./Filter";

const SButton = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  border: 0.5px solid lightgrey;
  border-radius: 8px;
  cursor: pointer;
  background-color: #F8EDE3;
  :hover {
      border: 1px solid black;
  }
  margin-bottom: 10px;
`;

function FilterButton() {
  let status = false;
  function clickFilter() {
    let FilterDiv = document.querySelector("#filterDiv")
    if(status) {
      FilterDiv.style.cssText = "display: none;";
      status = false;
    } else if(!status) {
      FilterDiv.style.cssText = "";
      status = true;
    }
  }
  
  return (
    <SButton
      onClick={clickFilter}
    >필터</SButton>
  )
}

export default FilterButton;