package com.bangbang.service;

import com.bangbang.vo.Item;
import com.bangbang.vo.ItemRepository;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemServiceImpl implements ItemService {

  @Autowired
  private ItemRepository repository;

  @Transactional
  @Override
  public void newItem(Item item) {
    repository.save(item);
  }

  @Override
  public List<Item> searchItemAll() {
    return repository.findAll();
  }

  @Override
  public List<Item> searchItemFilter() {
    return null;
  }

  @Override
  public Item itemDetail(int itemId) {
    return repository.findById(itemId);
  }

  @Transactional
  @Override
  public void deactivateItem(int itemId) {
    Item item = repository.findById(itemId);
    item.setItem_status(true);
    repository.save(item);
  }

  @Transactional
  @Override
  public void modifyItem(Item item) {
    repository.save(item);
  }

  @Transactional
  @Override
  public void itemSold(int itemId) {
    Item item = repository.findById(itemId);
    item.setItem_deal_complete(true);
    repository.save(item);
  }
}