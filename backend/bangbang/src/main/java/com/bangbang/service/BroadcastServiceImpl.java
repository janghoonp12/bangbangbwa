package com.bangbang.service;

import com.bangbang.vo.Broadcast;
import com.bangbang.vo.BroadcastRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("BroadcastService")
public class BroadcastServiceImpl implements BroadcastService{
    @Autowired
    private BroadcastRepository repository;

    @Override
    public String newBroadcast(Broadcast broadCast) {
        return null;
    }

    @Override
    public List<Broadcast> searchBroadcastAll() {
        return null;
    }

    @Override
    public List<Broadcast> searchBroadcastFilter() {
        return null;
    }

    @Override
    public Broadcast deactivateBroadcast(int broadcastid, Broadcast broadcast) {
        final Broadcast Broadcast = repository.findByBroadcastid(broadcastid);
        if(broadcast == null) return null;

        if(broadcast.getBroadcast_status() == 0) {
            broadcast.setBroadcast_status(1);
        }
        else if (broadcast.getBroadcast_status() == 1){
            broadcast.setBroadcast_status(0);
        }
        repository.save(broadcast);
        return broadcast;
    }

    @Override
    public Broadcast modifyBroadcast(int broadcastid, Broadcast broadcast) {
        final Broadcast Broadcast = repository.findByBroadcastid(broadcastid);
        if(broadcast == null) return null;

        if(broadcast.getBroadcast_status() == 0) {
            broadcast.setBroadcast_status(1);
        }
        else if (broadcast.getBroadcast_status() == 1){
            broadcast.setBroadcast_status(0);
        }
        repository.save(broadcast);
        return broadcast;
    }
}
