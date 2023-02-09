package com.bangbang.dto.bookmark;

import com.bangbang.domain.bookmark.Bookmark;
import com.bangbang.domain.broadcast.Broadcast;
import lombok.Getter;

@Getter
public class BookmarkResponseDto {
  private Long bookmarkId;
  private String bookmarkTitle;
  private String bookmarkComment;
  private Integer bookmarkItemType;
  private Integer bookmarkBuildingType;
  private Double bookmarkMinArea;
  private Double bookmarkMaxArea;
  private Integer bookmarkItemBuildMinYear;
  private Integer bookmarkItemBuildMaxYear;
  private Integer bookmarkItemMonthMinPrice;
  private Integer bookmarkItemMonthMaxPrice;
  private Integer bookmarkItemBuyMinPrice;
  private Integer bookmarkItemBuyMaxPrice;
  private Integer bookmarkItemMinDeposit;
  private Integer bookmarkItemMaxDeposit;


  public BookmarkResponseDto(Bookmark entity){
    this.bookmarkId = entity.getBookmarkId();
    this.bookmarkTitle = entity.getBookmarkTitle();
    this.bookmarkComment = entity.getBookmarkComment();
    this.bookmarkItemType = entity.getBookmarkItemType();
    this.bookmarkBuildingType = entity.getBookmarkBuildingType();
    this.bookmarkMinArea = entity.getBookmarkMinArea();
    this.bookmarkMaxArea = entity.getBookmarkMaxArea();
    this.bookmarkItemBuildMinYear = entity.getBookmarkItemBuildMinYear();
    this.bookmarkItemBuildMaxYear = entity.getBookmarkItemBuildMaxYear();
    this.bookmarkItemMonthMinPrice = entity.getBookmarkItemMonthMinPrice();
    this.bookmarkItemMonthMaxPrice = entity.getBookmarkItemMonthMaxPrice();
    this.bookmarkItemBuyMinPrice = entity.getBookmarkItemBuyMinPrice();
    this.bookmarkItemBuyMaxPrice = entity.getBookmarkItemBuyMaxPrice();
    this.bookmarkItemMinDeposit = entity.getBookmarkItemMinDeposit();
    this.bookmarkItemMaxDeposit = entity.getBookmarkItemMaxDeposit();
  }
}
