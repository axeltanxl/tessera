package com.example.app.queuingAlgo;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class QueueController{

    private QueueManager queueManager;
    
    @MessageMapping("/joinQueue")
    @SendTo("/queue/updates")
    public String joinQueue() {
        System.out.println("asd");
        // System.out.println(userId);
        String uniqueId = "123551";
        queueManager.addUserToQueue(uniqueId);

        // Return a confirmation message
        return "You've joined the queue with ID: " + uniqueId;
        // Handle user registration and joining the queue
    }

    @MessageMapping("/serveNextUser")
    public String serveNextUser() {
        System.out.println("QWDQWD?");
        // Handle user leaving the queue
        String nextUser = queueManager.getNextUserInQueue();

        if (nextUser != null) {
            return "Serving user with ID: " + nextUser;
        } else {
            return "No users in the queue.";
        }
    }

    // @MessageMapping("/leaveQueue")
    // public void leaveQueue(User user) {
    //     System.out.println("QWDQWD?");
    //     // Handle user leaving the queue
    // }
    
    // Additional message handling methods
}