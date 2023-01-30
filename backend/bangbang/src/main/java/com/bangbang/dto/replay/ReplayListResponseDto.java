package com.bangbang.dto.replay;

import com.bangbang.domain.replay.Replay;
import lombok.Getter;

@Getter
public class ReplayListResponseDto {
    private Long replayId;
    private String replayStorageLocation;

    public ReplayListResponseDto(Replay entity){
        this.replayId = entity.getReplayId();
        this.replayStorageLocation = entity.getReplayStorageLocation();
    }
}
