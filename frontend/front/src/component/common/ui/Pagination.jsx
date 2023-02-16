import styled from "styled-components";
import { useState } from "react";

function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);
  const [currPage, setCurrPage] = useState(page)
  let firstNum = currPage - (currPage % 5) + 1
  let lastNum = currPage - (currPage % 5) + 5

  return (
    <Nav> 
      <Button 
        onClick={() => {setPage(page-1); setCurrPage(page-2);}} 
        disabled={page===1}
      >
        &lt;
      </Button>
      <Button 
        onClick={() => setPage(firstNum)}
        aria-current={page === firstNum ? "page" : null}
      >
        {firstNum}
      </Button>
      {Array(4).fill().map((_, i) => {
        if(i <=2){
          return (
            <Button
              key={i+1} 
              onClick={() => {setPage(firstNum+1+i)}}
              aria-current={page === firstNum+1+i ? "page" : null}
              style={(firstNum+1+i > numPages ? {display:"none"} : null)}
            >
              {firstNum+1+i}
            </Button>
          )
        }else if(i>=3){
          return (
            <Button 
              key ={i+1}
              onClick={() => setPage(lastNum)}
              aria-current={page === lastNum ? "page" : null}
              // disabled={(page>=numPages) ? true : false}
              style={(lastNum >numPages ? {display:"none"} : null)}
            >
              {lastNum}
            </Button>
          )  
        }
        // <SP><input type="checkbox" onClick={(e) => dealTypeChange('1', e)} disabled={(dealType === '1' || !dealType) ? false : true}/> 월세</SP>
      })}
      <Button 
        onClick={() => {setPage(page+1); setCurrPage(page);}} 
        disabled={page===numPages}
      >
        &gt;
      </Button>       
    </Nav>
  )
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: grey;
  color: white;
  font-size: 1rem;

  &:hover {
    background: lightgrey;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: lightgrey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: #F8EDE3;
    font-weight: bold;
    color: black;
    cursor: revert;
    transform: revert;
  }
`;

export default Pagination;
