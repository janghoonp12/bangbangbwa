package com.bangbang.controller;

import com.bangbang.dto.search.SearchResultDto;
import com.bangbang.service.SearchService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Api(value="SearchRestController-Version 1")
public class SearchRestController {
  @Autowired
  private final SearchService searchService;

  @ApiOperation(value="키워드 검색")
  @GetMapping("/search")
  public ResponseEntity<SearchResultDto> search(
      @RequestParam String dongCode,
      @RequestParam String keyword) {
    try {
      SearchResultDto searchResult = searchService.search(dongCode, keyword);
      return new ResponseEntity<>(searchResult, HttpStatus.OK);
    } catch (Exception e) {
      return exceptionHandling();
    }
  }

  private ResponseEntity exceptionHandling() {
    return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
