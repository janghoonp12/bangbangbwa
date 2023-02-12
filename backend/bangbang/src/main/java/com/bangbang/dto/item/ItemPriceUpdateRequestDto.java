package com.bangbang.dto.item;

import com.bangbang.domain.item.ItemPrice;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class ItemPriceUpdateRequestDto {
  private long item_price_id; //PK
  private long item_id; //FK
  private Integer item_price_buy_house;
  private Integer item_price_house_deposit;
  private Integer item_price_month_deposit;
  private Integer item_price_month_rent;

  @Builder
  public ItemPriceUpdateRequestDto(long item_price_id, long item_id, Integer item_price_buy_house,
      Integer item_price_house_deposit, Integer item_price_month_deposit,
      Integer item_price_month_rent) {
    this.item_price_id = item_price_id;
    this.item_id = item_id;
    this.item_price_buy_house = item_price_buy_house;
    this.item_price_house_deposit = item_price_house_deposit;
    this.item_price_month_deposit = item_price_month_deposit;
    this.item_price_month_rent = item_price_month_rent;
  }

  public ItemPrice toEntity() {
    return ItemPrice.builder()
        .item_price_id(item_price_id)
        .item_id(item_id)
        .item_price_buy_house(item_price_buy_house)
        .item_price_house_deposit(item_price_house_deposit)
        .item_price_month_deposit(item_price_month_deposit)
        .item_price_month_rent(item_price_month_rent)
        .build();
  }
}