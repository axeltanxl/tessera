package com.example.app.models;

import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity // This tells Hibernate to make a table out of this class
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userID;

    private String name;
    @NotNull(message = "Email cannot be empty")
    @Email(message = "Email invalid")
    private String email;
    @NotNull(message = "Password cannot be empty")
    private String password;
    private String contactNum;
    private String address;
    private String stripeUserID;

    @Enumerated(EnumType.STRING)
    private Role role;

    @JsonManagedReference(value="user-order")
    @OneToMany(mappedBy = "user")
    private List<CustOrder> orders;

    @JsonManagedReference(value="user-buyer")
    @OneToMany(mappedBy = "buyer")
    private List<Transaction> buyerTransactions;

    @JsonManagedReference(value="user-seller")
    @OneToMany(mappedBy = "seller")
    private List<Transaction> sellerTransactions;

    @JsonManagedReference(value="ticketListing-user")
    @OneToMany(mappedBy = "user")
    private List<TicketListing> ticketListings;

    @JsonManagedReference(value="ticket-user")
    @OneToMany(mappedBy = "user")
    private List<Ticket> tickets;

    public User(String name, @NotNull(message = "Email cannot be empty") String email,
        @NotNull(message = "Password cannot be empty") String password, String contactNum, String address, Role role) {
      this.name = name;
      this.email = email;
      this.password = password;
      this.contactNum = contactNum;
      this.address = address;
      this.role = role;
    }

    //no override?
    public long getUserID(){
      return userID;
    }

    // ALL from UserDetails (Spring Boot default - Security)
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public List<CustOrder> getOrders() {
      return orders;
    }

    public void setOrders(List<CustOrder> orders) {
      this.orders = orders;
    }

    public List<Transaction> getBuyerTransactions() {
      return buyerTransactions;
    }

    public void setBuyerTransactions(List<Transaction> buyerTransactions) {
      this.buyerTransactions = buyerTransactions;
    }

    public List<Transaction> getSellerTransactions() {
      return sellerTransactions;
    }

    public void setSellerTransactions(List<Transaction> sellerTransactions) {
      this.sellerTransactions = sellerTransactions;
    }
}
