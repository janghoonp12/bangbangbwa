package com.bangbang.domain.item;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface OptionRepository extends JpaRepository<Option, Long> {

    @Transactional(readOnly = true)
    @Query(value = "select o from Option o where o.item_id=:itemId")
    Option findByItemId(@Param("itemId")long itemId);
}