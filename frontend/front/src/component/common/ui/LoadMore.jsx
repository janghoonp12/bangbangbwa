import styled from "styled-components";
import { useState } from "react";

const SButton = styled.button`
  border-radius: 8px;
  border: 0.5px solid lightgrey;
  background-color: lightgrey; 
  :hover {
    background: grey;
    border: 1px solid black;
  }
  margin-bottom: 30px;
`;


function judge(hap, perPage) {
  if (hap <= perPage) {
    return true;
  } else {
    return false;
  }
}

function LoadMore({ total, limit, loads, setLoads }) {
  const totalLoads = Math.ceil(total / limit);

  const isShow = judge(total, limit)

  function clickLoads() {
    if (loads+1 < totalLoads) {
      setLoads(loads + 1)
    } else if (loads+1 === totalLoads) {
      setLoads(loads + 1)
      let btn = document.querySelector("#button");
      btn.style.display = "none";
    }

  }

  return (
        <SButton  
        style={isShow ? {display:'none'} : {display:'inline'}}
        id="button"
        onClick={clickLoads}
        >Load More</SButton>
  )
}

export default LoadMore;