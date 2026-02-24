package com.bank.userservice.service;

import com.bank.userservice.dto.UserCreateDto;
import com.bank.userservice.dto.UserResponseDto;

public interface UserService {

    UserResponseDto createUser(UserCreateDto dto);

    UserResponseDto getCurrentUser(String keycloakId);   // used after JWT extraction

    UserResponseDto getUserById(Long id);

    UserResponseDto updateUser(Long id, UserCreateDto dto);

    void deleteUser(Long id);
}