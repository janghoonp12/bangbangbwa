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
  private Double bookmarkArea;
  private Integer bookmarkItemBuildMinYear;
  private Integer bookmarkItemBuildMaxYear;

  private Integer bookmarkItemMinPrice;
  private Integer bookmarkItemMaxPrice;

  public BookmarkResponseDto(Bookmark entity){
    this.bookmarkId = entity.getBookmarkId();
    this.bookmarkTitle = entity.getBookmarkTitle();
    this.bookmarkComment = entity.getBookmarkComment();
    this.bookmarkItemType = entity.getBookmarkItemType();
    this.bookmarkBuildingType = entity.getBookmarkBuildingType();
    this.bookmarkArea = entity.getBookmarkArea();
    this.bookmarkItemBuildMinYear = entity.getBookmarkItemBuildMinYear();
    this.bookmarkItemBuildMaxYear = entity.getBookmarkItemBuildMaxYear();
    this.bookmarkItemMinPrice = entity.getBookmarkItemMinPrice();
    this.bookmarkItemMaxPrice = entity.getBookmarkItemMaxPrice();
  }
}
