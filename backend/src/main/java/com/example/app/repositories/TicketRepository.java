package com.example.app.repositories;

import com.example.app.models.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findTicketByOrderOrderID(long orderId);
    List<Ticket> findAllByTicketID(long ticketID);
    //for 1 ticket
    Optional<Ticket> findOneTicketByOrderOrderID(Long orderId);
}