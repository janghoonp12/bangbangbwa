package com.bangbang.controller;

import com.bangbang.domain.interest.Interestarea;
import com.bangbang.dto.broker.BrokerSaveRequestDto;
import com.bangbang.dto.interest.InterestareaSaveRequestDto;
import com.bangbang.service.InterestService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api(value="InterestController Version 1")
@RequiredArgsConstructor
public class InterestRestController {
    @Autowired
    private final InterestService interestService;

    @ApiOperation(value="관심지역 등록")
    @PostMapping("/interest/areas/new")
    public ResponseEntity<?> newBroker(@RequestBody InterestareaSaveRequestDto area) {
        try {
            interestService.newInterestArea(area);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }
    private ResponseEntity exceptionHandling() {
        return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

