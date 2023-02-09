package com.bangbang.controller;

import com.bangbang.domain.item.ItemPrice;
import com.bangbang.domain.item.ManageOption;
import com.bangbang.domain.item.Option;
import com.bangbang.dto.item.*;
import com.bangbang.service.ItemService;
import com.bangbang.domain.item.Item;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

    @ApiImplicitParams({
        @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 발급 받은 access_token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation(value="매물 등록")
    @PostMapping("/broker/items/new")
    public ResponseEntity<?> newItem(@RequestBody ObjectNode item) throws JsonProcessingException {
        try {
            /*
            데이터 입력 형식
            {
                "item": {
                },
                "itemPrice": {
                },
                "manageOption": {
                },
                "option" {
                }
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

    @ApiOperation(value="매물 전체 검색 (pagination)")
    @GetMapping("/items")
    public ResponseEntity<?> searchItemAll(@RequestParam(defaultValue="0") Integer page,
                                           @RequestParam(defaultValue="10") Integer size) {
        try {
            Page<ItemDto> item = itemService.searchItemAll(page, size);
            if (item != null && item.hasContent())
                return new ResponseEntity<Page<ItemDto>>(item, HttpStatus.OK);
            else return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }

    @ApiOperation(value = "매물 필터 검색")
    @PostMapping("/items/filter")
    public ResponseEntity<?> searchItemFilter(@RequestBody ItemFilterRequestDto filter) {
        try {
            List<ItemDto> item = itemService.searchItemByFilter(filter);
            if (item != null && !item.isEmpty())
                return new ResponseEntity<List<ItemDto>>(item, HttpStatus.OK);
            else return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return exceptionHandling();
        }

    }

    @ApiOperation(value="매물 상세 정보")
    @GetMapping("/items/{item_id}")
    public ResponseEntity<?> itemDetail(@PathVariable("item_id") long itemId) {
        try {
            ItemResponseDto item = itemService.itemDetail(itemId);
            if (item != null)
                return new ResponseEntity<ItemResponseDto>(item, HttpStatus.OK);
            else return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }

    @ApiImplicitParams({
        @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 발급 받은 access_token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation(value="매물 삭제(비활성화)")
    @PatchMapping("/broker/items/deactivate/{item_id}")
    public ResponseEntity<?> deactivateItem(@PathVariable("item_id") long itemId) {
        try {
            itemService.deactivateItem(itemId);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }

    @ApiImplicitParams({
        @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 발급 받은 access_token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation(value="매물 수정")
    @PatchMapping("/broker/items/modify")
    public ResponseEntity<?> modifyItem(@RequestBody Item item) {
        try {
            itemService.modifyItem(item);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }

    @ApiImplicitParams({
        @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 발급 받은 access_token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation(value="매물 거래완료")
    @PatchMapping("/broker/items/sold/{item_id}")
    public ResponseEntity<?> itemSold(@PathVariable("item_id") long itemId) {
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
    @GetMapping("/items/gugun/{sidoCode}")
    public ResponseEntity<List<GugunDto>> gugun(@PathVariable("sidoCode") String sidoCode) {
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
    @GetMapping("/items/dong/{dongCode}")
    public ResponseEntity<List<DongDto>> dong(@PathVariable("dongCode") String dongCode) {
        try {
            List<DongDto> list = itemService.getDongInGugun(dongCode);
            if (list != null && !list.isEmpty())
                return new ResponseEntity<List<DongDto>>(list, HttpStatus.OK);
            else return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }

    @ApiOperation(value="시,구,동 조회 후 이름 return")
    @GetMapping("/items/sigudong/{dongCode}")
    public ResponseEntity<?> sigudong(@PathVariable("dongCode") String dongCode) {
        try {
            SiGuDongDto s = itemService.getAddressName(dongCode);
            if (s != null)
                return new ResponseEntity<SiGuDongDto>(s, HttpStatus.OK);
            else return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }

    @ApiOperation(value="시,구,동 기준으로 매물 조회")
    @GetMapping("/items/sigudongAll/{dongCode}")
    public ResponseEntity<?> sigudongAll(@PathVariable("dongCode") String dongCode) {
        try {
            List<ItemDto> list = itemService.searchSiGuDongAll(dongCode);
            if (list != null)
                return new ResponseEntity<List<ItemDto>>(list, HttpStatus.OK);
            else return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }

    private ResponseEntity exceptionHandling() {
        return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}