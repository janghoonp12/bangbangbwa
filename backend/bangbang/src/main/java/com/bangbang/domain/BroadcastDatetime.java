package com.bangbang.domain;

import javax.persistence.EntityListeners;

import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class BroadcastDatetime {

    @LastModifiedDate
    private LocalDateTime broadcast_start_time;

    @LastModifiedDate
    private LocalDateTime broadcast_end_time;


}
