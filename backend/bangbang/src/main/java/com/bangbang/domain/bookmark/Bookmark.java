package com.bangbang.domain.bookmark;

import io.swagger.models.auth.In;
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
  @Column(name = "bookmark_min_area")
  private Double bookmarkMinArea;
  @Column(name = "bookmark_max_area")
  private Double bookmarkMaxArea;
  @Column(name = "bookmark_item_build_min_year")
  private Integer bookmarkItemBuildMinYear;
  @Column(name = "bookmark_item_build_max_year")
  private Integer bookmarkItemBuildMaxYear;
  @Column(name = "bookmark_item_month_min_price")
  private Integer bookmarkItemMonthMinPrice;
  @Column(name = "bookmark_item_month_max_price")
  private Integer bookmarkItemMonthMaxPrice;

  @Column(name = "bookmark_item_buy_min_price")
  private Integer bookmarkItemBuyMinPrice;

  @Column(name = "bookmark_item_buy_max_price")
  private Integer bookmarkItemBuyMaxPrice;

  @Column(name = "bookmark_item_min_deposit")
  private Integer bookmarkItemMinDeposit;

  @Column(name = "bookmark_item_max_deposit")
  private Integer bookmarkItemMaxDeposit;

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
      Integer bookmarkBuildingType, Double bookmarkMinArea, Double bookmarkMaxArea, Integer bookmarkItemBuildMinYear, Integer bookmarkItemBuildMaxYear,
      Integer bookmarkItemMonthMinPrice, Integer bookmarkItemMonthMaxPrice, Integer bookmarkItemBuyMinPrice, Integer bookmarkItemBuyMaxPrice,
      Integer bookmarkItemMinDeposit, Integer bookmarkItemMaxDeposit, Long userId, String dongcode) {

    this.bookmarkTitle = bookmarkTitle;
    this.bookmarkComment = bookmarkComment;
    this.bookmarkItemType = bookmarkItemType;
    this.bookmarkBuildingType = bookmarkBuildingType;
    this.bookmarkMinArea = bookmarkMinArea;
    this.bookmarkMaxArea = bookmarkMaxArea;
    this.bookmarkItemBuildMinYear = bookmarkItemBuildMinYear;
    this.bookmarkItemBuildMaxYear = bookmarkItemBuildMaxYear;
    this.bookmarkItemMonthMinPrice = bookmarkItemMonthMinPrice;
    this.bookmarkItemMonthMaxPrice = bookmarkItemMonthMaxPrice;
    this.bookmarkItemBuyMinPrice = bookmarkItemBuyMinPrice;
    this.bookmarkItemBuyMaxPrice = bookmarkItemBuyMaxPrice;
    this.bookmarkItemMinDeposit = bookmarkItemMinDeposit;
    this.bookmarkItemMaxDeposit = bookmarkItemMaxDeposit;
    this.userId = userId;
    this.dongcode = dongcode;
  }

  public void update(String bookmarkTitle, String bookmarkComment,
      Integer bookmarkItemType, Integer bookmarkBuildingType,
      Integer bookmarkItemBuildMinYear, Integer bookmarkItemBuildMaxYear, Double bookmarkMinArea, Double bookmarkMaxArea,
      Integer bookmarkItemMonthMinPrice, Integer bookmarkItemMonthMaxPrice, Integer bookmarkItemBuyMinPrice, Integer bookmarkItemBuyMaxPrice,
      Integer bookmarkItemMinDeposit, Integer bookmarkItemMaxDeposit){
    this.bookmarkTitle = bookmarkTitle;
    this.bookmarkComment = bookmarkComment;
    this.bookmarkItemType = bookmarkItemType;
    this.bookmarkBuildingType = bookmarkBuildingType;
    this.bookmarkItemBuildMinYear = bookmarkItemBuildMinYear;
    this.bookmarkItemBuildMaxYear = bookmarkItemBuildMaxYear;
    this.bookmarkMinArea = bookmarkMinArea;
    this.bookmarkMaxArea = bookmarkMaxArea;
    this.bookmarkItemMonthMinPrice = bookmarkItemMonthMinPrice;
    this.bookmarkItemMonthMaxPrice = bookmarkItemMonthMaxPrice;
    this.bookmarkItemBuyMinPrice = bookmarkItemBuyMinPrice;
    this.bookmarkItemBuyMaxPrice = bookmarkItemBuyMaxPrice;
    this.bookmarkItemMinDeposit = bookmarkItemMinDeposit;
    this.bookmarkItemMaxDeposit = bookmarkItemMaxDeposit;

  }
}