package com.virtualidentity.summits.ascentservice.controller;

import com.virtualidentity.summits.ascentservice.model.Ascent;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class AscentController {

    @GetMapping("/summit")
    @ResponseBody
    public Ascent ascent() {
        return new Ascent("Matterhorn", 0);
    }

}
