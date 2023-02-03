import styled from "styled-components";

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

function LoadMore({ total, limit, loads, setLoads }) {
  const totalLoads = Math.ceil(total / limit);
  
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
      id="button"
      onClick={clickLoads}
    >Load More</SButton>
  )
}

export default LoadMore;