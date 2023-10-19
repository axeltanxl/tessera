package com.example.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.app.models.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}