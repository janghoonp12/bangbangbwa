package com.bangbang.service;

import com.bangbang.domain.alarm.Alarm;
import com.bangbang.domain.alarm.AlarmRepository;
import com.bangbang.domain.sign.User;
import com.bangbang.domain.sign.UserRepository;
import com.bangbang.dto.alarm.AlarmListResponseDto;
import com.bangbang.dto.alarm.AlarmResponseDto;
import com.bangbang.dto.alarm.AlarmSaveRequestDto;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AlarmService {
  private final AlarmRepository alarmRepository;
  private final UserRepository userRepository;

  //알림 전체 조회
  public List<AlarmListResponseDto> searchAlarmAll(){
    return alarmRepository.findAll().stream()
        .map(AlarmListResponseDto::new)
        .collect(Collectors.toList());
  }

  //해당 알림 조회
  public AlarmResponseDto alarmDetail(Long alarmId){
    Alarm entity = alarmRepository.findByAlarmId(alarmId)
        .orElseThrow(() -> new IllegalArgumentException("해당 알림이 없습니다."));
    return new AlarmResponseDto(entity);
  }

  //알람 등록
  public void newAlarm(AlarmSaveRequestDto requestDto){
    User user = userRepository.findByUserId(requestDto.getUserId());

    if (user == null) {
      new IllegalArgumentException("유저 정보가 존재하지 않습니다.");
    }

    alarmRepository.save(requestDto.toEntity(user));
  }

  //알림 삭제
  @Transactional
  public void deleteAlarm(Long alarmId){
    Alarm alarm = alarmRepository.findByAlarmId(alarmId)
        .orElseThrow(() -> new IllegalArgumentException("해당 알림이 없습니다."));
    alarmRepository.delete(alarm);
  }
}
