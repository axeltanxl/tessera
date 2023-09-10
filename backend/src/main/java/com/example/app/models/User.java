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
    private String email;
    private String password;
    private int contactNum;
    private String address;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "user")
    private List<CustOrder> orders;

    @OneToMany(mappedBy = "buyer")
    private List<Transaction> buyerTransactions;

    @OneToMany(mappedBy = "seller")
    private List<Transaction> sellerTransactions;

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
