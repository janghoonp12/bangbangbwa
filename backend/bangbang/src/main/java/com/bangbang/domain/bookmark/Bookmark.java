package com.bangbang.domain.bookmark;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "bookmark")
public class Bookmark {
  @Id
  @Column(name="bookmark_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long bookmarkId;  //PK

  @Column(name = "bookmark_title", length = 20, nullable = false)
  private String bookmarkTitle;
  @Column(name = "bookmark_comment", length = 30, nullable = true)
  private String bookmarkComment;
  @Column(name = "bookmark_item_type")
  private Integer bookmarkItemType;
  @Column(name = "bookmark_building_type")
  private Integer bookmarkBuildingType;
  @Column(name = "bookmark_area")
  private Double bookmarkArea;
  @Column(name = "bookmark_item_build_min_year")
  private Integer bookmarkItemBuildMinYear;
  @Column(name = "bookmark_item_build_max_year")
  private Integer bookmarkItemBuildMaxYear;
  @Column(name = "bookmark_item_min_price")
  private Integer bookmarkItemMinPrice;
  @Column(name = "bookmark_item_max_price")
  private Integer bookmarkItemMaxPrice;

  @JoinTable(name="user",
          joinColumns = @JoinColumn(name="user_id"),
          inverseJoinColumns = @JoinColumn(name="user_id"))
  private Long userId;

  @JoinTable(name="dongcode",
          joinColumns = @JoinColumn(name="dongCode"),
          inverseJoinColumns = @JoinColumn(name="dongCode"))
  private String dongcode;

  @Builder
  public Bookmark(String bookmarkTitle, String bookmarkComment, Integer bookmarkItemType,
      Integer bookmarkBuildingType, Double bookmarkArea, Integer bookmarkItemBuildMinYear, Integer bookmarkItemBuildMaxYear,
      Integer bookmarkItemMinPrice, Integer bookmarkItemMaxPrice, Long userId, String dongcode) {

    this.bookmarkTitle = bookmarkTitle;
    this.bookmarkComment = bookmarkComment;
    this.bookmarkItemType = bookmarkItemType;
    this.bookmarkBuildingType = bookmarkBuildingType;
    this.bookmarkArea = bookmarkArea;
    this.bookmarkItemBuildMinYear = bookmarkItemBuildMinYear;
    this.bookmarkItemBuildMaxYear = bookmarkItemBuildMaxYear;
    this.bookmarkItemMinPrice = bookmarkItemMinPrice;
    this.bookmarkItemMaxPrice = bookmarkItemMaxPrice;
    this.userId = userId;
    this.dongcode = dongcode;
  }

  public void update(String bookmarkTitle, String bookmarkComment,
      Integer bookmarkItemType, Integer bookmarkBuildingType, Integer bookmarkItemMinPrice, Integer bookmarkItemMaxPrice){
    this.bookmarkTitle = bookmarkTitle;
    this.bookmarkComment = bookmarkComment;
    this.bookmarkItemType = bookmarkItemType;
    this.bookmarkBuildingType = bookmarkBuildingType;
    this.bookmarkItemMinPrice = bookmarkItemMinPrice;
    this.bookmarkItemMaxPrice = bookmarkItemMaxPrice;
  }
}