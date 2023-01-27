package com.bangbang.controller;

import com.bangbang.service.ItemService;
import com.bangbang.domain.item.Item;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Api(value="ItemController Version 1")
public class ItemController {

  @Autowired
  private final ItemService itemService;

  @ApiOperation(value="매물 등록")
  @PostMapping("/items/new")
  public ResponseEntity<?> newItem(@RequestBody Item item) {
    try {
      itemService.newItem(item);
      return new ResponseEntity(HttpStatus.OK);
    } catch (Exception e) {
      return exceptionHandling();
    }
  }

  @ApiOperation(value="매물 전체 검색")
  @GetMapping("/items")
  public ResponseEntity<?> searchItemAll() {
    try {
      List<Item> item = itemService.searchItemAll();
      if (item != null && !item.isEmpty())
        return new ResponseEntity<List<Item>>(item, HttpStatus.OK);
      else return new ResponseEntity(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return exceptionHandling();
    }
  }

  //필터 만들기

  @ApiOperation(value="매물 상세 정보")
  @GetMapping("/items/{item_id}")
  public ResponseEntity<?> itemDetail(@PathVariable("item_id") int itemId) {
    try {
      Item item = itemService.itemDetail(itemId);
      if (item != null)
        return new ResponseEntity<Item>(item, HttpStatus.OK);
      else return new ResponseEntity(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return exceptionHandling();
    }
  }

  //매물 삭제 구현
  @ApiOperation(value="매물 삭제(비활성화)")
  @PatchMapping("/items/deactivate")
  public ResponseEntity<?> deactivateItem(@RequestParam("itemId") int itemId) {
    try {
      itemService.deactivateItem(itemId);
      return new ResponseEntity(HttpStatus.OK);
    } catch (Exception e) {
      return exceptionHandling();
    }
  }

  @ApiOperation(value="매물 수정")
  @PatchMapping("/items/modify")
  public ResponseEntity<?> modifyItem(@RequestBody Item item) {
    try {
      itemService.modifyItem(item);
      return new ResponseEntity(HttpStatus.OK);
    } catch (Exception e) {
      return exceptionHandling();
    }
  }

  @ApiOperation(value="매물 거래완료")
  @PatchMapping("/items/sold")
  public ResponseEntity<?> itemSold(@RequestParam("itemId") int itemId) {
    try {
      itemService.itemSold(itemId);
      return new ResponseEntity(HttpStatus.OK);
    } catch (Exception e) {
      return exceptionHandling();
    }
  }

  private ResponseEntity exceptionHandling() {
    return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
  }
}