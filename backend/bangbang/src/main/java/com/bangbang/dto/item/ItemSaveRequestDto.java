package com.bangbang.dto.item;

import com.bangbang.domain.item.Item;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ItemSaveRequestDto {
    private long item_id; //PK
    private Integer item_type;
    private Integer item_building_type;
    private Integer item_zonecode;
    private Integer item_deal_type;
    private Integer item_supply_area;
    private Integer item_exclusive_area;
    private Integer item_total_floor;
    private Integer item_floor;
    private Integer item_heating;
    private Integer item_move_in_type;
    private String item_move_in_date;
    private Integer item_manage_fee;
    private Integer item_manage_type;
    private String item_title;
    private String item_description;
    private String item_buildingcode;
    private String item_build_year;
    private String item_road_name;
    private String item_road_name_bonbun;
    private String item_roadname_bubun;
    private String item_roadname_code;
    private String item_dong;
    private String item_bonbun;
    private String item_bubun;
    private String item_sigungucode;
    private String item_eubmyundongcode;
    private String item_dongcode;
    private String item_building_name;
    private String item_jibun;
    private String item_lng;
    private String item_lat;
    private boolean item_deal_complete;
    private long broker_id; //FK
    private Integer item_status; //0 비활성화 1 활성화 2 임시저장
    private Integer item_room;
    private Integer item_toilet;

    @Builder
    public ItemSaveRequestDto(Integer item_type, Integer item_building_type, Integer item_zonecode, Integer item_deal_type, Integer item_supply_area, Integer item_exclusive_area, Integer item_total_floor, Integer item_floor, Integer item_heating, Integer item_move_in_type, String item_move_in_date, Integer item_manage_fee, Integer item_manage_type, String item_title, String item_description, String item_buildingcode, String item_build_year, String item_road_name, String item_road_name_bonbun, String item_roadname_bubun, String item_roadname_code, String item_dong, String item_bonbun, String item_bubun, String item_sigungucode, String item_eubmyundongcode, String item_dongcode, String item_building_name, String item_jibun, String item_lng, String item_lat, boolean item_deal_complete, long broker_id, Integer item_status, Integer item_room, Integer item_toilet) {
        this.item_type = item_type;
        this.item_building_type = item_building_type;
        this.item_zonecode = item_zonecode;
        this.item_deal_type = item_deal_type;
        this.item_supply_area = item_supply_area;
        this.item_exclusive_area = item_exclusive_area;
        this.item_total_floor = item_total_floor;
        this.item_floor = item_floor;
        this.item_heating = item_heating;
        this.item_move_in_type = item_move_in_type;
        this.item_move_in_date = item_move_in_date;
        this.item_manage_fee = item_manage_fee;
        this.item_manage_type = item_manage_type;
        this.item_title = item_title;
        this.item_description = item_description;
        this.item_buildingcode = item_buildingcode;
        this.item_build_year = item_build_year;
        this.item_road_name = item_road_name;
        this.item_road_name_bonbun = item_road_name_bonbun;
        this.item_roadname_bubun = item_roadname_bubun;
        this.item_roadname_code = item_roadname_code;
        this.item_dong = item_dong;
        this.item_bonbun = item_bonbun;
        this.item_bubun = item_bubun;
        this.item_sigungucode = item_sigungucode;
        this.item_eubmyundongcode = item_eubmyundongcode;
        this.item_dongcode = item_dongcode;
        this.item_building_name = item_building_name;
        this.item_jibun = item_jibun;
        this.item_lng = item_lng;
        this.item_lat = item_lat;
        this.item_deal_complete = item_deal_complete;
        this.broker_id = broker_id;
        this.item_status = item_status;
        this.item_room = item_room;
        this.item_toilet = item_toilet;
    }

    public Item toEntity() {
        return Item.builder()
                .item_type(item_type)
                .item_building_type(item_building_type)
                .item_zonecode(item_zonecode)
                .item_deal_type(item_deal_type)
                .item_supply_area(item_supply_area)
                .item_exclusive_area(item_exclusive_area)
                .item_total_floor(item_total_floor)
                .item_floor(item_floor)
                .item_heating(item_heating)
                .item_move_in_type(item_move_in_type)
                .item_move_in_date(item_move_in_date)
                .item_manage_fee(item_manage_fee)
                .item_manage_type(item_manage_type)
                .item_title(item_title)
                .item_description(item_description)
                .item_buildingcode(item_buildingcode)
                .item_build_year(item_build_year)
                .item_road_name(item_road_name)
                .item_road_name_bonbun(item_road_name_bonbun)
                .item_roadname_bubun(item_roadname_bubun)
                .item_roadname_code(item_roadname_code)
                .item_dong(item_dong)
                .item_bonbun(item_bonbun)
                .item_bubun(item_bubun)
                .item_sigungucode(item_sigungucode)
                .item_eubmyundongcode(item_eubmyundongcode)
                .item_dongcode(item_dongcode)
                .item_building_name(item_building_name)
                .item_jibun(item_jibun)
                .item_lng(item_lng)
                .item_lat(item_lat)
                .item_deal_complete(item_deal_complete)
                .broker_id(broker_id)
                .item_status(item_status)
                .item_room(item_room)
                .item_toilet(item_toilet)
                .build();
    }
}
