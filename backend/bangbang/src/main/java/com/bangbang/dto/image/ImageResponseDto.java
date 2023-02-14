package com.bangbang.dto.image;

import com.bangbang.domain.image.Image;
import lombok.Getter;

@Getter
public class ImageResponseDto {
  private Long imageId;
  private String imagePath;
  private String imageOriginName;

  public ImageResponseDto(Image entity){
    this.imageId = entity.getImageId();
    this.imagePath = entity.getImagePath();
    this.imageOriginName = entity.getImageOriginName();
  }

}
