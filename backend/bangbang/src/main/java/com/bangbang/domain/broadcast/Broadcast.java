package com.bangbang.domain.broadcast;

import javax.persistence.*;

import com.bangbang.domain.Datetime;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
@Entity(name = "broadcast")
public class Broadcast extends Datetime {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "broadcast_id")
  private int broadcastid; //PK

  @Column(length = 10, nullable = true)
  private String broadcast_description;       //방송설명

  @Column(length = 1, nullable = true)
  private int broadcast_status;               //방송상태

  @Column(length = 30, nullable = true)
  private String broadcast_title;             //방송제목

  @Column(length = 2, nullable = false)
  private int item_id;      //FK
  @Column(length = 2, nullable = false)
  private int image_id;     //FK


  //  @PrePersist
//  public void prePersist(){
//    this.broadcast_reservation_time = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
//    this.broadcast_start_time = this.broadcast_reservation_time;
//    this.broadcast_end_time = this.broadcast_reservation_time;
//  }
//
//  @PreUpdate
//  public void preUpdate(){
//    this.broadcast_end_time = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
//  }
}
