package com.bangbang.vo;

import javax.persistence.*;
import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@Entity
@Table(name="item")
@SuperBuilder
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int item_id;

    @Column(nullable = true)
    private int item_type;

    @Column(nullable = true)
    private int item_building_type;

    @Column(nullable = true)
    private int item_zonecode;

    @Column(nullable = true)
    private int item_deal_type;

    @Column(nullable = true)
    private int item_supply_area;

    @Column(nullable = true)
    private int item_exclusive_area;

    @Column(nullable = true)
    private int item_total_floor;

    @Column(nullable = true)
    private int item_floor;

    @Column(nullable = true)
    private int item_heating;

    @Column(nullable = true)
    private int item_move_in_type;

    @Column(nullable = true)
    private String item_move_in_date;

    @Column(nullable = true)
    private int item_manage_fee;

    @Column(nullable = true)
    private int item_manage_type;

    @Column(nullable = true)
    private String item_title;

    @Column(nullable = true)
    private String item_description;

    @Column(nullable = true)
    private String item_buildingcode;

    @Column(nullable = true)
    private String item_build_year;

    @Column(nullable = true)
    private String item_road_name;

    @Column(nullable = true)
    private String item_roadname_bonbun;
    @Column(nullable = true)
    private String item_roadname_bubun;

    @Column(nullable = true)
    private String item_roadname_code;

    @Column(nullable = true)
    private String item_dong;

    @Column(nullable = true)
    private String item_bonbun;

    @Column(nullable = true)
    private String item_bubun;

    @Column(nullable = true)
    private String item_sigungucode;

    @Column(nullable = true)
    private String item_eubmyundongcode;

    @Column(nullable = true)
    private String item_dongcode;

    @Column(nullable = true)
    private String item_building_name;

    @Column(nullable = true)
    private String item_jibun;

    @Column(nullable = true)
    private String item_lng;

    @Column(nullable = true)
    private String item_lat;

    @Column(nullable = true)
    private boolean item_deal_complete;

    @Column(nullable = true)
    private int broker_id; //FK

    @Column(nullable = true)
    private boolean item_status;

    @OneToOne
    @JoinColumn(name="item_id")
    private ItemPrice itemPrice;

    @OneToOne
    @JoinColumn(name="item_id")
    private ManageOption manageOption;

    @OneToOne
    @JoinColumn(name="option")
    private Option option;
}
