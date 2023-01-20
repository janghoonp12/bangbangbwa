package com.bangbang.controller;

import com.bangbang.vo.Broadcast;
import com.bangbang.vo.BroadcastRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@Api(value="BroadcastRestController-Version 1")
public class BroadcastRestController {
  private final BroadcastRepository repository;

  @ApiOperation(value = "방송 등록", notes = "방송을 등록합니다.")
  @PostMapping(value = "/broadcasts/new")
  public Broadcast newBroadcast(){
    final Broadcast params = Broadcast.builder()
        .item_id(1)
        .image_id(1)
        .broadcast_title("풍무동 아파트")
        .broadcast_description("푸르지오 28평!!")
        .broadcast_status(0)
        .broadcast_reservation_time("2023-01-25 14:00")
        .broadcast_start_time("2023-01-25 14:10")
        .broadcast_end_time("2023-01-25 15:10")
        .build();

    return repository.save(params);

  }

//  @ApiOperation(value = "방송 등록", notes = "방송을 등록합니다.")
//  @PostMapping(value = "/broadcasts/new")
//  public ResponseEntity<?> searchBroadcastAll(){
//    ArrayList<Broadcast> broadcast_list = service.searchBroadcastAll();
//    if(broadcast_list != null && !broadcast_list.isEmpty()){
//      ResponseEntity<ArrayList<Broadcast>> response = new ResponseEntity<ArrayList<Broadcast>>(broadcast_list,
//          HttpStatus.OK);
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
