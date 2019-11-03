package com.virtualidentity.summits.ascentservice.controller;

import com.virtualidentity.summits.ascentservice.model.Ascent;
import com.virtualidentity.summits.ascentservice.model.User;
import com.virtualidentity.summits.ascentservice.service.AscentService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class AscentController {

    private AscentService ascentService;

    public AscentController(AscentService ascentService) {
        this.ascentService = ascentService;
    }

    @GetMapping("/ascent")
    @ResponseBody
    public Ascent ascent() {
        return new Ascent("Matterhorn", 0);
    }

    @GetMapping("/fetch-user")
    @ResponseBody
    public User fetchUser() {
        User user = ascentService.fetchUser();
        return user;
    }

}
