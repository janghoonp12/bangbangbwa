package com.bangbang.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.time.LocalDateTime;

@Data
@MappedSuperclass
@SuperBuilder
@NoArgsConstructor
public class Datetime {
    private LocalDateTime broadcast_reservation_time;
    private LocalDateTime broadcast_start_time;
    private LocalDateTime broadcast_end_time;

    @PrePersist
    public void prePersist() {
        this.broadcast_reservation_time = LocalDateTime.now();
        this.broadcast_start_time = this.broadcast_reservation_time;
        this.broadcast_end_time = this.broadcast_reservation_time;
    }

    @PreUpdate
    public void preUpdate(){
        this.broadcast_end_time = LocalDateTime.now();
    }
}
