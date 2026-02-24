package com.bank.userservice.dto;

import lombok.Data;

@Data
public class UserCreateDto {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String address;
    private String keycloakId;     // set by backend after Keycloak creation
}