import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminUser from "../component/admin/AdminUser";
import AdminItem from "../component/admin/AdminItem";
import AdminBroadcast from "../component/admin/AdminBroadcast";
import AdminBroker from "../component/admin/AdminBroker";
import AdminNotice from "../component/admin/AdminNotice";
import AdminLive from "../component/admin/AdminLive";
import AdminNav from "../component/admin/AdminNav";
import styled from "styled-components";

const SDiv = styled.div`
  text-align: center;
  margin-top: 20px;
`


function Admin() {
  const [search, setSearch] = useState("");
  const onChange = (e) => {
          setSearch(e.target.value)
      }

  return (
      <div>
        <h1 align="center">관리자 페이지</h1>
        <hr />
        <AdminNav />
        <SDiv>
          검색 : <input type="text" value={search} onChange={onChange} />
        </SDiv>
        <Routes>
          <Route index element={<AdminUser text={search} />} />
          <Route path="items" element={<AdminItem text={search} />} />
          <Route path="broadcasts" element={<AdminBroadcast text={search} />} />
          <Route path="notices" element={<AdminNotice text={search} />} />
          <Route path="brokers" element={<AdminBroker text={search} />} />
          <Route path="lives" element={<AdminLive text={search} />} />
        </Routes>
      </div>
  )
}

export default Admin;