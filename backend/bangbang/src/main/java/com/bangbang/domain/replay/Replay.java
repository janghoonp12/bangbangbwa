package com.bangbang.domain.replay;

import javax.persistence.*;

import com.bangbang.domain.broadcast.Broadcast;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class Replay {

  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  @Column(name = "replay_id")
  private Long replayId;

  @Column(name = "replay_storage_location",length = 200, nullable = true)
  private String replayStorageLocation;
  @Column(name = "replay_status",length = 1, nullable = true)
  private Integer replayStatus;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(nullable = false, name = "broadcast_id")
  private Broadcast broadcast;

  @Builder
  public Replay(Long replayId, String replayStorageLocation, Integer replayStatus, Broadcast broadcast){
    this.replayId = replayId;
    this.replayStorageLocation = replayStorageLocation;
    this.replayStatus = replayStatus;
    this.broadcast = broadcast;
  }

  public void deactive(Long replayId){
    this.replayId = replayId;
    this.replayStatus = 0;
  }

}
