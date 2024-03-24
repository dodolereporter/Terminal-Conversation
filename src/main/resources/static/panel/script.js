let token = '';

const urlDebut = window.location.origin;

// Fonction pour charger la liste des conversations
function loadConversationList() {
    axios.get(urlDebut + '/api/v1/conversation/all')
        .then(function (response) {
            const conversations = response.data;
            const conversationList = document.querySelector('.conversation-list');
            conversationList.innerHTML = ''; // Clear existing list
            conversations.forEach(function (conversation) {
                const conversationItem = document.createElement('div');
                conversationItem.classList.add('conversation-item');
                conversationItem.innerText = conversation.conversationToken;
                conversationItem.addEventListener('click', function () {
                    loadConversation(conversation.conversationToken);
                });
                conversationList.appendChild(conversationItem);
            });
        });
}

// Fonction pour charger une conversation spécifique
function loadConversation(newToken) {
    token = newToken;
    axios.get(`${urlDebut}/api/v1/conversation/${token}`)
        .then(function (response) {
            const conversation = response.data;
            const conversationToken = document.getElementById('conversationToken');
            conversationToken.innerText = conversation.conversationToken; // Affichage du token de la conversation dans l'en-tête
            const conversationBody = document.getElementById('conversation-body');
            conversationBody.innerHTML = ''; // Clear existing conversation
            conversation.conversationMessages.forEach(function (message) {
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('message');
                messageDiv.innerHTML = `<p>${message.message}</p><p class="createdAt">${formatDate(message.createdAt)}</p>`;
                conversationBody.appendChild(messageDiv);
            });
            conversationBody.scrollTop = conversationBody.scrollHeight; // Scroll to bottom
        });
}

// Chargement initial de la liste des conversations
loadConversationList();

// Rafraîchissement automatique de la conversation
setInterval(function() {
    loadConversation(token);
}, 10000);

// Fonction pour envoyer un message
function sendMessage() {
    const message = document.getElementById('messageInput').value;
    if (message.trim() !== '') {
        axios.post(`${urlDebut}/api/v1/conversation/${token}`, { message: message })
            .then(function (response) {
                // Recharger la conversation après l'envoi du message
                loadConversation(token);
                // Effacer le champ de saisie après l'envoi
                document.getElementById('messageInput').value = '';
            });
    }
}

// Fonction pour formater la date
function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}