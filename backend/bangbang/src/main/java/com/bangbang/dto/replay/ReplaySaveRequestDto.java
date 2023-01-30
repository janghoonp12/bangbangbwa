package com.bangbang.dto.replay;

import com.bangbang.domain.broadcast.Broadcast;
import com.bangbang.domain.replay.Replay;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReplaySaveRequestDto {
    private String replayStorageLocation;
    private Integer replayStatus;
    private Long broadcastId;

    @Builder
    public ReplaySaveRequestDto(String replayStorageLocation,Integer replayStatus, Long broadcastId){
        this.replayStorageLocation = replayStorageLocation;
        this.replayStatus = replayStatus;
        this.broadcastId = broadcastId;
    }


    public Replay toEntity(Broadcast broadcast){
        return Replay.builder()
                .replayStorageLocation(replayStorageLocation)
                .replayStatus(replayStatus)
                .broadcast(broadcast)
                .build();
    }


}
