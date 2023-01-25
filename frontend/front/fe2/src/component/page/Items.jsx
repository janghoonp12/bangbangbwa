import React from "react";
import data from "../../data.json";
import ItemList from "../list/ItemList"
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function Items() {
  const navigate = useNavigate();
  const writeItem = () => {
    navigate("/writeitems")
  }
  return (
    <div>
      <h1>Items</h1>
      <Button variant="info" onClick={writeItem}>매물 등록</Button>
      <hr />
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