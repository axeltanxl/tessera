package com.example.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.app.models.CustOrder;
import com.example.app.models.Run;
import com.example.app.models.Ticket;

import java.util.List;

public interface OrderRepository extends JpaRepository<CustOrder, Long>{
    List<CustOrder> findOrderByUserUserID(long userId);
}
