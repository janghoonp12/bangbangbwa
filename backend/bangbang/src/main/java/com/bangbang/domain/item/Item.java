package com.bangbang.domain.item;

import javax.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@Entity
@Table(name="item")
@NoArgsConstructor
@SuperBuilder
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int item_id;

    @Column(nullable = true)
    private Integer item_type;

    @Column(nullable = true)
    private Integer item_building_type;

    @Column(nullable = true)
    private Integer item_zonecode;

    @Column(nullable = true)
    private Integer item_deal_type;

    @Column(nullable = true)
    private Integer item_supply_area;

    @Column(nullable = true)
    private Integer item_exclusive_area;

    @Column(nullable = true)
    private Integer item_total_floor;

    @Column(nullable = true)
    private Integer item_floor;

    @Column(nullable = true)
    private Integer item_heating;

    @Column(nullable = true)
    private Integer item_move_in_type;

    @Column(nullable = true)
    private String item_move_in_date;

    @Column(nullable = true)
    private Integer item_manage_fee;

    @Column(nullable = true)
    private Integer item_manage_type;

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
    private String item_road_name_bonbun;
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

    @Column(nullable = false)
    @JoinTable(name="broker",
            joinColumns = @JoinColumn(name="broker_id"),
            inverseJoinColumns = @JoinColumn(name="broker_id"))
    private int broker_id; //FK

    @Column(nullable = true)
    private Integer item_status;

    @OneToOne
    @JoinTable(name="item_price",
    joinColumns = @JoinColumn(name="item_id"),
    inverseJoinColumns = @JoinColumn(name="item_id"))
    private ItemPrice itemPrice;

    @OneToOne
    @JoinTable(name="manage_option",
            joinColumns = @JoinColumn(name="item_id"),
            inverseJoinColumns =  @JoinColumn(name="item_id"))
    private ManageOption manageOption;

    @OneToOne
    @JoinTable(name="options",
            joinColumns = @JoinColumn(name="item_id"),
            inverseJoinColumns =  @JoinColumn(name="item_id"))
    private Option option;
}
