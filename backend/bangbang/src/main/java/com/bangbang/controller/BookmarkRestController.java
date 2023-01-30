package com.bangbang.controller;

import com.bangbang.dto.bookmark.BookmarkSaveRequestDto;
import com.bangbang.service.BookmarkService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.HashMap;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Api(value="BookmarkRestController-Version 1")
public class BookmarkRestController {
  private final BookmarkService bookmarkService;

  @PostMapping(value = "/bookmarks/new")
  @ApiOperation(value = "즐겨찾기 등록", notes = "즐겨찾기를 등록합니다.")
  public ResponseEntity<?> newBookmark(@RequestBody BookmarkSaveRequestDto requestDto){
    bookmarkService.newBookmark(requestDto);
    return new ResponseEntity<Object>(new HashMap<String, Object>() {{
      put("result", true);
      put("msg", "즐겨찾기 등록을 성공하였습니다.");
    }}, HttpStatus.OK);
  }
}
