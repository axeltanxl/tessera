package com.example.app.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.models.CATandSectDTO;
import com.example.app.models.RunSeatDTO;
import com.example.app.services.SeatService;

@RestController
@RequestMapping("/api/v1")
public class SeatController {
    
    // @GetMapping("/admin/getQtyOfSeats")
    // public ResponseEntity<Object> getQtyOfSeats(@RequestBody) {
    private final SeatService seatService;

    public SeatController(SeatService seatService) {
        this.seatService = seatService;
    }

    // }
    //Get ALL seats that are linked to a CAT and SECTION.
    // @GetMapping("/admin/getAllSeats")
    // public ResponseEntity<Object> getQtyOfSeats(@RequestBody CATandSectDTO reqBody) {

    //     int getQty = seatService.getQtyOfSeats(reqBody.getSection(), reqBody.getCategory());

    //     return ResponseEntity.ok().body("Seats : " + getQty);
    // }

    @GetMapping("/admin/getAllSeats/runs/{runID}")
    public ResponseEntity<List<RunSeatDTO>> listOfSeatIDs(@RequestBody CATandSectDTO reqBody, 
    @PathVariable("runID") Long runID) {

        List<RunSeatDTO> seatLists = seatService.getAllSeatIDs(reqBody.getSection(), 
        reqBody.getCategory(), runID);

        return ResponseEntity.ok().body(seatLists);
    }
}
