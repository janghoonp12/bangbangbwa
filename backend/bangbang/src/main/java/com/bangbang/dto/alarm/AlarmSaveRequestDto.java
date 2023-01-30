package com.bangbang.dto.alarm;

import com.bangbang.domain.alarm.Alarm;
import com.bangbang.domain.sign.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AlarmSaveRequestDto {
  private Long alarmId;
  private String alarmComment;
  private Integer alarmStatus;
  private Long userId;

  @Builder
  public AlarmSaveRequestDto(String alarmComment, Integer alarmStatus, Long userId){
    this.alarmComment = alarmComment;
    this.alarmStatus = alarmStatus;
    this.userId = userId;
  }

  public Alarm toEntity(User user){
    return Alarm.builder()
        .alarmId(alarmId)
        .alarmComment(alarmComment)
        .alarmStatus(alarmStatus)
        .user(user)
        .build();
  }
}
