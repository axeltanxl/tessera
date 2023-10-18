package com.example.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.models.CustOrder;
import com.example.app.repositories.OrderRepository;
import java.util.*;


@RestController
@RequestMapping("/api/v1")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("users/{userID}/orders")
    public List<CustOrder> getOrderByUserID(@PathVariable long userID) {
        List<CustOrder> orders = orderRepository.findOrderByUserUserID(userID);
        return orders;
    }
}
