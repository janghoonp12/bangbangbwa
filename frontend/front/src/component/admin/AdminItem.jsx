import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";



function AdminItem() {
  // Item 전체 데이터 받아오기
  const [items, setItems] = useState();

  useEffect(() => {
    axios.get('/items?page=0&size=100000')
    .then((res) => {
      
      const items = res.data.content.map((obj) => {
        const id = obj.item.item_id
        const title = obj.item.item_title
        const dealType = (obj.item.item_deal_type === 0 ? '월세' : obj.item.item_deal_type === 1 ? '전세' : '매매')
        const itemType = (obj.item.item_building_type === 0 ? '원룸' : obj.item.item_building_type === 1 ? '투,쓰리룸' : obj.item.item_building_type === 2 ? '오피스텔' : '아파트')
        const price = (
          dealType === '월세' ? `${obj.itemPrice.item_price_month_deposit}/${obj.itemPrice.item_price_month_rent}` : 
          dealType === '전세' ? obj.itemPrice.item_price_house_deposit : obj.itemPrice.item_price_buy_house
        )
        const temp = { id, title, dealType, itemType, price }

        return temp
      })
      setItems(items)
    })
    .catch(err => console.log(err))
  }, [])


  const columns = [
    {field: 'id', headerName: 'ID', width: '100'},
    {field: 'title', headerName: '제목', width: '500'},
    {field: 'dealType', headerName: '거래 유형', width: '200'},
    {field: 'itemType', headerName: '종류', width: '200'},
    {field: 'price', headerName: '가격', width: '150'}
  ]

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
    {items && items.length ?
      <Box sx={{ height: 400, width: '70%'}}>
        <DataGrid
          style={{fontSize: '18px'}}
          rows={items}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box> : <p>로딩중입니다.</p>}
    </div>
  );
}

export default AdminItem;