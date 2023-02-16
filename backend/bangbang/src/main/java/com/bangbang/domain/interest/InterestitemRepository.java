package com.bangbang.domain.interest;

import com.bangbang.domain.item.Item;
import com.bangbang.dto.interest.InterestitemSaveRequestDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterestitemRepository extends JpaRepository<Interestitem, Long>{
    List<Interestitem> findByUserId(Long userId);
    @Query("select i from Interestitem i where i.userId =:userId and i.itemId =:itemId")
    Interestitem interestItemStatus(Long userId, Long itemId);
}
