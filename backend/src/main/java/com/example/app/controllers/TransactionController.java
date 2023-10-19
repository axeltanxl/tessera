package com.example.app.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.models.Transaction;
import com.example.app.models.User;
import com.example.app.repositories.TransactionRepository;

@RestController
@RequestMapping("/api/v1/")
public class TransactionController {

    @Autowired
    private TransactionRepository transacRepo;
    
    // For users whom wants to see their past transactions.
    @GetMapping("transactionHistory")
    public ResponseEntity<List<Transaction>> getTransactionHistory() {

        // User getUser = userRepo.getReferenceById(userID);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User authenticatedUser = (User) authentication.getPrincipal();

        //For seller
        List<Transaction> transactionList = transacRepo.findAllTransactionsBySeller(authenticatedUser);
        // List<Transaction> transactionList = transacRepo.findAllTransactionsByBuyer(authenticatedUser);

        transactionList.addAll(transacRepo.findAllTransactionsByBuyer(authenticatedUser));
// System.out.println("asdjkadajdsdlas");
// System.out.println(transactionList);
//         for (Transaction transactionObj : transactionList) {
//             System.out.println(transactionObj);
//         }
        return ResponseEntity.ok(transactionList);
    }
}
