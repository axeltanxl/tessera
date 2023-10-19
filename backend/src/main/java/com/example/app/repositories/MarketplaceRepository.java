package com.example.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.app.models.Marketplace;

@Repository
public interface MarketplaceRepository extends JpaRepository<Marketplace, Long>{
    List<Marketplace> findByStatus(String status);
}
