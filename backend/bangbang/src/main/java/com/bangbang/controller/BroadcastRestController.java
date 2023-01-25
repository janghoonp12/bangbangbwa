package com.bangbang.controller;

import com.bangbang.service.BroadcastServiceImpl;
import com.bangbang.vo.Broadcast;
import com.bangbang.vo.BroadcastRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@CrossOrigin("*")
@RequiredArgsConstructor
@Api(value="BroadcastRestController-Version 1")
public class BroadcastRestController {
  private final BroadcastRepository repository;

  @Autowired
  BroadcastServiceImpl service;

  @ApiOperation(value = "방송 등록", notes = "방송을 등록합니다.")
  @PostMapping(value = "/broadcasts/new")
  public Broadcast newBroadcast(@RequestBody Broadcast broadcast) {
    final Broadcast params = Broadcast.builder()
        .broadcast_title(broadcast.getBroadcast_title())
        .broadcast_description(broadcast.getBroadcast_description())
        .broadcast_status(broadcast.getBroadcast_status())
        .item_id(broadcast.getItem_id())
        .image_id(broadcast.getImage_id())
        .build();

    return repository.save(params);

  }

  @ApiOperation(value = "방송 전체검색", notes = "방송을 모두 검색합니다.")
  @GetMapping(value = "/broadcasts")
  public ResponseEntity<?> searchBroadcastAll(){
    List<Broadcast> broadcastList = repository.findAll();
    if(broadcastList != null && !broadcastList.isEmpty()) {
      ResponseEntity<List<Broadcast>> response = new ResponseEntity<List<Broadcast>>(broadcastList, HttpStatus.OK);
      return response;
    }
    else {
      return extracted();
    }
  }

  @ApiOperation(value = "방송 상세정보", notes = "방송 하나의 정보를 상세하게 보여줍니다.")
  @GetMapping(value = "/broadcasts/{broadcast_id}")
  public ResponseEntity<?> broadcastDetail(@PathVariable("broadcast_id") int broadcastid){
    Broadcast broadcast_list = repository.findByBroadcastid(broadcastid);
    if(broadcast_list != null) {
      ResponseEntity<Broadcast> response = new ResponseEntity<Broadcast>(broadcast_list, HttpStatus.OK);
      return response;
    }
    else {
      return extracted();
    }
  }

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

  @ApiOperation(value = "방송 삭제(비활성화)", notes = "삭제하고 싶은 방송을 하나 삭제(비활성화)합니다.")
  @PatchMapping(value = "/broadcasts/deactive/{broadcast_id}")
  public ResponseEntity<?> deactiveBroadcast(@PathVariable("broadcast_id") int broadcastid) {
    Broadcast broadcast_list = service.deactivateBroadcast(broadcastid);
    if(broadcast_list != null) {
      ResponseEntity<Broadcast> response = new ResponseEntity<Broadcast>(broadcast_list, HttpStatus.OK);
      return response;
    }
    else {
      return extracted();
    }
  }

  @ApiOperation(value = "방송 내용수정", notes = "수정이 필요한 방송을 수정합니다.")
  @Transactional
  @PutMapping(value = "/broadcasts/modify/{broadcast_id}")
  public ResponseEntity<?> modifyBroadcast(@PathVariable("broadcast_id") int broadcastid, @RequestBody Broadcast broadcast){
    Broadcast broadcastList = repository.findByBroadcastid(broadcastid);
    if(broadcastList != null) {
      broadcastList.setBroadcast_title(broadcast.getBroadcast_title());
      broadcastList.setBroadcast_description(broadcast.getBroadcast_description());
      ResponseEntity<Broadcast> response = new ResponseEntity<Broadcast>(broadcastList, HttpStatus.OK);
      return response;
    }
    else {
      return extracted();
    }
  }

  private ResponseEntity extracted() {
    return new ResponseEntity(HttpStatus.NO_CONTENT);
  }
}
