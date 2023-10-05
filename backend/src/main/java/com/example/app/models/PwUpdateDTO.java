package com.example.app.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PwUpdateDTO {
    private String currPassword;
    private String newPassword;
}
