package com.example.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.models.CustOrder;
import com.example.app.models.Run;
import com.example.app.repositories.RunRepository;
import java.util.*;

@RestController
@RequestMapping("api/v1")
public class RunController {

    @Autowired
    private RunRepository runRepo;

    @GetMapping("run/{eventID}/runs")
    public List<Run> getRunsByEventID(@PathVariable long eventID) {
        List<Run> runs = runRepo.findRunByOrderOrderID(eventID);
        return runs;
    }
    
}
