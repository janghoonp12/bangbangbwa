import React from "react";
import { Routes, Route } from "react-router-dom";
import ItemAll from "../component/item/ItemAll";
import ItemDetail from "../component/item/ItemDetail";


function Items() {
  return (
    <div>
      <h1>Items</h1>
      <hr />
      <Routes>
        <Route index element={<ItemAll />} />
        <Route path=":postId" element={<ItemDetail />} />
      </Routes>
    </div>
  )
}

export default Items;