import React from "react";
import { Routes, Route } from "react-router-dom";
import AlarmAll from "../component/alarm/AlarmAll";

function Alarm() {
    return (
        <div>
          <h1 align="center">알림</h1>
          <hr />
          <Routes>
            <Route index element={<AlarmAll />} />
          </Routes>
        </div>
    )
}

export default Alarm;