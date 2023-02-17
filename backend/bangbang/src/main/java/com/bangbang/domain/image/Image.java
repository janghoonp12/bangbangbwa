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

@Entity
@Table(name = "image")
@Getter
@NoArgsConstructor
public class Image {

  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  @Column(name = "image_id")
  private Long imageId;

  @Column(name = "image_path", length = 100, nullable = false)
  private String imagePath;

  @Column(name = "image_origin_name", nullable = false)
  private String imageOriginName;

  @Column(name = "image_name", nullable = false)
  private String imageName;


  @Builder
  public Image(Long imageId, String imagePath, String imageOriginName, String imageName){
    this.imageId = imageId;
    this.imageOriginName = imageOriginName;
    this.imageName = imageName;
    this.imagePath = imagePath;
  }
}
