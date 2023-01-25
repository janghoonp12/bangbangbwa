package com.bangbang.service;

import com.bangbang.vo.Item;

import java.util.List;

public interface ItemService {
  void newItem(Item item);
  List<Item> searchItemAll();
  List<Item> searchItemFilter();
  Item itemDetail(int itemId);
  void deactivateItem(int itemId);
  void modifyItem(Item item);
  void itemSold(int itemId);
}
