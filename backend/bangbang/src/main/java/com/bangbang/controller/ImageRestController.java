package com.bangbang.controller;

import com.bangbang.domain.image.Image;
import com.bangbang.dto.file.FileDto;
import com.bangbang.dto.image.ImageSaveRequestDto;
import com.bangbang.service.ImageService;
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
  private final Logger log = LoggerFactory.getLogger(getClass());

  @PostMapping(value = "/broker/images/new")
//  @PostMapping(value = "/upload")
  @ApiOperation(value = "사진 등록", notes = "사진을 등록합니다.")
  public ResponseEntity<?> newImage(@RequestParam("file") List<MultipartFile> files) throws Exception {
    try{
      for(MultipartFile file : files){
        String origFilename = file.getOriginalFilename();
        String filename = new MD5Generator(origFilename).toString();
        String savePath = System.getProperty("user.dir") + "\\files";

        if(!new File(savePath).exists()){
          try {
            new File(savePath).mkdir();
          } catch (Exception e){
            e.getStackTrace();
          }
        }
        String filePath = savePath + "\\" + filename;
        file.transferTo(new File(filePath));

        ImageSaveRequestDto imageSaveRequestDto = new ImageSaveRequestDto();
        imageSaveRequestDto.setImageOriginName(origFilename);
        imageSaveRequestDto.setImagePath(filePath);
        imageSaveRequestDto.setImageName(filename);

        imageService.saveFile(imageSaveRequestDto);
      }

    } catch (Exception e){
      e.printStackTrace();
    }

    return new ResponseEntity<>(HttpStatus.OK);
  }

  //사진 등록

//  @PostMapping(value = "/broker/images/new")
//  @ApiOperation(value = "사진 등록", notes = "사진을 등록합니다.")
//  public ResponseEntity<?> newImage(@RequestParam("file") MultipartFile file,
//      @RequestParam("imageType") Integer imageType,
//      @RequestParam("imageUseId") Long imageUseId) throws Exception {
//
//    String imageStorageLocation = saveUploadedFile(file);
//    ImageSaveRequestDto requestDto = ImageSaveRequestDto.builder()
//        .imageStorageLocation(imageStorageLocation)
//        .imageType(imageType)
//        .imageUseId(imageUseId)
//        .build();
//
//    imageService.newImage(requestDto);
//
//    return new ResponseEntity<Object>(new HashMap<String, Object>() {{
//      put("result", true);
//      put("msg", "사진등록을 성공하였습니다.");
//    }}, HttpStatus.OK);
//  }

  private String saveUploadedFile(MultipartFile file) throws IOException {
    String fileName = file.getOriginalFilename();
    String uniqueFileName = UUID.randomUUID() + fileName;
    Path path = Paths.get("/파일/저장/경로/" + uniqueFileName);

    while (Files.exists(path)) {
      uniqueFileName = UUID.randomUUID() + fileName;
      path = Paths.get("/파일/저장/경로/" + uniqueFileName);
    }

    Files.write(path, file.getBytes());
    return uniqueFileName;
  }
  private String getPath(){
    return "C:/Users/SSAFY/test";
  }
}