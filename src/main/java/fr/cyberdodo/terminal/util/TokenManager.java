package fr.cyberdodo.terminal.util;

import fr.cyberdodo.terminal.entity.Conversation;
import fr.cyberdodo.terminal.repository.ConversationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigInteger;
import java.security.SecureRandom;

@Component
public class TokenManager {

    @Autowired
    SecureRandom random;

    @Autowired
    private ConversationRepository conversationRepository;

    public Conversation createConversation() {
        Conversation conversation = new Conversation();
        conversation.setConversationToken(generateConversationToken(10));
        conversationRepository.save(conversation);
        return conversation;
    }

    private String generateConversationToken(int length) {
        BigInteger randomValue = new BigInteger(length * 5, random);

        String token = randomValue.toString(16);

        while (token.length() < length) {
            token = "0" + token;
        }

        if (conversationRepository.existsByConversationToken(token)) {
            return generateConversationToken(length);
        }

        return token;
    }
}
