package com.bangbang.service;

import com.bangbang.vo.Broadcast;
import java.util.ArrayList;
import org.springframework.stereotype.Service;

@Service
public class BroadcastServiceImpl implements BroadcastService{

  @Override
  public String newBroadcast(Broadcast broadCast) {
    return null;
  }

  @Override
  public ArrayList<Broadcast> searchBroadcastAll() {
    return null;
  }

  @Override
  public ArrayList<Broadcast> searchBroadcastFilter() {
    return null;
  }

  @Override
  public String deactivateBroadcast(int broadcast_id) {
    return null;
  }

  @Override
  public String modifyBroadcast(int broadcast_id) {
    return null;
  }
}
