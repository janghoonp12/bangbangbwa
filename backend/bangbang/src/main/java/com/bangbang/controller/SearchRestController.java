package com.bangbang.controller;

import com.bangbang.dto.search.SearchResultDto;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Api(value="SearchRestController-Version 1")
public class SearchRestController {
  @Autowired
  private final SearchService searchService;

  @GetMapping("/search")
  public ResponseEntity<SearchResultDto> search(@RequestParam("keyword") String keyword) {
    SearchResultDto result = searchService.search(keyword);
    return ResponseEntity.ok(result);
  }
}