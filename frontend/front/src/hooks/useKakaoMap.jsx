import { useEffect } from "react";

function useKakaoMap(item) {
  useEffect(() => {
    var marker = [
      {
        position: new window.kakao.maps.LatLng(
          item.item.item_lng,
          item.item.item_lat
        ),
        text: item.item.item_title,
      },
    ];
    
    // 카카오 지도
    var mapContainer = document.getElementById(item.item.item_id);

    var options = {
      center: new window.kakao.maps.LatLng(
        item.item.item_lng,
        item.item.item_lat
      ),
      level: 5,
      marker: marker,
    };
    var map = new window.kakao.maps.StaticMap(mapContainer, options);
  }, [item]);
}

export default useKakaoMap;