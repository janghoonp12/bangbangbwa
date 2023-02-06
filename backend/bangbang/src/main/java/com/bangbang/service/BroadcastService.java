package com.bangbang.service;

import com.bangbang.domain.broadcast.Broadcast;
import com.bangbang.domain.broadcast.BroadcastRepository;
import com.bangbang.domain.image.Image;
import com.bangbang.domain.image.ImageRepository;
import com.bangbang.dto.broadcast.*;
import com.bangbang.exception.BaseException;
import com.bangbang.exception.ErrorMessage;
import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.ConnectionType;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.OpenViduRole;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import javax.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.ui.Model;


@Service
@RequiredArgsConstructor
public class BroadcastService {
  @Autowired
  BroadcastRepository broadcastRepository;
  @Autowired
  ImageRepository imageRepository;

  // 방송 등록
  @Transactional
  public void newBroadcast(BroadcastSaveRequestDto requestDto) throws Exception{
    Image image = imageRepository.findByImageId(requestDto.getImageId())
            .orElseThrow(() -> new IllegalArgumentException("해당 이미지가 없습니다."));
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
      broadcastRepository.save(requestDto.toEntity(image, generatedString));
    }
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
