package com.bangbang.controller;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.bangbang.dto.broadcast.*;
import com.bangbang.dto.image.ImageSaveRequestDto;
import com.bangbang.dto.item.ItemFilterRequestDto;
import com.bangbang.service.BroadcastService;
import com.bangbang.service.ImageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@Api(value="BroadcastRestController-Version 1")
public class BroadcastRestController {

  @Autowired
  BroadcastService broadcastService;

  //방송 등록
  @ApiOperation(value = "방송 등록", notes = "방송을 등록합니다.")
  @PostMapping(value = "/broker/broadcasts/new")
  public ResponseEntity<?> newBroadcast(@RequestBody BroadcastSaveRequestDto requestDto) throws Exception{
    try {
      broadcastService.newBroadcast(requestDto);
      return new ResponseEntity<Object>(new HashMap<String, Object>() {{
        put("result", true);
        put("msg", "방송등록을 성공하였습니다.");
      }}, HttpStatus.OK);
    } catch (Exception e){
      e.printStackTrace();
      return new ResponseEntity("/broadcasts", HttpStatus.BAD_REQUEST);
    }

  }

  //모두 조회
  @GetMapping(value = "/broadcasts")
  @ApiOperation(value = "방송 조회", notes = "모든 방송을 조회합니다.")
  public ResponseEntity<?> searchBroadcastAll(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "12") int size) {
    Pageable pageable = PageRequest.of(page, size);
    try {
      Page<BroadcastListResponseDto> broadcasts = broadcastService.searchBroadcastAll(pageable);

      if(broadcasts != null && broadcasts.hasContent()){
        return new ResponseEntity<Page<BroadcastListResponseDto>>(broadcasts, HttpStatus.OK);
      }
      else return new ResponseEntity(HttpStatus.NO_CONTENT);
    } catch (Exception e){
      return extracted();
    }
  }

  //라이브중인 방송 조회(페이지)
  @GetMapping(value = "/broadcasts/live")
  @ApiOperation(value = "라이브 방송 조회", notes = "해당 페이지의 방송 12개를 조회합니다.")
  public ResponseEntity<?> searchLiveBroadcastAll(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "12") int size) {
    Pageable pageable = PageRequest.of(page, size);
    try {
      Page<BroadcastListResponseDto> broadcasts = broadcastService.searchLiveBroadcastAll(pageable);

      if(broadcasts != null && broadcasts.hasContent()){
        return new ResponseEntity<Page<BroadcastListResponseDto>>(broadcasts, HttpStatus.OK);
      }
      else return new ResponseEntity(HttpStatus.NO_CONTENT);
    } catch (Exception e){
      return extracted();
    }
  }

  //방송예정인 방송 조회
  @GetMapping(value = "/broadcasts/expected")
  @ApiOperation(value = "예정된 방송 조회", notes = "해당 페이지의 방송 12개를 조회합니다.")
  public ResponseEntity<?> searchExpectedBroadcastAll(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "12") int size){
    Pageable pageable = PageRequest.of(page, size);
    try {
      Page<BroadcastListResponseDto> broadcasts = broadcastService.searchExpectedBroadcastAll(pageable);
      if(broadcasts != null && broadcasts.hasContent()){
        return new ResponseEntity<Page<BroadcastListResponseDto>>(broadcasts, HttpStatus.OK);
      }
      else return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e){
      return extracted();
    }
  }

  //종료된 방송 조회(페이지)
  @GetMapping(value = "/broadcasts/end")
  @ApiOperation(value = "종료된 방송 조회", notes = "해당 페이지의 방송 12개를 조회합니다.")
  public ResponseEntity<?> searchEndBroadcastAll(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "12") int size) {
    Pageable pageable = PageRequest.of(page, size);
    try {
      Page<BroadcastListResponseDto> broadcasts = broadcastService.searchEndBroadcastAll(pageable);
      if(broadcasts != null && broadcasts.hasContent()){
        return new ResponseEntity<Page<BroadcastListResponseDto>>(broadcasts, HttpStatus.OK);
      }
      else return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e){
      return extracted();
    }

  }

  //해당 방송 조회
  @GetMapping(value = "/broadcasts/{broadcastId}")
  @ApiOperation(value = "해당 방송 조회", notes = "해당 방송을 조회합니다.")
  public BroadcastResponseDto broadcastDetail(@PathVariable Long broadcastId){
    return broadcastService.broadcastDetail(broadcastId);
  }

  //매물번호로 방송 조회
  @GetMapping(value = "/broadcasts/item/{itemId}")
  @ApiOperation(value = "매물 방송 조회", notes = "매물에 해당하는 방송을 조회합니다.")
  public BroadcastListResponseDto broadcastItemDetail(@PathVariable Long itemId){
    return broadcastService.broadcastItemDetail(itemId);
  }


  //방송 제목, 설명 수정
  @PatchMapping(value = "/broker/broadcasts/modify/{broadcastId}")
  @ApiOperation(value = "해당 방송 수정", notes = "해당 방송의 제목, 내용을 수정합니다.")
  public ResponseEntity<?> modifyBroadcast(@PathVariable Long broadcastId, @RequestBody BroadcastUpdateRequestDto requestDto){
    broadcastService.modifyBroadcast(broadcastId, requestDto);
    try {
      return new ResponseEntity<Object>(new HashMap<String, Object>() {{
        put("result", true);
        put("msg", "방송수정을 완료했습니다.");
      }}, HttpStatus.OK);
    } catch (Exception e){
      e.printStackTrace();
      return extracted();
    }

  }

  //방송 시작
  @PatchMapping(value = "/broker/broadcasts/start/{broadcastId}")
  @ApiOperation(value = "해당 방송 시작", notes = "해당 방송을 시작합니다.")
  public ResponseEntity<?> stratBroadcast(@PathVariable Long broadcastId){
    broadcastService.startBroadcast(broadcastId);
    try {
      return new ResponseEntity<Object>(new HashMap<String, Object>() {{
        put("result", true);
        put("msg", "방송을 시작합니다.");
      }}, HttpStatus.OK);
    } catch (Exception e){
      e.printStackTrace();
      return extracted();
    }
  }

  //방송 삭제(비활성화)
  @PatchMapping(value = "/broker/broadcasts/deactive/{broadcastId}")
  @ApiOperation(value = "해당 방송 삭제", notes = "해당 방송을 비활성화합니다.")
  public ResponseEntity<?> deactivateBroadcast(@PathVariable Long broadcastId){
    broadcastService.deactivateBroadcast(broadcastId);
    try {
        return new ResponseEntity<Object>(new HashMap<String, Object>() {{
          put("result", true);
          put("msg", "방송비활성화를 완료했습니다.");
        }}, HttpStatus.OK);
    } catch (Exception e){
      e.printStackTrace();
      return extracted();
    }

  }

  @ApiOperation(value = "방송 필터 검색")
  @PostMapping("/broadcasts/filter")
  public ResponseEntity<?> searchBroadcastFilter(@RequestBody ItemFilterRequestDto filter) {
    try {
      List<BroadcastResponseDto> list = broadcastService.searchBroadcastByFilter(filter);
      if (list != null && !list.isEmpty())
        return new ResponseEntity<List<BroadcastResponseDto>>(list, HttpStatus.OK);
      else return new ResponseEntity(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      e.printStackTrace();
      return extracted();
    }
  }


  private ResponseEntity extracted() {
    return new ResponseEntity(HttpStatus.NO_CONTENT);
  }
}
