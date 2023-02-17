package com.bangbang.controller;

import com.bangbang.domain.broker.BrokerRepository;
import com.bangbang.domain.sign.User;
import com.bangbang.domain.sign.UserRepository;
import com.bangbang.dto.broadcast.BroadcastListResponseDto;
import com.bangbang.dto.item.ItemDto;
import com.bangbang.exception.BaseException;
import com.bangbang.exception.ErrorMessage;
import com.bangbang.service.MypageService;
import com.bangbang.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Api(value="MypageController Version 1")
public class MyPageRestController {
    @Autowired
    private final MypageService mypageService;
    @Autowired
    private final UserService userService;
    @Autowired
    private final BrokerRepository brokerRepository;
    @Autowired
    private final UserRepository userRepository;


    @ApiOperation(value="유저 정보 조회")
    @GetMapping("/user/mypage")
    public ResponseEntity<?> searchUser(HttpServletRequest request) {
        try {
            HttpStatus status = HttpStatus.ACCEPTED;
            String token = request.getHeader("X-AUTH-TOKEN").substring(7);
            Long uid = userService.findUserId(token);
            User user = mypageService.searchUser(uid);
            if (user != null)
                return new ResponseEntity<User>(user, HttpStatus.OK);
            else return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            System.out.println(e.toString());
            return exceptionHandling();
        }
    }


    @ApiOperation(value="나의 매물 정보 조회")
    @GetMapping("/mypage/item")
    public ResponseEntity<?> searchMyItem(HttpServletRequest request) {
        try {
            String token = request.getHeader("X-AUTH-TOKEN").substring(7);
            Long uid = userService.findUserId(token);
            Long brokerId = brokerRepository.findByUserId(uid).getBrokerId();
            List<ItemDto> item = mypageService.searchMyItem(brokerId);
            if (item != null && !item.isEmpty())
                return new ResponseEntity<List<ItemDto>>(item, HttpStatus.OK);
            else return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }


    @ApiOperation(value="나의 방송 정보 조회")
    @GetMapping("/mypage/broadcast")
    public ResponseEntity<?> searchMyBroadcast(HttpServletRequest request) {
        try {
            String token = request.getHeader("X-AUTH-TOKEN").substring(7);
            Long uid = userService.findUserId(token);
            List<BroadcastListResponseDto> broadcasts = mypageService.searchMyBroadcast(uid);
            if (broadcasts != null && !broadcasts.isEmpty())
                return new ResponseEntity<List<BroadcastListResponseDto>>(broadcasts, HttpStatus.OK);
            else return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 발급 받은 access_token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation(value="유저 닉네임 변경")
    @PatchMapping("/user/mypage/modify/nickname/{nickname}")
    public ResponseEntity<?> modifyUserNickname(HttpServletRequest request, @PathVariable String nickname) throws Exception {
        HttpStatus status = HttpStatus.ACCEPTED;
        String token = request.getHeader("X-AUTH-TOKEN").substring(7);
        Long uid = userService.findUserId(token);

        if (userRepository.findByUserNickname(nickname).isPresent()) {
            throw new BaseException(ErrorMessage.EXIST_NICKNAME);
        }
        else {
            mypageService.modifyUserNickname(uid, nickname);
            return new ResponseEntity(HttpStatus.OK);
        }
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 발급 받은 access_token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation(value="유저 비밀번호 변경")
    @PatchMapping("/user/mypage/modify/password/{password}")
    public ResponseEntity<?> modifyUserPassword(HttpServletRequest request, @PathVariable String password) {
        try {
            HttpStatus status = HttpStatus.ACCEPTED;
            String token = request.getHeader("X-AUTH-TOKEN").substring(7);
            Long uid = userService.findUserId(token);
            mypageService.modifyUserPassword(uid, password);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 발급 받은 access_token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation(value="유저 비활성화")
    @PatchMapping("/user/mypage/deactivate")
    public ResponseEntity<?> deactivateUser(HttpServletRequest request) {
        try {
            HttpStatus status = HttpStatus.ACCEPTED;
            String token = request.getHeader("X-AUTH-TOKEN").substring(7);
            Long uid = userService.findUserId(token);
            mypageService.deactivateUser(uid);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }

    private ResponseEntity exceptionHandling() {
        return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
