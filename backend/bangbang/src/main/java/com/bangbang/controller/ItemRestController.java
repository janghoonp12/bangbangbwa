package com.bangbang.controller;

import com.bangbang.dto.item.*;
import com.bangbang.service.ItemService;
import com.bangbang.domain.item.Item;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
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
public class ItemRestController {

    @Autowired
    private final ItemService itemService;

    @ApiOperation(value="매물 등록")
    @PostMapping("/items/new")
    public ResponseEntity<?> newItem(@RequestBody ObjectNode item) throws JsonProcessingException {
        try {
            /*
            데이터 입력 형식
            "item": {
            },
            "itemPrice": {
            },
            "manageOption": {
            },
            "option" {
            }
            * */
            ObjectMapper mapper = new ObjectMapper();
            ItemSaveRequestDto itemDto = mapper.treeToValue(item.get("item"), ItemSaveRequestDto.class);
            ItemPriceSaveRequestDto itemPrice = mapper.treeToValue(item.get("itemPrice"), ItemPriceSaveRequestDto.class);
            ManageOptionSaveRequestDto manage = mapper.treeToValue(item.get("manageOption"), ManageOptionSaveRequestDto.class);
            OptionSaveRequestDto option = mapper.treeToValue(item.get("option"), OptionSaveRequestDto.class);

            long item_id = itemService.newItem(itemDto);
            itemService.newItemPrice(itemPrice, item_id);
            itemService.newManageOption(manage, item_id);
            itemService.newOption(option, item_id);
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
    public ResponseEntity<?> itemDetail(@PathVariable("item_id") long itemId) {
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
    public ResponseEntity<?> deactivateItem(@RequestParam("itemId") long itemId) {
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
    public ResponseEntity<?> itemSold(@RequestParam("itemId") long itemId) {
        try {
            itemService.itemSold(itemId);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }

    @ApiOperation(value="시,도 가져오기")
    @GetMapping("/items/sido")
    public ResponseEntity<List<SidoDto>> sido() {
        try {
            List<SidoDto> list = itemService.getSido();
            if (list != null && !list.isEmpty())
                return new ResponseEntity<List<SidoDto>>(list, HttpStatus.OK);
            else return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }

    @ApiOperation(value="구,군 가져오기")
    @GetMapping("/items/gugun")
    public ResponseEntity<List<GugunDto>> gugun(@RequestParam("sidoCode") String sidoCode) {
        try {
            List<GugunDto> list = itemService.getGugunInSido(sidoCode);
            if (list != null && !list.isEmpty())
                return new ResponseEntity<List<GugunDto>>(list, HttpStatus.OK);
            else return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }

    @ApiOperation(value="동 가져오기")
    @GetMapping("/items/dong")
    public ResponseEntity<List<DongDto>> dong(@RequestParam("dongCode") String dongCode) {
        try {
            List<DongDto> list = itemService.getDongInGugun(dongCode);
            if (list != null && !list.isEmpty())
                return new ResponseEntity<List<DongDto>>(list, HttpStatus.OK);
            else return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }

    @ApiOperation(value="시,구,동 조회")
    @GetMapping("/items/sigudong")
    public ResponseEntity<?> sigudong(@RequestParam("dongCode") String dongCode) {
        try {
            SiGuDongDto s = itemService.getAddressName(dongCode);
            if (s != null)
                return new ResponseEntity<SiGuDongDto>(s, HttpStatus.OK);
            else return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }

    private ResponseEntity exceptionHandling() {
        return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}