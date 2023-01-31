package com.bangbang.dto.bookmark;

import com.bangbang.domain.bookmark.Bookmark;
import lombok.Getter;

@Getter
public class BookmarkListResponseDto {
  private Long bookmarkId;
  private String bookmarkTitle;
  private String bookmarkComment;

  public BookmarkListResponseDto(Bookmark entity){
    this.bookmarkId = entity.getBookmarkId();
    this.bookmarkTitle = entity.getBookmarkTitle();
    this.bookmarkComment = entity.getBookmarkComment();
  }
}
