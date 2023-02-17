package com.bangbang.dto.alarm;

import com.bangbang.domain.alarm.Alarm;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class AlarmListResponseDto {
  private Long alarmId;
  private String alarmComment;

  private LocalDateTime alarmStartTime;

  public AlarmListResponseDto(Alarm entity){
    this.alarmId = entity.getAlarmId();
    this.alarmComment = entity.getAlarmComment();
    this.alarmStartTime = entity.getAlarmStartTime();
  }
}
