package com.example.app.models;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Marketplace {
    //Primary Key
    @Id
    private long marketplaceID;
    private String status;
    private Date openingDate;
    private Date closingDate;
    
    @JsonManagedReference
    @OneToOne(mappedBy = "marketplace")
    private Run run;
}
