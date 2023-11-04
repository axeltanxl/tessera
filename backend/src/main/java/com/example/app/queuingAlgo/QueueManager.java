package com.example.app.queuingAlgo;

import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;

public class QueueManager {
    private final Queue<String> userQueue = new ConcurrentLinkedQueue<>();

    public void addUserToQueue(String userId) {
        userQueue.offer(userId);
    }

    public String getNextUserInQueue() {
        return userQueue.poll();
    }
}
