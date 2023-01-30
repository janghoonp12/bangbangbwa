package com.bangbang.dto.replay;

import com.bangbang.domain.replay.Replay;
import lombok.Getter;

@Getter
public class ReplayResponseDto {
    private Long replayId;
    private String replayStorageLocation;

    public ReplayResponseDto(Replay entity){
        this.replayId = entity.getReplayId();
        this.replayStorageLocation = entity.getReplayStorageLocation();
    }
}
