package com.bangbang.controller;

import com.bangbang.domain.broadcast.Broadcast;
import com.bangbang.domain.sign.User;
import com.bangbang.dto.broadcast.BroadcastListResponseDto;
import com.bangbang.dto.item.ItemDto;
import com.bangbang.service.MypageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Api(value="MypageController Version 1")
public class MyPageRestController {
    @Autowired
    private final MypageService mypageService;

    @ApiOperation(value="유저 정보 조회")
    @GetMapping("/mypage/{userId}")
    public ResponseEntity<?> searchUser(@PathVariable Long userId) {
        try {
            User user = mypageService.searchUser(userId);
            if (user != null)
                return new ResponseEntity<User>(user, HttpStatus.OK);
            else return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }

    @ApiOperation(value="나의 매물 정보 조회")
    @GetMapping("/mypage/item/{brokerId}")
    public ResponseEntity<?> searchMyItem(@PathVariable Long brokerId) {
        try {
            List<ItemDto> item = mypageService.searchMyItem(brokerId);
            if (item != null && !item.isEmpty())
                return new ResponseEntity<List<ItemDto>>(item, HttpStatus.OK);
            else return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }

    @ApiOperation(value="나의 방송 정보 조회")
    @GetMapping("/mypage/broadcast/{brokerId}")
    public ResponseEntity<?> searchMyBroadcast(@PathVariable Long brokerId) {
        try {
            List<BroadcastListResponseDto> broadcasts = mypageService.searchMyBroadcast(brokerId);
            if (broadcasts != null && !broadcasts.isEmpty())
                return new ResponseEntity<List<BroadcastListResponseDto>>(broadcasts, HttpStatus.OK);
            else return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }

    private ResponseEntity exceptionHandling() {
        return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
