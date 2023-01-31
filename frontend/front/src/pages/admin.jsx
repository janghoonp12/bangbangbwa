import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminUser from "../component/admin/AdminUser";
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
          <input type="text" value={search} onChange={onChange} />
        </SDiv>
        <Routes>
          <Route index element={<AdminUser text={search} />} />
        </Routes>
      </div>
  )
}

export default Admin;