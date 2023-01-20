package com.bangbang.vo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface BroadcastRepository extends JpaRepository<Broadcast, Integer> {

}
