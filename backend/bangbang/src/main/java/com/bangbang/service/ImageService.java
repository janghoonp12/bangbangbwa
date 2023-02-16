package com.bangbang.service;

import com.bangbang.domain.image.Image;
import com.bangbang.domain.image.ImageRepository;
import com.bangbang.dto.image.ImageResponseDto;
import com.bangbang.dto.image.ImageSaveRequestDto;
import com.bangbang.exception.BaseException;
import com.bangbang.exception.ErrorMessage;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.fileupload.FileUploadException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ImageService {
  private final ImageRepository imageRepository;

  @Transactional
  public Long saveFile(ImageSaveRequestDto requestDto){
    return imageRepository.save(requestDto.toEntiy()).getImageId();
  }


  public ImageResponseDto getFile(Long imageId){
    Image entity = imageRepository.findByImageId(imageId)
        .orElseThrow(() -> new IllegalArgumentException("해당 이미지가 없습니다."));

    return new ImageResponseDto(entity);
  }

}
