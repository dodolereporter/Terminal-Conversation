package fr.cyberdodo.terminal.repository;

import fr.cyberdodo.terminal.entity.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {

    boolean existsByConversationToken(String conversationToken);

    Conversation findByConversationToken(String conversationToken);
}
