package com.bangbang.domain;

import javax.persistence.EntityListeners;

import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class BroadcastDatetime {

    @LastModifiedDate
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime broadcast_start_time = LocalDateTime.of(LocalDateTime.now().getYear(), LocalDateTime.now().getMonth(),
            LocalDateTime.now().getDayOfMonth(), LocalDateTime.now().getHour(), LocalDateTime.now().getMinute(), 0, 0);


    @LastModifiedDate
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime broadcast_end_time = LocalDateTime.of(LocalDateTime.now().getYear(), LocalDateTime.now().getMonth(),
            LocalDateTime.now().getDayOfMonth(),  LocalDateTime.now().getHour(), LocalDateTime.now().getMinute(), 0, 0);;


}
