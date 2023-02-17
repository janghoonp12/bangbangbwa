package com.bangbang.dto.item;

import com.bangbang.domain.item.Option;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemFilterRequestDto {
    private int[] item_type;
    private int[] item_deal_type;
    private int[] item_price_buy_house;
    private int[] item_price_house_deposit;
    private int[] item_price_month_deposit;
    private int[] item_price_month_rent;
    private int[] item_exclusive_area;
    private int[] item_floor;
    private int[] item_build_year;
    private Option option;

    public ItemFilterRequestDto(int[] item_type, int[] item_deal_type, int[] item_price_buy_house, int[] item_price_house_deposit, int[] item_price_month_deposit,int[] item_price_month_rent, int[] item_floor, int[] item_build_year, Option option) {
        this.item_type = item_type;
        this.item_deal_type = item_deal_type;
        this.item_price_buy_house = item_price_buy_house;
        this.item_price_house_deposit = item_price_house_deposit;
        this.item_price_month_deposit = item_price_month_deposit;
        this.item_price_month_rent = item_price_month_rent;
        this.item_floor = item_floor;
        this.item_build_year = item_build_year;
        this.option = option;
    }
}
