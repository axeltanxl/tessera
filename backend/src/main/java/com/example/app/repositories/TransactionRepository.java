package com.example.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.app.models.Transaction;
import com.example.app.models.User;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findAllTransactionsBySeller(User seller);
    List<Transaction> findAllTransactionsByBuyer(User buyer);

}
