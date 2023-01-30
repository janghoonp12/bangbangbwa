package com.bangbang.dto.broadcast;

import com.bangbang.domain.broadcast.Broadcast;
import lombok.Getter;

@Getter
public class BroadcastListResponseDto {
    private Long broadcastId;
    private String broadcastDescription;
    private String broadcastTitle;

    public BroadcastListResponseDto(Broadcast entity){
        this.broadcastId = entity.getBroadcastId();
        this.broadcastDescription = entity.getBroadcastDescription();
        this.broadcastTitle = entity.getBroadcastTitle();
    }
}
