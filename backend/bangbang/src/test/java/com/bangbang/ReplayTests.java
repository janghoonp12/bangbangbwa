package com.bangbang;

import com.bangbang.domain.broadcast.Broadcast;
import com.bangbang.domain.broadcast.BroadcastRepository;
import com.bangbang.domain.replay.Replay;
import com.bangbang.domain.replay.ReplayRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class ReplayTests {

  @Autowired
  ReplayRepository replayRepository;

  @Autowired
  BroadcastRepository broadcastRepository;

  @Test
  public void save_replay_broadcast(){
    Broadcast broadcast = Broadcast.builder()
        .broadcast_title("풍")
        .broadcast_description("22평")
        .broadcast_status(0)
        .item_id(4)
        .image_id(4)
        .build();
    broadcastRepository.save(broadcast);

    Replay replay = Replay.builder()
        .replay_storage_location("asdgwet")
        .replay_status(1)
        .build();

    replay.setBroadcast(broadcast); //연관관계

    replayRepository.save(replay);
  }
}
