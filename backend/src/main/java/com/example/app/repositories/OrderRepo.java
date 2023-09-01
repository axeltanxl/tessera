package com.example.app.repositories;

import org.springframework.data.repository.CrudRepository;
import com.example.app.models.Order;

public interface OrderRepo extends CrudRepository<Order, Integer>{
    
}
