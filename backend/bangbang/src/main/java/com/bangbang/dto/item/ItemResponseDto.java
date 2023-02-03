package com.bangbang.dto.item;

import com.bangbang.domain.item.Item;
import com.bangbang.domain.item.ItemPrice;
import com.bangbang.domain.item.ManageOption;
import com.bangbang.domain.item.Option;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemResponseDto {
    private long item_id;
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
    private Integer item_status;
    private Integer item_room;
    private Integer item_toilet;
    private ItemPrice itemPrice;
    private ManageOption manageOption;
    private Option option;

    public ItemResponseDto(Item entity) {
        this.item_id = entity.getItem_id();
        this.item_type = entity.getItem_type();
        this.item_building_type = entity.getItem_building_type();
        this.item_zonecode = entity.getItem_zonecode();
        this.item_deal_type = entity.getItem_deal_type();
        this.item_supply_area = entity.getItem_supply_area();
        this.item_exclusive_area = entity.getItem_exclusive_area();
        this.item_total_floor = entity.getItem_total_floor();
        this.item_floor = entity.getItem_floor();
        this.item_heating = entity.getItem_heating();
        this.item_move_in_type = entity.getItem_move_in_type();
        this.item_move_in_date = entity.getItem_move_in_date();
        this.item_manage_type = entity.getItem_manage_type();
        this.item_title = entity.getItem_title();
        this.item_description = entity.getItem_description();
        this.item_buildingcode = entity.getItem_buildingcode();
        this.item_build_year = entity.getItem_build_year();
        this.item_road_name = entity.getItem_road_name();
        this.item_road_name_bonbun = entity.getItem_road_name_bonbun();
        this.item_roadname_bubun = entity.getItem_roadname_bubun();
        this.item_roadname_code = entity.getItem_roadname_code();
        this.item_dong = entity.getItem_dong();
        this.item_bonbun = entity.getItem_bonbun();
        this.item_bubun = entity.getItem_bubun();
        this.item_sigungucode = entity.getItem_sigungucode();
        this.item_eubmyundongcode = entity.getItem_eubmyundongcode();
        this.item_dongcode = entity.getItem_dongcode();
        this.item_building_name = entity.getItem_building_name();
        this.item_jibun = entity.getItem_jibun();
        this.item_lng = entity.getItem_lng();
        this.item_lat = entity.getItem_lat();
        this.item_deal_complete = entity.isItem_deal_complete();
        this.broker_id = entity.getBroker_id();
        this.item_status = entity.getItem_status();
        this.item_room = entity.getItem_room();
        this.item_toilet = entity.getItem_toilet();
        this.itemPrice = entity.getItemPrice();
        this.manageOption = entity.getManageOption();
        this.option = entity.getOption();
    }
}
