package com.bangbang.dto.bookmark;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BookmarkUpdateRequestDto {
  private Long bookmarkId;
  private String bookmarkTitle;
  private String bookmarkComment;

  private Integer bookmarkItemType;
  private Integer bookmarkBuildingType;
  private Integer bookmarkItemBuildMinYear;
  private Integer bookmarkItemBuildMaxYear;
  private Double bookmarkMinArea;
  private Double bookmarkMaxArea;
  private Integer bookmarkItemMonthMinPrice;
  private Integer bookmarkItemMonthMaxPrice;
  private Integer bookmarkItemBuyMinPrice;
  private Integer bookmarkItemBuyMaxPrice;

  private Integer bookmarkItemMinDeposit;
  private Integer bookmarkItemMaxDeposit;

  @Builder
  public BookmarkUpdateRequestDto(String bookmarkTitle, String bookmarkComment,
      Integer bookmarkItemType, Integer bookmarkBuildingType, Double bookmarkMinArea, Double bookmarkMaxArea,
      String bookmarkItemBuildMinYear, String bookmarkItemBuildMaxYear, Integer bookmarkItemMonthMinPrice, Integer bookmarkItemMonthMaxPrice,
      Integer bookmarkItemBuyMinPrice, Integer bookmarkItemBuyMaxPrice,
      Integer bookmarkItemMinDeposit, Integer bookmarkItemMaxDeposit){

    this.bookmarkTitle = bookmarkTitle;
    this.bookmarkComment = bookmarkComment;
    this.bookmarkItemType = bookmarkItemType;
    this.bookmarkBuildingType = bookmarkBuildingType;
    this.bookmarkMinArea = bookmarkMinArea;
    this.bookmarkMaxArea = bookmarkMaxArea;
    this.bookmarkItemBuildMinYear = Integer.parseInt(bookmarkItemBuildMinYear);
    this.bookmarkItemBuildMaxYear = Integer.parseInt(bookmarkItemBuildMaxYear);
    this.bookmarkItemMonthMinPrice = bookmarkItemMonthMinPrice;
    this.bookmarkItemMonthMaxPrice = bookmarkItemMonthMaxPrice;
    this.bookmarkItemBuyMinPrice = bookmarkItemBuyMinPrice;
    this.bookmarkItemBuyMaxPrice = bookmarkItemBuyMaxPrice;
    this.bookmarkItemMinDeposit = bookmarkItemMinDeposit;
    this.bookmarkItemMaxDeposit = bookmarkItemMaxDeposit;
  }
}
