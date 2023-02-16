package com.bangbang.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.bangbang.dto.image.ImageSaveRequestDto;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AwsS3Service {
  @Value("${cloud.aws.s3.bucket}")
  private String bucket;

  @Value("${cloud.aws.s3.bucket.url}")
  private String defaultUrl;

  private final AmazonS3 amazonS3;
  private final ImageService imageService;

//  public ImageSaveRequestDto noticeUploadImage(MultipartFile file) {
//    String fileName = createFileName(file.getOriginalFilename());
//    String url = defaultUrl+fileName;
//
//    ObjectMetadata objectMetadata = new ObjectMetadata();
//    objectMetadata.setContentLength(file.getSize());
//    objectMetadata.setContentType(file.getContentType());
//
//    ImageSaveRequestDto imageSaveRequestDto = new ImageSaveRequestDto();
//    imageSaveRequestDto.setImageOriginName(file.getOriginalFilename());
//    imageSaveRequestDto.setImagePath(url);
//    imageSaveRequestDto.setImageName(fileName);
//
//    Long image_id = imageService.saveFile(imageSaveRequestDto);
//    imageSaveRequestDto.setImageId(image_id);
//
//    try (InputStream inputStream = file.getInputStream()) {
//      amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
//          .withCannedAcl(CannedAccessControlList.PublicRead));
//    } catch (IOException e) {
//      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "이미지 업로드에 실패했습니다.");
//    }
//
//    return imageSaveRequestDto;
//  }
  public String broadcastUploadImage(MultipartFile file) {
    String fileName = createFileName(file.getOriginalFilename());
    String url = defaultUrl+fileName;

    ObjectMetadata objectMetadata = new ObjectMetadata();
    objectMetadata.setContentLength(file.getSize());
    objectMetadata.setContentType(file.getContentType());

//    ImageSaveRequestDto imageSaveRequestDto = new ImageSaveRequestDto();
//    imageSaveRequestDto.setImageOriginName(file.getOriginalFilename());
//    imageSaveRequestDto.setImagePath(url);
//    imageSaveRequestDto.setImageName(fileName);
//
//    Long image_id = imageService.saveFile(imageSaveRequestDto);
//    imageSaveRequestDto.setImageId(image_id);

    try (InputStream inputStream = file.getInputStream()) {
      amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
              .withCannedAcl(CannedAccessControlList.PublicRead));
    } catch (IOException e) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "이미지 업로드에 실패했습니다.");
    }

    return url;
  }

  private String createFileName(String fileName) {
    return UUID.randomUUID().toString().concat(getFileExtension(fileName));
  }
  private String getFileExtension(String fileName) {
    try {
      return fileName.substring(fileName.lastIndexOf("."));
    } catch (StringIndexOutOfBoundsException e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
    }
  }

}
