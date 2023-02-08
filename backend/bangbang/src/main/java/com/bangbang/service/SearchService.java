package com.bangbang.service;

import com.bangbang.domain.search.Search;
import com.bangbang.domain.search.SearchRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class SearchService {
  private final SearchRepository searchRepository;

  public SearchService(SearchRepository searchRepository) {
    this.searchRepository = searchRepository;
  }

  public List<Search> searchByKeyword(String keyword) {
    return searchRepository.findByKeyword(keyword);
  }
}