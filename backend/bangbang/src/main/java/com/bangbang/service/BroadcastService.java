package com.bangbang.service;

import com.bangbang.domain.broadcast.Broadcast;
import com.bangbang.domain.broadcast.BroadcastQueryRepository;
import com.bangbang.domain.broadcast.BroadcastRepository;
import com.bangbang.domain.image.Image;
import com.bangbang.domain.image.ImageRepository;
import com.bangbang.dto.broadcast.*;

import java.util.List;
import java.util.Optional;
import java.util.Random;

import com.bangbang.dto.item.ItemFilterRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class BroadcastService {
  @Autowired
  BroadcastRepository broadcastRepository;
  @Autowired
  ImageRepository imageRepository;
  @Autowired
  BroadcastQueryRepository broadcastQueryRepository;

  // 방송 등록
  @Transactional
  public void newBroadcast(BroadcastSaveRequestDto requestDto) throws Exception{
//    Image image = imageRepository.findByImagePath(requestDto.getImagePath())
//            .orElseThrow(() -> new IllegalArgumentException("해당 이미지가 없습니다."));
    int leftLimit = 48; // numeral '0'
    int rightLimit = 122; // letter 'z'
    int targetStringLength = 45;
    Random random = new Random();
    String generatedString = random.ints(leftLimit,rightLimit + 1)
        .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
        .limit(targetStringLength)
        .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
        .toString();
    if (generatedString == broadcastRepository.findByBroadcastRoomId(generatedString)){
      new Exception(new IllegalArgumentException("해당 세션 ID가 존재합니다."));
    }
    else {
      broadcastRepository.save(requestDto.toEntity(generatedString));
    }
  }

  // 모든 방송조회
  public Page<BroadcastListResponseDto> searchBroadcastAll(Pageable pageable) {
    return broadcastRepository.findAllByOrderByBroadcastIdDesc(pageable)
        .map(BroadcastListResponseDto::new);
  }

  //라이브중인 방송 조회
  public Page<BroadcastListResponseDto> searchLiveBroadcastAll(Pageable pageable){
    return broadcastRepository.findByBroadcastStatusOrderByBroadcastIdDesc(pageable, 1).map(BroadcastListResponseDto::new);

  }

  //종료된 방송 조회
  public Page<BroadcastListResponseDto> searchEndBroadcastAll(Pageable pageable){
      return broadcastRepository.findByBroadcastStatusOrderByBroadcastIdDesc(pageable, 0).map(BroadcastListResponseDto::new);
  }

  //해당 방송 조회
  public BroadcastResponseDto broadcastDetail(Long broadcastId){
    Broadcast entity = broadcastRepository.findByBroadcastId(broadcastId)
            .orElseThrow(() -> new IllegalArgumentException("해당 방송이 존재하지 않습니다."));
    return new BroadcastResponseDto(entity);
  }


  // 매물 해당 방송 조회
  public BroadcastListResponseDto broadcastItemDetail(Long itemId){
    BroadcastListResponseDto entity = broadcastRepository.findByItemId(itemId);
    return entity;
  }


  //방송 수정
  @Transactional
  public void modifyBroadcast(Long id, BroadcastUpdateRequestDto requestDto){
    Optional<Broadcast> broadcast = broadcastRepository.findByBroadcastId(id);
    broadcast.orElseThrow(() -> new IllegalArgumentException("해당 방송이 없습니다. id = "+id));
    try {
      broadcast.get().update(requestDto.getBroadcastId(), requestDto.getBroadcastDescription(), requestDto.getBroadcastTitle(),
                            requestDto.getImagePath(), requestDto.getBroadcastReservationTime());
    } catch (Exception e){
      e.printStackTrace();
    }
  }

  //방송 시작
  @Transactional
  public void startBroadcast(Long id){
    Optional<Broadcast> broadcast = broadcastRepository.findByBroadcastId(id);
    broadcast.orElseThrow(() -> new IllegalArgumentException("해당 방송이 없습니다. id = " + id));
    try{
      broadcast.get().starter(id);
    } catch (Exception e){
      e.printStackTrace();
    }
  }

  //방송 삭제
  @Transactional
  public void deactivateBroadcast(Long id) {
    Optional<Broadcast> broadcast = broadcastRepository.findByBroadcastId(id);
    broadcast.orElseThrow(() -> new IllegalArgumentException("해당 방송이 없습니다. id = " + id));
    try {
      broadcast.get().deactive(id);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public List<Broadcast> searchBroadcastByFilter(ItemFilterRequestDto filter) {
    return broadcastQueryRepository.searchBroadcastByFilter(filter);
  }
}
