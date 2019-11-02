package com.virtualidentity.summits.userservice.service;

import com.virtualidentity.summits.userservice.model.User;

public interface UserService {

    User createUser(String username, String firstName, String lastName, String email, String password);
}
