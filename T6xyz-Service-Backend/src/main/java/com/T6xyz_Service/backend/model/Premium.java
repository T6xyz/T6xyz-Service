package com.T6xyz_Service.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Premium {
    String id;
    String userId;
    String type;
    Long startDate;
    Long endState;
}
