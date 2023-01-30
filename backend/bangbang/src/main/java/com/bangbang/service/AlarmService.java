package com.bangbang.service;

import com.bangbang.domain.alarm.AlarmRepository;
import com.bangbang.domain.sign.User;
import com.bangbang.domain.sign.UserRepository;
import com.bangbang.dto.alarm.AlarmSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AlarmService {
  private final AlarmRepository alarmRepository;
  private final UserRepository userRepository;

  //알람 등록
  public void newAlarm(AlarmSaveRequestDto requestDto){
    User user = userRepository.findByUserId(requestDto.getUserId())
        .orElseThrow(() -> new IllegalArgumentException("유저 정보가 존재하지 않습니다."));

    alarmRepository.save(requestDto.toEntity(user));
  }
}
