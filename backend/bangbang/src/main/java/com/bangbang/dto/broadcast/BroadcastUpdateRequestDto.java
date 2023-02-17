package com.bangbang.dto.broadcast;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class BroadcastUpdateRequestDto {
    private Long broadcastId;
    private String broadcastDescription;
    private String broadcastTitle;
    private String imagePath;
    private LocalDateTime broadcastReservationTime;

    @Builder
    public BroadcastUpdateRequestDto(Long broadcastId, String broadcastDescription, String broadcastTitle, LocalDateTime broadcastReservationTime, String imagePath){
        this.broadcastId = broadcastId;
        this.broadcastDescription = broadcastDescription;
        this.broadcastTitle = broadcastTitle;
        this.broadcastReservationTime = broadcastReservationTime;
        this.imagePath = imagePath;
    }

}
