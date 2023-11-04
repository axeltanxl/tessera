package com.example.app.models;

import java.sql.Date;
import java.util.*;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class EventDTO {
    private long eventID;
    private String name;
    private String category;
    private String description;
    private Date startDate;
    private Date endDate;
    private int duration;
    private String pricePerCategory;
    private int maxSlots;
    private String displayImage;

    private List<Run> runs;
}
