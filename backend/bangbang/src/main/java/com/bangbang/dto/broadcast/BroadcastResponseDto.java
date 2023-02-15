package com.bangbang.dto.broadcast;

import com.bangbang.domain.broadcast.Broadcast;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
public class BroadcastResponseDto {
    private Long broadcastId;
    private String broadcastDescription;
    private String broadcastTitle;
    private String broadcastRoomId;
    private String imagePath;

    @QueryProjection
    public BroadcastResponseDto(Broadcast entity){
        this.broadcastId = entity.getBroadcastId();
        this.broadcastDescription = entity.getBroadcastDescription();
        this.broadcastTitle = entity.getBroadcastTitle();
        this.imagePath = entity.getImagePath();
        this.broadcastRoomId = entity.getBroadcastRoomId();
    }
}
