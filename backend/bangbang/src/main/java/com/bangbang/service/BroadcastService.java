package com.bangbang.service;

import com.bangbang.domain.broadcast.Broadcast;
import com.bangbang.domain.broadcast.BroadcastRepository;
import com.bangbang.domain.image.Image;
import com.bangbang.domain.image.ImageRepository;
import com.bangbang.dto.broadcast.*;
import com.bangbang.exception.BaseException;
import com.bangbang.exception.ErrorMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class BroadcastService {
  private final BroadcastRepository broadcastRepository;
  private final ImageRepository imageRepository;

  // 방송 등록
  @Transactional
  public void newBroadcast(BroadcastSaveRequestDto requestDto) throws Exception{
    Image image = imageRepository.findByImageId(requestDto.getImageId())
            .orElseThrow(() -> new IllegalArgumentException("해당 이미지가 없습니다."));
    broadcastRepository.save(requestDto.toEntity(image));
  }

  //방송 조회
  public List<BroadcastListResponseDto> searchBroadcastAll(){
    return broadcastRepository.findAll().stream()
            .map(BroadcastListResponseDto::new)
            .collect(Collectors.toList());
  }

  //해당 방송 조회
  public BroadcastResponseDto broadcastDetail(Long broadcastId){
    Broadcast entity = broadcastRepository.findByBroadcastId(broadcastId)
            .orElseThrow(() -> new IllegalArgumentException("해당 방송이 존재하지 않습니다."));
    return new BroadcastResponseDto(entity);
  }

  //방송 수정
  @Transactional
  public void modifyBroadcast(Long id, BroadcastUpdateRequestDto requestDto){
    try {
      Broadcast broadcast = broadcastRepository.findByBroadcastId(id).orElseThrow(()
      -> new IllegalArgumentException("해당 방송이 없습니다. id = "+id));
      broadcast.update(requestDto.getBroadcastId(), requestDto.getBroadcastDescription(), requestDto.getBroadcastTitle());
    } catch (Exception e){
      e.printStackTrace();
    }
  }

  //방송 삭제
  @Transactional
  public void deactivateBroadcast(Long id){
    try {
      Broadcast broadcast = broadcastRepository.findByBroadcastId(id).orElseThrow(()
              -> new IllegalArgumentException("해당 방송이 없습니다. id = "+id));
      broadcast.deactive(id);
    } catch (Exception e){
      e.printStackTrace();
    }
  }
}
