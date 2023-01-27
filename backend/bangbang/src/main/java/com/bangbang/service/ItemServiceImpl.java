package com.bangbang.service;

import com.bangbang.domain.item.*;

import java.util.List;
import javax.transaction.Transactional;

import com.bangbang.domain.item.Item;
import com.bangbang.domain.item.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemServiceImpl implements ItemService {

  @Autowired
  private ItemRepository itemRepository;

  @Transactional
  @Override
  public void newItem(Item item) {
    itemRepository.save(item);
  }

  @Override
  public List<Item> searchItemAll() {
    return itemRepository.findTop100By();
  }

  @Override
  public List<Item> searchItemFilter() {
    return null;
  }

  @Override
  public Item itemDetail(int itemId) {
    return itemRepository.findById(itemId);
  }

  @Transactional
  @Override
  public void deactivateItem(int itemId) {
    Item item =  itemRepository.findById(itemId);
    item.setItem_status(1);
    itemRepository.save(item);
  }

  @Transactional
  @Override
  public void modifyItem(Item item) {
    itemRepository.save(item);
  }

  @Transactional
  @Override
  public void itemSold(int itemId) {
    Item item = itemRepository.findById(itemId);
    item.setItem_deal_complete(true);
    itemRepository.save(item);
  }
}