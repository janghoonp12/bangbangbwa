import React from "react";
import areaData from "../../interestArea.json";
import InterestAreaList from "./InterestAreaList";
import InterestAreaAdd from "./InterestAreaAdd";



function InterestArea() {

  return (
    <div>
      <h3 align="center">관심 지역 추가하기</h3>
      <InterestAreaAdd />
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