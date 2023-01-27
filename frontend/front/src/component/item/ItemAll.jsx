import React from "react";
import data from "../../data.json";
import ItemList from "./ItemList";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function Items() {
  const navigate = useNavigate();
  const writeItem = () => {
    navigate("/writeitems")
  }
  return (
    <div>
      <Button variant="info" onClick={writeItem}>매물 등록</Button>
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