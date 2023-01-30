package com.bangbang.domain.alarm;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {
  List<Alarm> findAll();
  Optional<Alarm> findByAlarmId(Long alarmId);
}
