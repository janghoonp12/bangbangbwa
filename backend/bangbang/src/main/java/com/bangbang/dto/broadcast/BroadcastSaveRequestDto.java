package com.bangbang.dto.broadcast;

import com.bangbang.domain.broadcast.Broadcast;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BroadcastSaveRequestDto {
  private String broadcastDescription;
  private String broadcastTitle;
  private LocalDateTime broadcastReservationTime;


  private Long itemId;
  private String imagePath;

  @Builder
  public BroadcastSaveRequestDto(String broadcastDescription, String broadcastTitle, Long itemId, String imagePath,
                                 LocalDateTime broadcastReservationTime){
    this.broadcastDescription = broadcastDescription;
    this.broadcastTitle = broadcastTitle;
    this.itemId = itemId;
    this.imagePath = imagePath;
    this.broadcastReservationTime = broadcastReservationTime;
  }

  public Broadcast toEntity(String generatedString){
    return Broadcast.builder()
        .broadcastDescription(broadcastDescription)
        .broadcastStatus(1)
        .broadcastTitle(broadcastTitle)
        .itemId(itemId)
        .imagePath(imagePath)
        .broadcastRoomId(generatedString)
        .broadcastReservationTime(broadcastReservationTime)
        .build();
  }
}
