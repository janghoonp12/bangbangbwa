package com.bangbang.controller;

import com.bangbang.dto.broker.BrokerResponseDto;
import com.bangbang.dto.broker.BrokerSaveRequestDto;
import com.bangbang.service.BrokerService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Api(value="BrokerController Version 1")
@RequiredArgsConstructor
public class BrokerRestController {
    @Autowired
    private final BrokerService brokerService;

    @ApiOperation(value="중개사 신청")
    @PostMapping("/brokers/new")
    public ResponseEntity<?> newBroker(@RequestBody BrokerSaveRequestDto broker) {
        try {
            brokerService.newBroker(broker);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }

    @ApiOperation(value="중개사 신청 조회")
    @GetMapping("/brokers")
    public ResponseEntity<?> searchBrokerAll() {
        try {
            List<BrokerResponseDto> list = brokerService.searchBrokerAll();
            if (list != null && !list.isEmpty())
                return new ResponseEntity<List<BrokerResponseDto>>(list, HttpStatus.OK);
            else return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }

    @ApiOperation(value="중개사 등록")
    @PatchMapping("/brokers/register")
    public ResponseEntity<?> registerBroker(@RequestParam("brokerId") Long brokerId, @RequestParam("userId") Long userId) {
        try {
            boolean flag = brokerService.registerBroker(brokerId, userId);
            if (flag)
                return new ResponseEntity(HttpStatus.OK);
            else
                return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }

    @ApiOperation(value="중개사 비활성화")
    @PatchMapping("/brokers/deactive/{brokerId}")
    public ResponseEntity<?> deactiveBroker(@PathVariable Long brokerId) {
        try {
            brokerService.deactiveBroker(brokerId);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }

    private ResponseEntity exceptionHandling() {
        return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
