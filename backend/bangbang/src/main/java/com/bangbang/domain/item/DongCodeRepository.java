package com.bangbang.domain.item;

import com.bangbang.dto.item.DongDto;
import com.bangbang.dto.item.SiGuDongDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DongCodeRepository extends JpaRepository<DongCode, String> {
    @Query(value = "select distinct d.dongName, d.dongCode " +
            "from dongcode d " +
            "where left(d.dongCode, 5) =:gugunCode and d.dongCode is not null and d.dongName is not null " +
            "order by d.dongName", nativeQuery = true)
    List<DongDto> getDongInGugun(@Param("gugunCode") String gugunCode); //동을 가져오는 쿼리

    @Query(value = "select d.sidoName, d.gugunName, d.dongName " +
            "from dongcode d " +
            "where d.dongCode =:dongCode", nativeQuery = true)
    SiGuDongDto getAddressName(@Param("dongCode") String dongCode); //시,구,동을 조회하는 쿼리
}
