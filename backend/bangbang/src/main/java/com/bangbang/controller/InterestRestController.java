package com.bangbang.controller;

import com.bangbang.domain.interest.Interestarea;
import com.bangbang.domain.interest.InterestareaRepository;
import com.bangbang.domain.interest.Interestitem;
import com.bangbang.dto.broker.BrokerResponseDto;
import com.bangbang.dto.broker.BrokerSaveRequestDto;
import com.bangbang.dto.interest.InterestareaSaveRequestDto;
import com.bangbang.dto.interest.InterestitemSaveRequestDto;
import com.bangbang.service.InterestService;
import io.swagger.annotations.Api;
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

@RestController
@Api(value="InterestController Version 1")
@RequiredArgsConstructor
public class InterestRestController {
    @Autowired
    private final InterestService interestService;
    @Autowired
    private InterestareaRepository interestareaRepository;

    @ApiOperation(value="관심지역 등록")
    @PostMapping("/interest/areas/new")
    public ResponseEntity<?> newInterestArea(@RequestBody InterestareaSaveRequestDto area) {
        try {
            interestService.newInterestArea(area);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }

    @ApiOperation(value="관심매물 등록")
    @PostMapping("/interest/items/new")
    public ResponseEntity<?> newInterestItem(@RequestBody InterestitemSaveRequestDto item) {
        try {
            interestService.newInterestItem(item);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }

    @ApiOperation(value="관심지역 조회")
    @GetMapping("/interest/areas/{userId}")
    public ResponseEntity<?> searchInterestArea(@PathVariable Long userId) {
        try {
            List<Interestarea> list = interestService.searchInterestArea(userId);
            if (list != null && !list.isEmpty())
                return new ResponseEntity<List<Interestarea>>(list, HttpStatus.OK);
            else return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }

    @ApiOperation(value="관심매물 조회")
    @GetMapping("/interest/items/{userId}")
    public ResponseEntity<?> searchInterestItem(@PathVariable Long userId) {
        try {
            List<Interestitem> list = interestService.searchInterestItem(userId);
            if (list != null && !list.isEmpty())
                return new ResponseEntity<List<Interestitem>>(list, HttpStatus.OK);
            else return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }

    @ApiOperation(value="관심지역 삭제")
    @DeleteMapping("/interest/areas/{userId}")
    public ResponseEntity<?> deleteInterestArea(@PathVariable Long userId) {
        try {
            interestService.deleteInterestArea(userId);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }

    @ApiOperation(value="관심매물 삭제")
    @DeleteMapping("/interest/items/{userId}")
    public ResponseEntity<?> deleteInterestItem(@PathVariable Long userId) {
        try {
            interestService.deleteInterestItem(userId);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }

    private ResponseEntity exceptionHandling() {
        return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

