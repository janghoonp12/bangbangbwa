package com.bangbang.service;

import com.bangbang.domain.image.Image;
import com.bangbang.domain.image.ImageRepository;
import com.bangbang.dto.image.ImageResponseDto;
import com.bangbang.dto.image.ImageSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
