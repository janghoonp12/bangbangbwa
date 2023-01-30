package com.bangbang.controller;

import com.bangbang.dto.broadcast.*;
import com.bangbang.service.BroadcastService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Api(value="BroadcastRestController-Version 1")
public class BroadcastRestController {

  private final BroadcastService broadcastService;

  //방송 등록
  @ApiOperation(value = "방송 등록", notes = "방송을 등록합니다.")
  @PostMapping(value = "/broadcasts/new")
  public ResponseEntity<?> newBroadcast(@RequestBody BroadcastSaveRequestDto requestDto) throws Exception{
    broadcastService.newBroadcast(requestDto);

    return new ResponseEntity<Object>(new HashMap<String, Object>() {{
      put("result", true);
      put("msg", "방송등록을 성공하였습니다.");
    }}, HttpStatus.OK);
  }

  //모두 조회
  @GetMapping(value = "/broadcasts")
  @ApiOperation(value = "방송 조회", notes = "모든 방송을 조회합니다.")
  public List<BroadcastListResponseDto> searchBroadcastAll() {
    return broadcastService.searchBroadcastAll();
  }

  //해당 방송 조회
  @GetMapping(value = "/broadcasts/{broadcastId}")
  @ApiOperation(value = "해당 방송 조회", notes = "해당 방송을 조회합니다.")
  public BroadcastResponseDto broadcastDetail(@PathVariable Long broadcastId){
    return broadcastService.broadcastDetail(broadcastId);
  }

  //방송 제목, 설명 수정
  @PatchMapping(value = "/broadcasts/modify/{broadcastId}")
  @ApiOperation(value = "해당 방송 수정", notes = "해당 방송의 제목, 내용을 수정합니다.")
  public ResponseEntity<?> modifyBroadcast(@PathVariable Long broadcastId, @RequestBody BroadcastUpdateRequestDto requestDto){
    broadcastService.modifyBroadcast(broadcastId, requestDto);
    return new ResponseEntity<Object>(new HashMap<String, Object>() {{
      put("result", true);
      put("msg", "방송수정을 완료했습니다.");
    }}, HttpStatus.OK);
  }

  //방송 삭제(비활성화)
  @PatchMapping(value = "/broadcasts/deactive/{broadcastId}")
  @ApiOperation(value = "해당 방송 삭제", notes = "해당 방송을 비활성화합니다.")
  public ResponseEntity<?> deactivateBroadcast(@PathVariable Long broadcastId, @RequestBody BroadcastDeactiveRequestDto requestDto){
    broadcastService.deactivateBroadcast(broadcastId, requestDto);
    return new ResponseEntity<Object>(new HashMap<String, Object>() {{
      put("result", true);
      put("msg", "방송비활성화를 완료했습니다.");
    }}, HttpStatus.OK);
  }

//  @ApiOperation(value = "방송 전체검색", notes = "방송을 모두 검색합니다.")
//  @GetMapping(value = "/broadcasts")
//  public ResponseEntity<?> searchBroadcastAll(){
//    List<Broadcast> broadcastList = repository.findAll();
//    if(broadcastList != null && !broadcastList.isEmpty()) {
//      ResponseEntity<List<Broadcast>> response = new ResponseEntity<List<Broadcast>>(broadcastList, HttpStatus.OK);
//      return response;
//    }
//    else {
//      return extracted();
//    }
//  }
//
//  @ApiOperation(value = "방송 상세정보", notes = "방송 하나의 정보를 상세하게 보여줍니다.")
//  @GetMapping(value = "/broadcasts/{broadcast_id}")
//  public ResponseEntity<?> broadcastDetail(@PathVariable("broadcast_id") int broadcastid){
//    Broadcast broadcast_list = repository.findByBroadcastid(broadcastid);
//    if(broadcast_list != null) {
//      ResponseEntity<Broadcast> response = new ResponseEntity<Broadcast>(broadcast_list, HttpStatus.OK);
//      return response;
//    }
//    else {
//      return extracted();
//    }
//  }

//  @ApiOperation(value = "방송 필터검색", notes = "방송 정보들을 필터를 거쳐 검색하여 보여줍니다.")
//  @GetMapping(value = "/broadcasts/{filter}")
//  public ResponseEntity<?> searchBroadcastFilter(@PathVariable("filter") Filter filter){
//    List<Broadcast> broadcastFilterlist = repository.findByFilter(filter);
//    if(broadcastFilterlist != null && !broadcastFilterlist.isEmpty()) {
//      ResponseEntity<List<Broadcast>> response = new ResponseEntity<List<Broadcast>>(broadcastFilterlist, HttpStatus.OK);
//      return response;
//    }
//    else {
//      return extracted();
//    }
//  }

//  @ApiOperation(value = "방송 삭제(비활성화)", notes = "삭제하고 싶은 방송을 하나 삭제(비활성화)합니다.")
//  @PatchMapping(value = "/broadcasts/deactive/{broadcast_id}")
//  public ResponseEntity<?> deactiveBroadcast(@PathVariable("broadcast_id") int broadcastid,
//     @RequestBody Broadcast broadcast) {
//    Broadcast broadcast_list = service.deactivateBroadcast(broadcastid, broadcast);
//    if(broadcast_list != null) {
//      ResponseEntity<Broadcast> response = new ResponseEntity<Broadcast>(broadcast_list, HttpStatus.OK);
//      return response;
//    }
//    else {
//      return extracted();
//    }
//  }

//  @ApiOperation(value = "방송 내용수정", notes = "수정이 필요한 방송을 수정합니다.")
//  @PatchMapping(value = "/broadcasts/modify/{broadcast_id}")
//  public ResponseEntity<?> modifyBroadcast(@PathVariable("broadcast_id") int broadcastid){
//    Broadcast broadcastList = repository.findByBroadcastid(broadcastid);
//    if(broadcastList != null) {
////      if(broadcastList.getBroadcast_status() == 0){
////        broadcastList.setBroadcast_status(1);
////        repository.save(broadcastList);
////      }
//      ResponseEntity<Broadcast> response = new ResponseEntity<Broadcast>(broadcastList, HttpStatus.OK);
//      return response;
//    }
//    else {
//      return extracted();
//    }
//  }

  private ResponseEntity extracted() {
    return new ResponseEntity(HttpStatus.NO_CONTENT);
  }
}
