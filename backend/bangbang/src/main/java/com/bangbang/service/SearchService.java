package com.bangbang.service;

import com.bangbang.domain.item.DongCode;
import com.bangbang.domain.item.GugunCode;
import com.bangbang.domain.item.SidoCode;
import com.bangbang.domain.search.SearchDongRepository;
import com.bangbang.domain.search.SearchGugunRepository;
import com.bangbang.domain.search.SearchSidoRepository;
import com.bangbang.dto.search.SearchResultDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SearchService {
  @Autowired
  private final SearchDongRepository searchDongRepository;
  @Autowired
  private final SearchGugunRepository searchGugunRepository;
  @Autowired
  private final SearchSidoRepository searchSidoRepository;


  public SearchResultDto search(String keyword) {
    List<DongCode> dongCodes = searchDongRepository.findByDongNameContaining(keyword);
    List<GugunCode> gugunCodes = searchGugunRepository.findByGugunNameContaining(keyword);
    List<SidoCode> sidoCodes = searchSidoRepository.findBySidoNameContaining(keyword);

    return new SearchResultDto(dongCodes, gugunCodes, sidoCodes);
  }
}