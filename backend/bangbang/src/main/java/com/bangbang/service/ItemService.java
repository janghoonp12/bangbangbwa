package com.bangbang.service;

import com.bangbang.domain.item.Item;

import com.bangbang.dto.item.ItemPriceSaveRequestDto;
import com.bangbang.dto.item.ItemSaveRequestDto;
import com.bangbang.dto.item.ManageOptionSaveRequestDto;
import com.bangbang.dto.item.OptionSaveRequestDto;
import java.util.List;

public interface ItemService {
    long newItem(ItemSaveRequestDto item);
    void newOption(OptionSaveRequestDto option, long item_id);
    void newManageOption(ManageOptionSaveRequestDto manageOption, long item_id);
    void newItemPrice(ItemPriceSaveRequestDto itemPrice, long item_id);
    List<Item> searchItemAll();
    List<Item> searchItemFilter();
    Item itemDetail(long itemId);
    void deactivateItem(long itemId);
    void modifyItem(Item item);
    void itemSold(long itemId);
}