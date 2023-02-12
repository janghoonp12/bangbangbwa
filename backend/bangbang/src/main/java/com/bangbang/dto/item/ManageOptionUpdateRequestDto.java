package com.bangbang.dto.item;

import com.bangbang.domain.item.ManageOption;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class ManageOptionUpdateRequestDto {
  private long manage_option_id; //PK
  private boolean manage_option_internet;
  private boolean manage_option_tv;
  private boolean manage_option_clean;
  private boolean manage_option_water;
  private boolean manage_option_gas;
  private boolean manage_option_electric;
  private String manage_option_etc;
  private long item_id; //FK

  @Builder
  public ManageOptionUpdateRequestDto(long manage_option_id, boolean manage_option_internet, boolean manage_option_tv, boolean manage_option_clean, boolean manage_option_water, boolean manage_option_gas, boolean manage_option_electric, String manage_option_etc, long item_id) {
    this.manage_option_id = manage_option_id;
    this.manage_option_internet = manage_option_internet;
    this.manage_option_tv = manage_option_tv;
    this.manage_option_clean = manage_option_clean;
    this.manage_option_water = manage_option_water;
    this.manage_option_gas = manage_option_gas;
    this.manage_option_electric = manage_option_electric;
    this.manage_option_etc = manage_option_etc;
    this.item_id = item_id;
  }

  public ManageOption toEntity() {
    return ManageOption.builder()
        .manage_option_id(manage_option_id)
        .manage_option_internet(manage_option_internet)
        .manage_option_tv(manage_option_tv)
        .manage_option_clean(manage_option_clean)
        .manage_option_water(manage_option_water)
        .manage_option_gas(manage_option_gas)
        .manage_option_electric(manage_option_electric)
        .manage_option_etc(manage_option_etc)
        .item_id(item_id)
        .build();
  }
}