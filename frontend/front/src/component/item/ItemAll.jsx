import React from "react";
import data from "../../data.json";
import ItemList from "./ItemList";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Filter from "../common/Filter";

function Items() {
  const navigate = useNavigate();
  const writeItem = () => {
    navigate("/writeitems")
  }
  return (
    <div>
      <Button variant="info" onClick={writeItem} style={{marginBottom: '10px'}}>매물 등록</Button>
      <Filter />
      <ItemList
          posts={data}
          onClickItem={(item) => {
              navigate(`/items/${item.id}`);
          }}
        />
    </div>
  )
}

export default Items;