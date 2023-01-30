package com.bangbang.service;

import com.bangbang.domain.image.ImageRepository;
import com.bangbang.dto.image.ImageSaveRequestDto;
import com.bangbang.exception.BaseException;
import com.bangbang.exception.ErrorMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ImageService {
  private final ImageRepository imageRepository;

  //사진 등록
  @Transactional
  public void newImage(ImageSaveRequestDto requestDto) throws Exception{
    imageRepository.save(requestDto.toEntiy());
  }
}
