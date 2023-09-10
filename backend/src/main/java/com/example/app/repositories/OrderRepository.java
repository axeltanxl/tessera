package com.example.app.repositories;

import org.springframework.data.repository.CrudRepository;
import com.example.app.models.CustOrder;

public interface OrderRepository extends CrudRepository<CustOrder, Integer>{
    
}
