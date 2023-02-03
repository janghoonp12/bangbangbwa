import React from "react";
import alarmData from "../../alarmData.json";
import AlarmListItem from "./AlarmListItem";




function AlarmList() {
  return (
    <div>
      {alarmData.map((alarm, index) => {
          return (
              <AlarmListItem
                  key={alarm.id}
                  alarm={alarm}
              />
          );
      })}
    </div>
  )
}

export default AlarmList;