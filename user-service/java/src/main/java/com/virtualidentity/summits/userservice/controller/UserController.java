package com.virtualidentity.summits.userservice.controller;

import com.virtualidentity.summits.userservice.model.User;
import com.virtualidentity.summits.userservice.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class UserController {

    private UserService userService;

    UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    @ResponseBody
    public User user() {
        return null;
    }

    @GetMapping("/newuser")
    @ResponseBody
    public User newuser() {
        User newUser = userService.createUser("username", "First", "Last", "username@mail.org", "password");
        return newUser;
    }

}
