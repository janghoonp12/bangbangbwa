package com.bangbang.domain.broadcast;

import com.bangbang.domain.BroadcastDatetime;
import com.bangbang.domain.image.Image;
import com.bangbang.domain.item.Item;
import javax.persistence.*;

import com.bangbang.domain.BroadcastDatetime;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "broadcast")
public class Broadcast extends BroadcastDatetime{
  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  @Column(name = "broadcast_id")
  private Long broadcastId; //PK

  @Column(name = "broadcast_description",length = 10, nullable = true)
  private String broadcastDescription;       //방송설명

  @Column(name = "broadcast_status",length = 1, nullable = true)
  private Integer broadcastStatus;               //방송상태

  @Column(name = "broadcast_reservation_time")
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
  private LocalDateTime broadcastReservationTime;

  @Column(name = "broadcast_title",length = 30, nullable = true)
  private String broadcastTitle;             //방송제목

  @JoinTable(name="item",
          joinColumns = @JoinColumn(name="item_id"),
          inverseJoinColumns = @JoinColumn(name="item_id"))
  private Long itemId;      //FK

  @JoinColumn(name="image_id")
  @OneToOne(fetch = FetchType.LAZY)
  private Image image;     //FK

  @Column(name = "image_path")
  private String imagePath;

  @Column(name = "broadcast_room_id", length = 45, nullable = false)
  private String broadcastRoomId;

  @Builder
  public Broadcast(Long broadcastId, String broadcastDescription, Integer broadcastStatus,
      String broadcastTitle, Long itemId, String imagePath, LocalDateTime broadcastReservationTime, String broadcastRoomId){
    this.broadcastId = broadcastId;
    this.broadcastDescription = broadcastDescription;
    this.broadcastStatus = broadcastStatus;
    this.broadcastTitle = broadcastTitle;
    this.itemId = itemId;
    this.imagePath = imagePath;
    this.broadcastReservationTime = broadcastReservationTime;
    this.broadcastRoomId = broadcastRoomId;
  }

  public void update(Long broadcastId, String broadcastDescription, String broadcastTitle, String imagePath, LocalDateTime broadcastReservationTime){
    this.broadcastId = broadcastId;
    this.broadcastDescription = broadcastDescription;
    this.broadcastTitle = broadcastTitle;
    this.imagePath = imagePath;
    this.broadcastReservationTime = broadcastReservationTime;
  }
  public void starter(Long broadcastId){
    this.broadcastId = broadcastId;
    this.broadcastStatus = 2;
  }
  public void deactive(Long broadcastId){
    this.broadcastId = broadcastId;
    this.broadcastStatus = 3;
  }

}
