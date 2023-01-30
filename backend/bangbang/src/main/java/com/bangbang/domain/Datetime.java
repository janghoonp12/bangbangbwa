package com.bangbang.domain;

import javax.persistence.EntityListeners;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.time.LocalDateTime;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class Datetime {
    @CreatedDate
    private LocalDateTime broadcast_reservation_time;

    @CreatedDate
    private LocalDateTime broadcast_start_time;

    @LastModifiedDate
    private LocalDateTime broadcast_end_time;
}
