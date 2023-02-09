package com.bangbang.domain.item;

import com.bangbang.dto.item.SidoDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SidoCodeRepository extends JpaRepository<SidoCode, String> {
    @Query(value="select left(s.sidoCode, 2) as sidoCode, s.sidoName as sidoName " +
            "from sidocode s " +
            "order by s.sidoCode", nativeQuery = true)
    List<SidoDto> getSido(); //시,도 리스트를 가져오는 쿼리
}