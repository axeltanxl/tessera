package com.example.app.repositories;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.app.models.CustOrder;


public interface OrderRepository extends JpaRepository<CustOrder, Long>{
    public List<CustOrder> findOrderByUserUserID(long userId);
}
