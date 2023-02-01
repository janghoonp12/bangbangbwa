package com.bangbang.dto.broadcast;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BroadcastDeactiveRequestDto {
    private Long broadcastId;
    private Integer broadcastStatus;

    @Builder
    public BroadcastDeactiveRequestDto(Long broadcastId){
        this.broadcastId = broadcastId;
        this.broadcastStatus = 0;
    }
}
