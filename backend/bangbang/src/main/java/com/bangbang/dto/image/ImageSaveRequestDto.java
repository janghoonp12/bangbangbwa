package com.bangbang.dto.image;

import com.bangbang.domain.image.Image;
import com.bangbang.domain.image.ImageRepository;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ImageSaveRequestDto {
  private Long imageId;
  private String imageStorageLocation;

  private Integer imageType;
  private Long imageUseId;

  @Builder
  public ImageSaveRequestDto(String imageStorageLocation, Integer imageType, Long imageUseId){
    this.imageStorageLocation = imageStorageLocation;
    this.imageType = imageType;
    this.imageUseId = imageUseId;
  }

  public Image toEntiy() {
    return Image.builder()
        .imageId(imageId)
        .imageStorageLocation(imageStorageLocation)
        .imageType(imageType)
        .imageUseId(imageUseId)
        .build();
  }
}
