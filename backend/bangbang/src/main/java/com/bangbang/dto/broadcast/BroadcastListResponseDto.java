package com.bangbang.dto.broadcast;

import com.bangbang.domain.broadcast.Broadcast;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class BroadcastListResponseDto {
    private Long broadcastId;
    private String broadcastDescription;
    private String broadcastTitle;
    private Integer broadcastStatus;
    private LocalDateTime broadcastReservationTime;
    private String imagePath;
    private String broadcastRoomId;



    public BroadcastListResponseDto(Broadcast entity){
        this.broadcastId = entity.getBroadcastId();
        this.broadcastDescription = entity.getBroadcastDescription();
        this.broadcastTitle = entity.getBroadcastTitle();
        this.broadcastStatus = entity.getBroadcastStatus();
        this.broadcastReservationTime = entity.getBroadcastReservationTime();
        this.broadcastRoomId = entity.getBroadcastRoomId();
    }
}
