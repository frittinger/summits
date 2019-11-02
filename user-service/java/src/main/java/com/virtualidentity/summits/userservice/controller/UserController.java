package com.virtualidentity.summits.userservice.controller;

import com.virtualidentity.summits.userservice.model.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class UserController {

    @GetMapping("/user")
    @ResponseBody
    public User user() {
        return new User("Frank", 0);
    }

}
