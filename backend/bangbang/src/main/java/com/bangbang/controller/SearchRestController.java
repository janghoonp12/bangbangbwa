package com.bangbang.controller;

import com.bangbang.domain.search.Search;
import com.bangbang.service.SearchService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Api(value="SearchRestController-Version 1")
public class SearchRestController {

  @Autowired
  SearchService searchService;

  @ApiOperation(value = "키워드 검색", notes = "키워드로 지역을 검색합니다.")
  @GetMapping(value = "/search/{keyword}")
  public ResponseEntity<List<Search>> search(@PathVariable String keyword) {
    List<Search> results = searchService.searchByKeyword(keyword);
    if (results.isEmpty()) {
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    return new ResponseEntity<>(results, HttpStatus.OK);
  }
}

