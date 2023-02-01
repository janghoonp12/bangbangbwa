package com.bangbang.controller;

import com.bangbang.dto.file.FileDto;
import com.bangbang.dto.image.ImageSaveRequestDto;
import com.bangbang.service.ImageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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

//  @GetMapping(value = "/upload")
//  public String upload(@RequestParam MultipartFile[] uploadFile, Model model) throws IllegalStateException, IOException{
//    List<FileDto> list = new ArrayList<>();
//    for(MultipartFile file: uploadFile){
//      if(!file.isEmpty()){
//        FileDto dto = new FileDto(UUID.randomUUID().toString(),
//                                  file.getOriginalFilename(),
//                                  file.getContentType());
//        list.add(dto);
//        File newFileName = new File(dto.getUuid() + "_"+dto.getFileName());
//        file.transferTo(newFileName);
//      }
//    }
//    model.addAttribute("files", list);
//    return "result";
//  }
//
//  @Value("${spring.servlet.multipart.location}")
//  String filePath;

//  @GetMapping(value = "/download")
//  public ResponseEntity<Resource> download(@ModelAttribute FileDto dto) throws IOException {
//    Path path = Paths.get(filePath+"/"+dto.getUuid()+ "_" + dto.getFileName());
//    String contentType = Files.probeContentType(path);
//    HttpHeaders headers = new HttpHeaders();
//    headers.setContentDisposition(ContentDisposition.builder("attachment")
//        .filename(dto.getFileName(), StandardCharsets.UTF_8)
//        .build());
//    headers.add(HttpHeaders.CONTENT_TYPE, contentType);
//
//    Resource resource = new InputStreamResource(Files.newInputStream(path));
//    return new ResponseEntity<>(resource, headers, HttpStatus.OK);
//  }
}
