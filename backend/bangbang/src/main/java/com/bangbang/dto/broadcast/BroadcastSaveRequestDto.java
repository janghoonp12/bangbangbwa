package com.bangbang.dto.broadcast;

import com.bangbang.domain.broadcast.Broadcast;
import com.bangbang.domain.image.Image;
import com.bangbang.domain.item.Item;
import java.util.Random;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BroadcastSaveRequestDto {
  private Long broadcastId;
  private String broadcastDescription;
  private String broadcastTitle;

  private Long itemId;
  private Long imageId;

  @Builder
  public BroadcastSaveRequestDto(String broadcastDescription, String broadcastTitle, Long itemId, Long imageId){
    this.broadcastDescription = broadcastDescription;
    this.broadcastTitle = broadcastTitle;
    this.itemId = itemId;
    this.imageId = imageId;
  }

//  public void setItem(Item item){this.item = item;}
//  public void setImage(Image image){this.image = image;}

  public Broadcast toEntity(Image image, String generatedString){
    return Broadcast.builder()
        .broadcastDescription(broadcastDescription)
        .broadcastStatus(1)
        .broadcastTitle(broadcastTitle)
        .itemId(itemId)
        .image(image)
        .broadcastRoomId(generatedString)
        .build();
  }
}
