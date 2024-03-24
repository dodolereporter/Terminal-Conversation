package fr.cyberdodo.terminal.controller;

import fr.cyberdodo.terminal.dto.PostGetTokenDto;
import fr.cyberdodo.terminal.dto.PostMessageDto;
import fr.cyberdodo.terminal.entity.Conversation;
import fr.cyberdodo.terminal.entity.ConversationMessage;
import fr.cyberdodo.terminal.repository.ConversationMessageRepository;
import fr.cyberdodo.terminal.repository.ConversationRepository;
import fr.cyberdodo.terminal.util.TokenManager;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.security.SecureRandom;

@Slf4j
@RestController
@RequestMapping("/api/v1/conversation")
public class ConversationController {

    @Autowired
    private TokenManager tokenManager;

    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private ConversationMessageRepository conversationMessageRepository;


    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public PostGetTokenDto getConversationToken(@RequestBody PostGetTokenDto body) {
        log.info("{}", body);
        String conversationToken = body.getConversationToken();
        Conversation conversation = null;
        if (conversationToken == null || conversationToken.isEmpty()) {
            conversation = tokenManager.createConversation();
        } else {
            conversation = conversationRepository.findByConversationToken(conversationToken);
            if (conversation == null) {
                conversation = tokenManager.createConversation();
            }
        }

        PostGetTokenDto response = new PostGetTokenDto();
        response.setConversationToken(conversation.getConversationToken());
        return response;
    }

    @GetMapping("/{conversationToken}")
    public Conversation getConversation(@PathVariable String conversationToken) {
        return conversationRepository.findByConversationToken(conversationToken);
    }

    @GetMapping("/all")
    public Iterable<Conversation> getAllConversations() {
        return conversationRepository.findAll();
    }

    @PostMapping("/{conversationToken}")
    public ConversationMessage sendMessage(@PathVariable String conversationToken, @RequestBody PostMessageDto body) {
        Conversation conversation = conversationRepository.findByConversationToken(conversationToken);
        if (conversation == null) {
            throw new IllegalArgumentException("Invalid conversation token");
        }
        ConversationMessage message = new ConversationMessage();
        message.setMessage(body.getMessage());
        message.setConversation(conversation);
        conversationMessageRepository.save(message);
        return message;
    }


}
