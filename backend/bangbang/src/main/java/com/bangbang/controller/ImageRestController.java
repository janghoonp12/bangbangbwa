package com.bangbang.controller;

import com.bangbang.domain.broadcast.Broadcast;
import com.bangbang.domain.image.Image;
import com.bangbang.dto.file.FileDto;
import com.bangbang.dto.image.ImageResponseDto;
import com.bangbang.dto.image.ImageSaveRequestDto;
import com.bangbang.service.BroadcastService;
import com.bangbang.service.ImageService;
import com.bangbang.service.NoticeService;
import com.bangbang.service.NoticeServiceImpl;
import com.bangbang.util.MD5Generator;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.commons.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@RestController
@RequiredArgsConstructor
@Api(value="ImageRestController-Version 1")
public class ImageRestController {

  private final ImageService imageService;
  private final BroadcastService broadcastService;
  private final NoticeServiceImpl noticeService;
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