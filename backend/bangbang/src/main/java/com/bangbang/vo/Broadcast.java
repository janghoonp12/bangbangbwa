package com.bangbang.vo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity(name = "broadcast")
public class Broadcast {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int broadcast_id; //PK
  private int item_id;      //FK
  private int image_id;     //FK
  private String broadcast_title;             //방송제목
  private String broadcast_description;       //방송설명
  private int broadcast_status;            //방송상태
  private String broadcast_reservation_time;  //방송예약시간
  private String broadcast_start_time;        //방송시작시간
  private String broadcast_end_time;          //방송종료시간

  public Broadcast(int item_id,int image_id, String broadcast_title,
      String broadcast_description, int broadcast_status, String broadcast_reservation_time,
      String broadcast_start_time, String broadcast_end_time) {
    this.item_id = item_id;
    this.image_id = image_id;
    this.broadcast_title = broadcast_title;
    this.broadcast_description = broadcast_description;
    this.broadcast_status = broadcast_status;
    this.broadcast_reservation_time = broadcast_reservation_time;
    this.broadcast_start_time = broadcast_start_time;
    this.broadcast_end_time = broadcast_end_time;
  }
}
