package com.bangbang.controller;

import com.bangbang.dto.image.ImageResponseDto;
import com.bangbang.service.BroadcastService;
import com.bangbang.service.ImageService;
import com.bangbang.service.NoticeServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequiredArgsConstructor
@Api(value="ImageRestController-Version 1")
public class ImageRestController {

  private final ImageService imageService;
  private final Logger log = LoggerFactory.getLogger(getClass());

  @GetMapping(value = "/images/{imageId}")
  @ApiOperation(value = "이미지 불러오기", notes = "이미지를 불러옵니다.")
  public ResponseEntity<?> getImage(@PathVariable("imageId") Long imageId){
    System.out.println("이미지 아이디 : " + imageId);
    try {
      ImageResponseDto imageResponseDto = imageService.getFile(imageId);

      System.out.println("image 값 : "+ imageResponseDto);
      if (imageResponseDto != null) {
        return new ResponseEntity<ImageResponseDto>(imageResponseDto, HttpStatus.OK);
      }
      else return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e){
      return extracted();
    }

  }
  private ResponseEntity extracted() {
    return new ResponseEntity(HttpStatus.NO_CONTENT);
  }
}