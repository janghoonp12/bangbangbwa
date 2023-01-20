package com.bangbang;

import com.bangbang.vo.Broadcast;
import com.bangbang.vo.BroadcastRepository;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class BroadcastTests {

  @Autowired
  BroadcastRepository repository;

  @Test
  public void save() throws Exception{
    repository.save(Broadcast.builder()
        .item_id(1)
        .image_id(1)
        .broadcast_title("풍무동 아파트")
        .broadcast_description("푸르지오 28평!!")
        .broadcast_status(0)
        .broadcast_reservation_time("2023-01-25 14:00")
        .broadcast_start_time("2023-01-25 14:10")
        .broadcast_end_time("2023-01-25 15:10")
        .build());

    List<Broadcast> list = repository.findAll();
    Broadcast broadcast = list.get(0);

  }
}
