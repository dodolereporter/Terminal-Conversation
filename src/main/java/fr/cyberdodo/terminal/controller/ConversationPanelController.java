package fr.cyberdodo.terminal.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping({"/panel"})
public class ConversationPanelController {

        @RequestMapping
        public String index() {
            return "panel";
        }
}
