package com.bangbang.controller;

import com.bangbang.domain.interest.Interestarea;
import com.bangbang.domain.interest.InterestareaRepository;
import com.bangbang.domain.interest.Interestitem;
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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
            List<Interestitem> list = interestService.searchInterestItem(uid);
            if (list != null && !list.isEmpty())
                return new ResponseEntity<List<Interestitem>>(list, HttpStatus.OK);
            else return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }


    @ApiOperation(value="관심지역 삭제")
    @DeleteMapping("/user/interest/areas/{interestId}")
    public ResponseEntity<?> deleteInterestArea(@PathVariable Long interestId) {
        try {
            interestService.deleteInterestArea(interestId);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }


    @ApiOperation(value="관심매물 삭제")
    @DeleteMapping("/user/interest/items/{interestId}")
    public ResponseEntity<?> deleteInterestItem(@PathVariable Long interestId) {
        try {
            interestService.deleteInterestItem(interestId);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }

    private ResponseEntity exceptionHandling() {
        return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

