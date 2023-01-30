package com.bangbang.controller;

import com.bangbang.dto.image.ImageSaveRequestDto;
import com.bangbang.service.ImageService;
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
@Api(value="ImageRestController-Version 1")
public class ImageRestController {
  private final ImageService imageService;

  //사진 등록
  @PostMapping(value = "/images/new")
  @ApiOperation(value = "사진 등록", notes = "사진을 등록합니다.")
  public ResponseEntity<?> newImage(@RequestBody ImageSaveRequestDto requestDto) throws Exception{
    imageService.newImage(requestDto);

    return new ResponseEntity<Object>(new HashMap<String, Object>() {{
      put("result", true);
      put("msg", "사진등록을 성공하였습니다.");
    }}, HttpStatus.OK);
  }
}
