package com.example.app.models;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransactionsDTO {
    private long transactionID;
    private Date date;
    private long ticketID;
    private long buyerID;
    private long sellerID;
}
