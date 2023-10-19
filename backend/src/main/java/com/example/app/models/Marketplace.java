package com.example.app.models; 
 
import java.sql.Date; 
import java.util.List; 
 
import com.fasterxml.jackson.annotation.JsonManagedReference; 
 
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany; 
import jakarta.persistence.OneToOne; 
import jakarta.persistence.Transient; 
import lombok.Getter; 
import lombok.Setter; 
 
@Entity 
@Getter 
@Setter 
public class Marketplace { 
    //Primary Key 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long marketplaceID; 
    private String status; 
    private Date openingDate; 
    private Date closingDate; 
     
    @JsonManagedReference(value="marketplace-run")
    @OneToOne(mappedBy = "marketplace")
    private Run run;
 
    @JsonManagedReference(value="ticketListing-marketplace") 
    @OneToMany(mappedBy = "marketplace") 
    private List<TicketListing> ticketListings; 
 
    @Transient 
    private EventDTO eventDTO;
}