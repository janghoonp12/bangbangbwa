package com.bangbang.controller;

import com.bangbang.dto.bookmark.BookmarkListResponseDto;
import com.bangbang.dto.bookmark.BookmarkSaveRequestDto;
import com.bangbang.dto.bookmark.BookmarkUpdateRequestDto;
import com.bangbang.service.BookmarkService;
import com.bangbang.service.CustomUserDetailsService;
import com.bangbang.util.JwtTokenProvider;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Api(value="BookmarkRestController-Version 1")
public class BookmarkRestController {
  private final BookmarkService bookmarkService;
  private final JwtTokenProvider jwtTokenProvider;
  private final CustomUserDetailsService customUserDetailsService;


  @GetMapping(value = "/user/bookmarks")
  @ApiOperation(value = "모든 즐겨찾기 조회", notes = "즐겨찾기를 모두 조회합니다.")
  public ResponseEntity<?> searchBookmarkAll(HttpServletRequest request){
    try {
      String token = jwtTokenProvider.resolveToken(request);
      Long uId = Long.valueOf(jwtTokenProvider.getUserId(token));
      List<BookmarkListResponseDto> bookmark = bookmarkService.searchBookmarkUser(uId);
      if(!bookmark.isEmpty()){
        return new ResponseEntity<List<BookmarkListResponseDto>>(bookmark, HttpStatus.OK);
      }
      else return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e){
      return extracted();
    }
  }

  @PostMapping(value = "/user/bookmarks/new")
  @ApiOperation(value = "즐겨찾기 등록", notes = "즐겨찾기를 등록합니다.")
  public ResponseEntity<?> newBookmark(@RequestBody BookmarkSaveRequestDto requestDto, HttpServletRequest request){
    try{

      String token = jwtTokenProvider.resolveToken(request);
      Long uId = Long.valueOf(jwtTokenProvider.getUserId(token));

      bookmarkService.newBookmark(requestDto, uId);
      return new ResponseEntity<Object>(new HashMap<String, Object>() {{
        put("result", true);
        put("msg", "즐겨찾기 등록을 성공하였습니다.");
      }}, HttpStatus.OK);

    } catch (Exception e) {
      e.printStackTrace();
      return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }


  }


  @PatchMapping(value = "/user/bookmarks/modify/{bookmarkId}")
  @ApiOperation(value = "즐겨찾기 수정", notes = "즐겨찾기를 수정합니다.")
  public ResponseEntity<?> modifyBookmark(@PathVariable Long bookmarkId, @RequestBody
      BookmarkUpdateRequestDto requestDto){
    bookmarkService.modifyBookmark(bookmarkId, requestDto);

    return new ResponseEntity<Object>(new HashMap<String, Object>() {{
      put("result", true);
      put("msg", "즐겨찾기 수정을 성공하였습니다.");
    }}, HttpStatus.OK);
  }


  @DeleteMapping(value = "/user/bookmarks/{bookmarkId}")
  @ApiOperation(value = "즐겨찾기 삭제", notes = "즐겨찾기를 삭제합니다.")
  public ResponseEntity<?> deleteBookmark(@PathVariable Long bookmarkId){
    try{
      bookmarkService.deleteBookmark(bookmarkId);
      return new ResponseEntity<Object>(new HashMap<String, Object>() {{
        put("result", true);
        put("msg", "즐겨찾기 삭제를 성공하였습니다.");
      }}, HttpStatus.OK);

    } catch (Exception e){
      e.printStackTrace();
      return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

  }
  private ResponseEntity extracted() {
    return new ResponseEntity(HttpStatus.NO_CONTENT);
  }
}
