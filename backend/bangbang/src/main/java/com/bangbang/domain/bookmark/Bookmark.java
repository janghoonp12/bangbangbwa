package com.bangbang.domain.bookmark;

import com.bangbang.domain.dongcode.Dongcode;
import com.bangbang.domain.sign.User;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @OneToOne
  @JoinColumn(name = "dongcode_id", nullable = false)
  private Dongcode dongcode;

  @Builder
  public Bookmark(Long bookmarkId, String bookmarkTitle, String bookmarkComment, Integer bookmarkItemType,
      Integer bookmarkBuildingType, Double bookmarkArea, Integer bookmarkItemBuildMinYear, Integer bookmarkItemBuildMaxYear,
      Integer bookmarkItemMinPrice, Integer bookmarkItemMaxPrice, User user, Dongcode dongcode) {

    this.bookmarkId = bookmarkId;
    this.bookmarkTitle = bookmarkTitle;
    this.bookmarkComment = bookmarkComment;
    this.bookmarkItemType = bookmarkItemType;
    this.bookmarkBuildingType = bookmarkBuildingType;
    this.bookmarkArea = bookmarkArea;
    this.bookmarkItemBuildMinYear = bookmarkItemBuildMinYear;
    this.bookmarkItemBuildMaxYear = bookmarkItemBuildMaxYear;
    this.bookmarkItemMinPrice = bookmarkItemMinPrice;
    this.bookmarkItemMaxPrice = bookmarkItemMaxPrice;
    this.user = user;
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
