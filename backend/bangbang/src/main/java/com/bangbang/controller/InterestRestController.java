package com.bangbang.controller;

import com.bangbang.domain.interest.Interestarea;
import com.bangbang.domain.interest.InterestareaRepository;
import com.bangbang.domain.interest.Interestitem;
import com.bangbang.domain.item.Item;
import com.bangbang.dto.broker.BrokerResponseDto;
import com.bangbang.dto.broker.BrokerSaveRequestDto;
import com.bangbang.dto.interest.InterestareaSaveRequestDto;
import com.bangbang.dto.interest.InterestitemSaveRequestDto;
import com.bangbang.service.InterestService;
import com.bangbang.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@Api(value="InterestController Version 1")
@RequiredArgsConstructor
public class InterestRestController {
    @Autowired
    private final InterestService interestService;
    @Autowired
    private final UserService userService;


    @ApiOperation(value="관심지역 등록")
    @PostMapping("/user/interest/areas/new")
    public ResponseEntity<?> newInterestArea(@RequestBody InterestareaSaveRequestDto area, HttpServletRequest request) {
        try {
            HttpStatus status = HttpStatus.ACCEPTED;
            String token = request.getHeader("X-AUTH-TOKEN").substring(7);
            Long uid = userService.findUserId(token);
            area.setUserId(uid);
            interestService.newInterestArea(area);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.toString());
            return exceptionHandling();
        }
    }


    @ApiOperation(value="관심매물 등록")
    @PostMapping("/user/interest/items/new")
    public ResponseEntity<?> newInterestItem(@RequestBody InterestitemSaveRequestDto item, HttpServletRequest request) {
        try {
            HttpStatus status = HttpStatus.ACCEPTED;
            String token = request.getHeader("X-AUTH-TOKEN").substring(7);
            Long uid = userService.findUserId(token);
            item.setUserId(uid);
            interestService.newInterestItem(item);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }


    @ApiOperation(value="관심지역 조회")
    @GetMapping("/user/interest/areas")
    public ResponseEntity<?> searchInterestArea(HttpServletRequest request) {
        try {
            HttpStatus status = HttpStatus.ACCEPTED;
            String token = request.getHeader("X-AUTH-TOKEN").substring(7);
            Long uid = userService.findUserId(token);
            List<Interestarea> list = interestService.searchInterestArea(uid);
            if (list != null && !list.isEmpty())
                return new ResponseEntity<List<Interestarea>>(list, HttpStatus.OK);
            else return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }


    @ApiOperation(value="관심매물 조회")
    @GetMapping("/user/interest/items")
    public ResponseEntity<?> searchInterestItem(HttpServletRequest request) {
        try {
            HttpStatus status = HttpStatus.ACCEPTED;
            String token = request.getHeader("X-AUTH-TOKEN").substring(7);
            Long uid = userService.findUserId(token);
            List<Item> list = interestService.searchInterestItem(uid);
            if (list != null && !list.isEmpty())
                return new ResponseEntity<List<Item>>(list, HttpStatus.OK);
            else return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }


    @ApiOperation(value="관심지역 삭제")
    @DeleteMapping("/user/interest/areas/{iterestId}")
    public ResponseEntity<?> deleteInterestArea(@PathVariable Long interestId) {
        try {
            interestService.deleteInterestArea(interestId);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }


    @ApiOperation(value="관심매물 삭제")
    @DeleteMapping("/user/interest/items/{itemId}")
    public ResponseEntity<?> deleteInterestItem(@PathVariable Long itemId, HttpServletRequest request) {
        try {
            HttpStatus status = HttpStatus.ACCEPTED;
            String token = request.getHeader("X-AUTH-TOKEN").substring(7);
            Long uid = userService.findUserId(token);
            interestService.deleteInterestItem(uid, itemId);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }

    @ApiOperation(value="관심매물 체크")
    @GetMapping("/user/interest/items/check/{itemId}")
    public ResponseEntity<?> checkInterestItem(@PathVariable Long itemId, HttpServletRequest request) {
        try {
            HttpStatus status = HttpStatus.ACCEPTED;
            String token = request.getHeader("X-AUTH-TOKEN").substring(7);
            Long uid = userService.findUserId(token);
            boolean check = interestService.interestItemStatus(uid, itemId);
            System.out.println(check);
            return new ResponseEntity<Boolean>(check, HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling();
        }

    }

    private ResponseEntity exceptionHandling() {
        return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

