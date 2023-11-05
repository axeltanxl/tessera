package com.example.app.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.models.Transaction;
import com.example.app.models.TransactionsDTO;
import com.example.app.models.User;
import com.example.app.repositories.TransactionRepository;

@RestController
// @RequestMapping("/api/v1/")
public class TransactionController {

    @Autowired
    private TransactionRepository transacRepo;

    private TransactionsDTO createTransactionsDTO(Transaction transaction) {
        TransactionsDTO transacDTO = new TransactionsDTO();

        if (transaction.getBuyer() != null) {
            transacDTO.setBuyerID(transaction.getBuyer().getUserID());
        }

        if (transaction.getSeller() != null) {
            transacDTO.setSellerID(transaction.getSeller().getUserID());
        }
        transacDTO.setDate(transaction.getDate());
        transacDTO.setTicketID(transaction.getTicket().getTicketID());
        transacDTO.setTransactionID(transaction.getTransactionID());

        return transacDTO;
    }
    
    // For users whom wants to see their past transactions.
    @GetMapping("/transactionHistory")
    public ResponseEntity<List<TransactionsDTO>> getTransactionHistory() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User authenticatedUser = (User) authentication.getPrincipal();

        //For seller
        List<Transaction> sellerTransactionList = transacRepo.findAllTransactionsBySeller(authenticatedUser);
        List<Transaction> buyerTransactionList = transacRepo.findAllTransactionsByBuyer(authenticatedUser);

        List<TransactionsDTO> transacDTOList = new ArrayList<>();

        for (Transaction eachSellerTrans : sellerTransactionList) {
            transacDTOList.add(createTransactionsDTO(eachSellerTrans));
        }
        for (Transaction eachBuyerTrans : buyerTransactionList) {
            transacDTOList.add(createTransactionsDTO(eachBuyerTrans));
        }

        return ResponseEntity.ok(transacDTOList);
    }
}
