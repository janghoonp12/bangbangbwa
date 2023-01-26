import React from "react";
import areaData from "../../interestArea.json";
import InterestAreaList from "./InterestAreaList";



function InterestArea() {

  return (
    <div>
      <h3 align="center">관심 지역</h3>
      {areaData.map((area, index) => {
        return (
          <InterestAreaList
              key={`${area.id}`}
              area={area}
            />
        )
      })}
    </div>
  );
}

export default InterestArea;