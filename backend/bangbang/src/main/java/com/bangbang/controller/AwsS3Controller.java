package com.bangbang.controller;

import com.bangbang.dto.image.ImageSaveRequestDto;
import com.bangbang.service.AwsS3Service;
import com.bangbang.service.ImageService;
import com.bangbang.util.MD5Generator;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class AwsS3Controller {
  private final AwsS3Service awsS3Service;
  private final ImageService imageService;

  @PostMapping(value = "/admin/images/new")
  public ResponseEntity<?> noticeUploadImage(@RequestParam("file") MultipartFile multipartFile)
      throws IOException, NoSuchAlgorithmException {
    ImageSaveRequestDto imageDto = awsS3Service.uploadImage(multipartFile);

    return new ResponseEntity<>(imageDto, HttpStatus.OK);
  }

  @PostMapping(value = "/broker/images/new")
  public ResponseEntity<?> broadcastUploadImage(@RequestParam("file") MultipartFile multipartFile) throws IOException, NoSuchAlgorithmException{
    ImageSaveRequestDto imageSaveRequestDto = awsS3Service.uploadImage(multipartFile);

    return new ResponseEntity<>(imageSaveRequestDto, HttpStatus.OK);
  }
}
