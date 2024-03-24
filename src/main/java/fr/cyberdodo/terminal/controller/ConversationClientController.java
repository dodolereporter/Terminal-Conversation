package fr.cyberdodo.terminal.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping({"/index", "/"})
public class ConversationClientController {

    @RequestMapping
    public String index() {
        return "index";
    }
}
