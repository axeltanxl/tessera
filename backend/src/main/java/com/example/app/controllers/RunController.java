package com.example.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.repositories.RunRepository;

@RestController
@RequestMapping("/api/v1")
public class RunController {

    @Autowired
    private RunRepository runRepository;
}
