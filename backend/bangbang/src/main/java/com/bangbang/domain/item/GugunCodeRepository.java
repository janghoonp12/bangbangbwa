package com.bangbang.domain.item;

import com.bangbang.dto.item.GugunDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GugunCodeRepository extends JpaRepository<GugunCode, String> {
    @Query(value = "select left(g.gugunCode,5) as gugunCode, g.gugunName " +
            "from guguncode g " +
            "where left(g.gugunCode,2) =:sidoCode " +
            "order by g.gugunCode", nativeQuery = true)
    List<GugunDto> getGugunInSido(@Param("sidoCode") String sidoCode); //시,군,구 리스트를 가져오는 쿼리
}
