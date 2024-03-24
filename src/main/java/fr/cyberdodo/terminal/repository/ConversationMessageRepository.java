package fr.cyberdodo.terminal.repository;

import fr.cyberdodo.terminal.entity.Conversation;
import fr.cyberdodo.terminal.entity.ConversationMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConversationMessageRepository extends JpaRepository<ConversationMessage, Long> {
}
