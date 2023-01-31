package com.bangbang.dto.bookmark;

import io.swagger.models.auth.In;
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

  private Integer bookmarkItemMinPrice;
  private Integer bookmarkItemMaxPrice;

  @Builder
  public BookmarkUpdateRequestDto(String bookmarkTitle, String bookmarkComment,
      Integer bookmarkItemType, Integer bookmarkBuildingType, Integer bookmarkItemMinPrice, Integer bookmarkItemMaxPrice){

    this.bookmarkTitle = bookmarkTitle;
    this.bookmarkComment = bookmarkComment;
    this.bookmarkItemType = bookmarkItemType;
    this.bookmarkBuildingType = bookmarkBuildingType;
    this.bookmarkItemMinPrice = bookmarkItemMinPrice;
    this.bookmarkItemMaxPrice = bookmarkItemMaxPrice;
  }
}
