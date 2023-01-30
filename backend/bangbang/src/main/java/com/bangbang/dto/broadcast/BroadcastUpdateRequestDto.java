package com.bangbang.dto.broadcast;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BroadcastUpdateRequestDto {
    private Long broadcastId;
    private String broadcastDescription;
    private String broadcastTitle;

    @Builder
    public BroadcastUpdateRequestDto(Long broadcastId, String broadcastDescription, String broadcastTitle){
        this.broadcastId = broadcastId;
        this.broadcastDescription = broadcastDescription;
        this.broadcastTitle = broadcastTitle;
    }

}
