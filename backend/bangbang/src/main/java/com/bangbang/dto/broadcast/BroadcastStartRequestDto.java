package com.bangbang.dto.broadcast;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BroadcastStartRequestDto {
    private Long broadcastId;
    private Integer broadcastStatus;

    @Builder
    public BroadcastStartRequestDto(Long broadcastId){
        this.broadcastId = broadcastId;
        this.broadcastStatus = 2;
    }
}
