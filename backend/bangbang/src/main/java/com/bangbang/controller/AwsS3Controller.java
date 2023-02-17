package com.bangbang.controller;

import com.bangbang.service.AwsS3Service;
import com.bangbang.service.ImageService;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class AwsS3Controller {
  private final AwsS3Service awsS3Service;
  private final ImageService imageService;

  @PostMapping(value = "/broker/images/new")
  public ResponseEntity<?> broadcastUploadImage(@RequestParam("file") MultipartFile multipartFile) throws IOException, NoSuchAlgorithmException{
    String url = awsS3Service.broadcastUploadImage(multipartFile);

    return new ResponseEntity<>(url, HttpStatus.OK);
  }
}
