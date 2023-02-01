package com.bangbang.dto.replay;

import com.bangbang.domain.broadcast.Broadcast;
import com.bangbang.domain.replay.Replay;
import io.swagger.models.auth.In;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReplayDeactiveRequestDto {
  private Long replayId;
  private Integer replayStatus;
  @Builder
  public ReplayDeactiveRequestDto(Long replayId){
    this.replayId = replayId;
    this.replayStatus = 0;
  }

}
