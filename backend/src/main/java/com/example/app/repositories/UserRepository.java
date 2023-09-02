package com.example.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.app.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
    
    // @Query("SELECT u FROM User u WHERE u.email=?1")
    <Optional>User findByEmail(String email);
}
