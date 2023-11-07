package com.example.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.models.Run;
import com.example.app.repositories.RunRepository;

@RestController
@RequestMapping("/api/v1")
public class RunController {

    @Autowired
    private RunRepository runRepository;

    @GetMapping("/runs/{runid}")
    public Run findRunByRunID (@PathVariable long  runid){
        Run run = runRepository.findByRunID(runid);
        return run;

    }
}
