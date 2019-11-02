package com.virtualidentity.summits.summitservice.controller;

import com.virtualidentity.summits.summitservice.model.Summit;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class SummitsController {

    @GetMapping("/summit")
    @ResponseBody
    public Summit summit() {
        return new Summit("Matterhorn", 0);
    }

}
