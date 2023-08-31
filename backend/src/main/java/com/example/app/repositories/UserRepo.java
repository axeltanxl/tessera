package com.example.app.repositories;

import org.springframework.data.repository.CrudRepository;

import com.example.app.models.User;

public interface UserRepo extends CrudRepository<User, Integer>{
    
}
