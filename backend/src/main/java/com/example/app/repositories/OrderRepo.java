package com.example.app.repositories;

import org.springframework.data.repository.CrudRepository;
import com.example.app.models.CustOrder;

public interface OrderRepo extends CrudRepository<CustOrder, Integer>{
    
}
