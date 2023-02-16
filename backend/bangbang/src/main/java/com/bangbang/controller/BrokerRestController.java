package com.bangbang.controller;

import com.bangbang.dto.broker.BrokerResponseDto;
import com.bangbang.dto.broker.BrokerSaveRequestDto;
import com.bangbang.service.BrokerService;
import com.bangbang.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@Api(value="BrokerController Version 1")
@RequiredArgsConstructor
public class BrokerRestController {
    @Autowired
    private final BrokerService brokerService;

    @Autowired
    private final UserService userService;


    @ApiOperation(value="중개사 신청")
    @PostMapping("/user/brokers/new")
    public ResponseEntity<?> newBroker(@RequestBody BrokerSaveRequestDto broker, HttpServletRequest request) {
        System.out.println(1234);
        try {
            System.out.println(broker);
            String token = request.getHeader("X-AUTH-TOKEN");
            Long uid = userService.findUserId(token);
            broker.setUserId(uid);
            brokerService.newBroker(broker);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }


    @ApiOperation(value="중개사 신청 조회")
    @GetMapping("/admin/brokers")
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
    @PatchMapping("/admin/brokers/register")
    public ResponseEntity<?> registerBroker(HttpServletRequest request) {
        try {
            HttpStatus status = HttpStatus.ACCEPTED;
            String token = request.getHeader("X-AUTH-TOKEN");
            Long uid = userService.findUserId(token);
            brokerService.registerBroker(uid);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }


    @ApiOperation(value="중개사 비활성화")
    @PatchMapping("/brokers/deactive/{brokerId}")
    public ResponseEntity<?> deactiveBroker(HttpServletRequest request) {
        try {
            HttpStatus status = HttpStatus.ACCEPTED;
            String token = request.getHeader("X-AUTH-TOKEN");
            Long uid = userService.findUserId(token);
            brokerService.deactiveBroker(uid);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }

    private ResponseEntity exceptionHandling() {
        return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
