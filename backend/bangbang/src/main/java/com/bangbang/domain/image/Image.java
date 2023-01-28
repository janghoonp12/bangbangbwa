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


  @Builder
  public Image(String imageStorageLocation){
    this.imageStorageLocation = imageStorageLocation;
  }

  public void update(String imageStorageLocation) {this.imageStorageLocation = imageStorageLocation;}
}
