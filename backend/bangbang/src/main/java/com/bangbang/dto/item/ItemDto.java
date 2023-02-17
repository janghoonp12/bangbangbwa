package com.bangbang.dto.item;

import com.bangbang.domain.item.Item;
import com.bangbang.domain.item.ItemPrice;
import com.bangbang.domain.item.ManageOption;
import com.bangbang.domain.item.Option;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemDto {
    private Item item;
    private ItemPrice itemPrice;
    private ManageOption manageOption;
    private Option option;

    @QueryProjection
    public ItemDto(Item item, ItemPrice itemPrice, ManageOption manageOption, Option option) {
        this.item = item;
        this.itemPrice = itemPrice;
        this.manageOption = manageOption;
        this.option = option;
    }
}
