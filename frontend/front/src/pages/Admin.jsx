import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminUser from "../component/admin/AdminUser";
import AdminItem from "../component/admin/AdminItem";
import AdminBroadcast from "../component/admin/AdminBroadcast";
// import AdminBroker from "../component/admin/AdminBroker";
import AdminNotice from "../component/admin/AdminNotice";
import AdminLive from "../component/admin/AdminLive";
import AdminNav from "../component/admin/AdminNav";




function Admin() {

  return (
      <div>
        <h1 align="center">관리자 페이지</h1>
        <hr />
        <AdminNav />
        <Routes>
          <Route index element={<AdminUser />} />
          <Route path="items" element={<AdminItem />} />
          <Route path="broadcasts" element={<AdminBroadcast />} />
          <Route path="notices" element={<AdminNotice />} />
          {/* <Route path="brokers" element={<AdminBroker />} /> */}
          <Route path="lives" element={<AdminLive />} />
        </Routes>
      </div>
  )
}

export default Admin;