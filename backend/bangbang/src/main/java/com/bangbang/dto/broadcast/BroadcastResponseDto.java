package com.bangbang.dto.broadcast;

import com.bangbang.domain.broadcast.Broadcast;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class BroadcastResponseDto {
    private Long broadcastId;
    private String broadcastDescription;
    private String broadcastTitle;

    private String broadcastRoomId;

    public BroadcastResponseDto(Broadcast entity){
        this.broadcastId = entity.getBroadcastId();
        this.broadcastDescription = entity.getBroadcastDescription();
        this.broadcastTitle = entity.getBroadcastTitle();
        this.broadcastRoomId = entity.getBroadcastRoomId();
    }
}
