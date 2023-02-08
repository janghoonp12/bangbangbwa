package com.bangbang.dto.search;

import com.bangbang.domain.item.DongCode;
import com.bangbang.domain.item.GugunCode;
import com.bangbang.domain.item.SidoCode;
import java.util.List;
import lombok.Getter;

@Getter
public class SearchResultDto {
  private List<DongCode> dongCodes;
  private List<GugunCode> gugunCodes;
  private List<SidoCode> sidoCodes;

  public SearchResultDto(List<DongCode> dongCodes, List<GugunCode> gugunCodes, List<SidoCode> sidoCodes) {
    this.dongCodes = dongCodes;
    this.gugunCodes = gugunCodes;
    this.sidoCodes = sidoCodes;
  }
}