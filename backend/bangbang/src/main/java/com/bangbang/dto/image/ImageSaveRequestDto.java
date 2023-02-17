package com.bangbang.dto.image;

import com.bangbang.domain.image.Image;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ImageSaveRequestDto {
  private Long imageId;
  private String imagePath;
  private String imageOriginName;
  private String imageName;

  @Builder
  public ImageSaveRequestDto(Long imageId, String imagePath, String imageOriginName, String imageName){
    this.imageId = imageId;
    this.imagePath = imagePath;
    this.imageOriginName = imageOriginName;
    this.imageName = imageName;
  }

  public Image toEntiy() {
    return Image.builder()
        .imageId(imageId)
        .imagePath(imagePath)
        .imageOriginName(imageOriginName)
        .imageName(imageName)
        .build();
  }
}
