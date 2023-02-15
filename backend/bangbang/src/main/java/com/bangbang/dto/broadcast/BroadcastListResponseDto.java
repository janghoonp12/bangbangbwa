package com.bangbang.dto.broadcast;

import com.bangbang.domain.broadcast.Broadcast;
import com.bangbang.domain.image.Image;
import lombok.Getter;

@Getter
public class BroadcastListResponseDto {
    private Long broadcastId;
    private String broadcastDescription;
    private String broadcastTitle;
    private Integer broadcastStatus;
    private Long imageId;

    private String broadcastRoomId;

    public BroadcastListResponseDto(Broadcast entity){
        this.broadcastId = entity.getBroadcastId();
        this.broadcastDescription = entity.getBroadcastDescription();
        this.broadcastTitle = entity.getBroadcastTitle();
        this.imageId = entity.getImage().getImageId();
        this.broadcastStatus = entity.getBroadcastStatus();
        this.broadcastRoomId = entity.getBroadcastRoomId();
    }
}
