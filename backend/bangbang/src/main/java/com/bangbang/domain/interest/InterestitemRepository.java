package com.bangbang.domain.interest;

import com.bangbang.domain.item.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterestitemRepository extends JpaRepository<Interestitem, Long>{
    @Query("select i from Item i, Interestitem it where i.item_id = it.itemId and it.userId =:userId")
    List<Item> searchInterestItem(Long userId);
    List<Interestitem> findByUserId(Long userId);
    @Query("select i from Interestitem i where i.userId =:userId and i.itemId =:itemId")
    Interestitem interestItemStatus(Long userId, Long itemId);
}
