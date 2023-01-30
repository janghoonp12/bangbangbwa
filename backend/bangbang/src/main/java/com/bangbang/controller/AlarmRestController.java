package com.bangbang.controller;

import com.bangbang.dto.alarm.AlarmSaveRequestDto;
import com.bangbang.service.AlarmService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.HashMap;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Api(value="AlarmRestController-Version 1")
public class AlarmRestController {
  private final AlarmService alarmService;

  @PostMapping(value = "/alarms/new")
  @ApiOperation(value = "알람 등록", notes = "알람을 등록합니다.")
  public ResponseEntity<?> newAlarm(@RequestBody AlarmSaveRequestDto requestDto){
    alarmService.newAlarm(requestDto);

    return new ResponseEntity<Object>(new HashMap<String, Object>() {{
      put("result", true);
      put("msg", "알람 등록을 성공하였습니다.");
    }}, HttpStatus.OK);
  }
}
