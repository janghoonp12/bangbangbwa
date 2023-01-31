package com.bangbang.dto.bookmark;

import com.bangbang.domain.bookmark.Bookmark;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BookmarkSaveRequestDto {

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
  private Long userId;
  private String dongCode;

  @Builder
  public BookmarkSaveRequestDto(String bookmarkTitle, String bookmarkComment, Integer bookmarkItemType, Double bookmarkArea,
      Integer bookmarkBuildingType, Integer bookmarkItemBuildMinYear, Integer bookmarkItemBuildMaxYear,
      Integer bookmarkItemMinPrice, Integer bookmarkItemMaxPrice, Long userId, String dongCode){
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
    this.dongCode = dongCode;
  }

  public Bookmark toEntity(){
    return Bookmark.builder()
        .bookmarkTitle(bookmarkTitle)
        .bookmarkComment(bookmarkComment)
        .bookmarkItemType(bookmarkItemType)
        .bookmarkArea(bookmarkArea)
        .bookmarkBuildingType(bookmarkBuildingType)
        .bookmarkItemBuildMinYear(bookmarkItemBuildMinYear)
        .bookmarkItemBuildMaxYear(bookmarkItemBuildMaxYear)
        .bookmarkItemMinPrice(bookmarkItemMinPrice)
        .bookmarkItemMaxPrice(bookmarkItemMaxPrice)
        .userId(userId)
        .dongcode(dongCode)
        .build();
  }

}
