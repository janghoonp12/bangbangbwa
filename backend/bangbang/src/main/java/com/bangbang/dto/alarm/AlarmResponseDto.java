package com.bangbang.dto.alarm;

import com.bangbang.domain.alarm.Alarm;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class AlarmResponseDto {
  private Long alarmId;
  private String alarmComment;

  private LocalDateTime alarmStartTime;

  public AlarmResponseDto(Alarm entity){
    this.alarmId = entity.getAlarmId();
    this.alarmComment = entity.getAlarmComment();
    this.alarmStartTime = entity.getAlarmStartTime();
  }
}
