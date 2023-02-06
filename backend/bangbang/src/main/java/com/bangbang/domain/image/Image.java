package com.bangbang.domain.image;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "image")
public class Image {

  @Id
  @Column(name = "image_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long imageId;

  @Column(name = "image_storage_location", length = 100, nullable = false)
  private String imageStorageLocation;

  @Column(name = "image_type", nullable = false)
  private Integer imageType;

  @Column(name = "image_use_id", nullable = false)
  private Long imageUseId;


  @Builder
  public Image(Long imageId, String imageStorageLocation, Integer imageType, Long imageUseId){
    this.imageId = imageId;
    this.imageStorageLocation = imageStorageLocation;
    this.imageType = imageType;
    this.imageUseId = imageUseId;
  }

}
