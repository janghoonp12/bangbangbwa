package com.bangbang.dto.broadcast;

import com.bangbang.domain.broadcast.Broadcast;
import com.bangbang.domain.image.Image;
import com.bangbang.domain.item.Item;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BroadcastSaveRequestDto {
  private Long broadcastId;
  private String broadcastDescription;
  private Integer broadcastStatus;
  private String broadcastTitle;
  private Item item;
  private Image image;
  @Builder
  public BroadcastSaveRequestDto(String broadcastDescription, Integer broadcastStatus, String broadcastTitle){
    this.broadcastDescription = broadcastDescription;
    this.broadcastStatus = broadcastStatus;
    this.broadcastTitle = broadcastTitle;
  }

  public void setItem(Item item){this.item = item;}
  public void setImage(Image image){this.image = image;}

  public Broadcast toEntity(){
    return Broadcast.builder()
        .broadcastId(broadcastId)
        .broadcastDescription(broadcastDescription)
        .broadcastStatus(broadcastStatus)
        .broadcastTitle(broadcastTitle)
        .item(item)
        .image(image)
        .build();
  }

}
