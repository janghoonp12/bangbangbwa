package com.bangbang.controller;

import com.bangbang.dto.alarm.AlarmListResponseDto;
import com.bangbang.dto.alarm.AlarmResponseDto;
import com.bangbang.dto.alarm.AlarmSaveRequestDto;
import com.bangbang.service.AlarmService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.HashMap;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Api(value="AlarmRestController-Version 1")
public class AlarmRestController {
  private final AlarmService alarmService;

  @GetMapping(value = "/alarms")
  @ApiOperation(value = "모든 알림 조회", notes = "알람을 모두 조회합니다.")
  public List<AlarmListResponseDto> searchAlarmAll(){
    return alarmService.searchAlarmAll();
  }

  @GetMapping(value = "/alarms/{alarmId}")
  @ApiOperation(value = "해당 알림 조회", notes = "해당 알림을 조회합니다.")
  public AlarmResponseDto alarmDetail(@PathVariable Long alarmId){
    return alarmService.alarmDetail(alarmId);
  }
  
  @PostMapping(value = "/alarms/new")
  @ApiOperation(value = "알림 등록", notes = "알림을 등록합니다.")
  public ResponseEntity<?> newAlarm(@RequestBody AlarmSaveRequestDto requestDto){
    try{
      alarmService.newAlarm(requestDto);

      return new ResponseEntity<Object>(new HashMap<String, Object>() {{
        put("result", true);
        put("msg", "알람 등록을 성공하였습니다.");
      }}, HttpStatus.OK);
    } catch (Exception e){
      e.printStackTrace();
      return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

  }

  @DeleteMapping(value = "/alarms/{alarmId}")
  @ApiOperation(value = "알림 삭제", notes = "알림을 삭제합니다.")
  public ResponseEntity<?> deleteAlarm(@PathVariable Long alarmId){
    try {
      alarmService.deleteAlarm(alarmId);
      return new ResponseEntity<Object>(new HashMap<String, Object>() {{
        put("result", true);
        put("msg", "알람 삭제를 성공하였습니다.");
      }}, HttpStatus.OK);
    } catch (Exception e){
      e.printStackTrace();
      return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
  }
}
