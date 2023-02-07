package com.bangbang.domain.item;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OptionRepository extends JpaRepository<Option, Long> {
    @Query(value = "select o from Option o where o.item_id=:itemId")
    Option findByItemId(long itemId);
}