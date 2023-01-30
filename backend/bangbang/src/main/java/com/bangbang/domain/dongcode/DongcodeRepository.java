package com.bangbang.domain.dongcode;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DongcodeRepository extends JpaRepository<Dongcode, String> {
  Optional<Dongcode> findByDongcodeId(String dongcodeId);
}
