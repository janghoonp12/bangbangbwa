package com.bangbang.domain.replay;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReplayRepository extends JpaRepository<Replay, Integer> {
    List<Replay> findAll();
    Optional<Replay> findByReplayId(Long replayId);
}
