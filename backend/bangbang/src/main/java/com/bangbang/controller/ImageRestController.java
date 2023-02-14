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

  @PostMapping(value = "/broker/images/new")
  @ApiOperation(value = "방송 사진 등록", notes = "방송 사진을 등록합니다.")
  public ResponseEntity<?> newImageBroadcast(@RequestParam("file") MultipartFile file) throws Exception {
    try{
        String origFilename = file.getOriginalFilename();
        String filename = new MD5Generator(origFilename).toString();
        String savePath = "C:\\Users\\SSAFY\\project\\week2\\S08P12A405\\frontend\\front\\src\\assets";

        if(!new File(savePath).exists()){
          try {
            new File(savePath).mkdir();
          } catch (Exception e){
            e.getStackTrace();
          }
        }
        String filePath = savePath + "\\" + origFilename;
        file.transferTo(new File(filePath));

        System.out.println(savePath);
        System.out.println(filePath);

        ImageSaveRequestDto imageSaveRequestDto = new ImageSaveRequestDto();
        imageSaveRequestDto.setImageOriginName(origFilename);
        imageSaveRequestDto.setImagePath(filePath);
        imageSaveRequestDto.setImageName(filename);

      Long image_id = imageService.saveFile(imageSaveRequestDto);
      imageSaveRequestDto.setImageId(image_id);

      return new ResponseEntity<>(imageSaveRequestDto, HttpStatus.OK);

    } catch (Exception e){
      e.printStackTrace();
    }

    return new ResponseEntity<>(HttpStatus.OK);
  }

  @PostMapping(value = "/admin/images/new")
  @ApiOperation(value = "공지사항 사진 등록", notes = "사진을 등록합니다.")
  public ResponseEntity<?> newImageNotice(@RequestParam("file") MultipartFile file) throws Exception {
    try{

      String origFilename = file.getOriginalFilename();
      String filename = new MD5Generator(origFilename).toString();
      String savePath = System.getProperty("user.dir") + "\\files";
//      String savePath = "C:\\Users\\SSAFY\\project\\week2\\S08P12A405\\frontend\\front\\src\\assets";

      if(!new File(savePath).exists()){
        try {
          new File(savePath).mkdir();
        } catch (Exception e){
          e.getStackTrace();
        }
      }
      String filePath = savePath + "\\" + origFilename;
      file.transferTo(new File(filePath));

      System.out.println(savePath);
      System.out.println(filePath);

      ImageSaveRequestDto imageSaveRequestDto = new ImageSaveRequestDto();
      imageSaveRequestDto.setImageOriginName(origFilename);
      imageSaveRequestDto.setImagePath(filePath);
      imageSaveRequestDto.setImageName(filename);

      Long image_id = imageService.saveFile(imageSaveRequestDto);
      imageSaveRequestDto.setImageId(image_id);

      return new ResponseEntity<>(imageSaveRequestDto, HttpStatus.OK);


    } catch (Exception e){
      e.printStackTrace();
    }

    return new ResponseEntity<>(HttpStatus.OK);
  }


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