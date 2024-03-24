//message list
var messages = [];
var queue = [];
var isWriting = false;

const urlDebut = window.location.origin;

const inputElement = document.querySelector('.writer');

// Désactiver la sélection de texte dans l'input
inputElement.addEventListener('select', function (event) {
    event.preventDefault();
});


// auto focus on input
document.querySelector('.writer').focus();

//always focus on input
document.querySelector('.writer').addEventListener('blur', function () {
    document.querySelector('.writer').focus();
});

//syncronize input and text-write
document.querySelector('.writer').addEventListener('input', function () {
    document.querySelector('.text-write').textContent = this.value;
});

//on enter
document.querySelector('.writer').addEventListener('keypress', function (e) {
    if (e.keyCode == 13) {
        var text = this.value;
        this.value = '';
        //post the message to the server
        let conversationToken = localStorage.getItem('conversationToken');
        axios.post(urlDebut + '/api/v1/conversation/' + conversationToken, {
            message: text
        })
            .then(function (response) {
                messages.push({message: text, date: response.data.createdAt});
            })

        document.querySelector('.history').innerHTML += '<div class="line">><span class="text">' + text + '</span></div>';
        document.querySelector('body').scrollTop = document.querySelector('body').scrollHeight;
        document.querySelector('.text-write').textContent  = '';
    } else {
        var char = String.fromCharCode(e.which || e.keyCode);
        if (char === ' ') {
            char = '\u00A0'; // Replace space with non-breaking space
        }
        var textWrite = document.querySelector('.text-write');
        var newText = textWrite.textContent;
        var caretPosition = this.selectionStart;
        var newText = newText.slice(0, caretPosition) + char + newText.slice(caretPosition);
        textWrite.textContent = newText;
        this.setSelectionRange(caretPosition + 1, caretPosition + 1); // Move caret position
    }
});

function scrollToBottom() {
    //scroll to bottom of the page
    document.querySelector('body').scrollTop = document.querySelector('body').scrollHeight;
}

function writeText(lineToWrite) {
    return new Promise(resolve => {
        // Ajouter la ligne à la file d'attente
        queue.push({text: lineToWrite, resolve: resolve});

        // Si ce n'est pas déjà en train d'écrire, commencer à écrire
        if (!isWriting) {
            writeNextLine();
        }
    });
}

function writeNextLine() {
    // Vérifier s'il y a des éléments dans la file d'attente
    if (queue.length > 0) {
        // Récupérer la première ligne dans la file d'attente
        var {text, resolve} = queue.shift();
        var i = 0;
        isWriting = true;

        var interval = setInterval(function () {
            var char = text[i];
            if (char === ' ') {
                char = '\u00A0'; // Remplace l'espace par un espace insécable
            }
            document.querySelector('.text-write').textContent  += char;
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                document.querySelector('.writer').value = '';
                document.querySelector('.history').innerHTML += '<div class="line">><span class="text">' + text + '</span></div>';
                scrollToBottom(); // Faire défiler vers le bas
                document.querySelector('.text-write').textContent  = '';
                isWriting = false;

                // Résoudre la promesse pour indiquer que l'écriture est terminée
                resolve();

                // Passer à la prochaine ligne dans la file d'attente
                writeNextLine();
            }
        }, 100);
    }
}


//get ip address of the user and display it
fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        writeText('Welcome to the U.C.P. (Unconventional Computer Program)').then(() => {
            writeText('Your IP address is ' + data.ip).then(() => {
                writeText('Trying to connect to the server..........................................').then(() => {

                    //get local cache data
                    let conversationToken = localStorage.getItem('conversationToken') || '';

                    axios.post(urlDebut + '/api/v1/conversation', {
                        conversationToken: conversationToken
                    })
                        .then(function (response) {
                            let server = response.data.conversationToken;
                            localStorage.setItem('conversationToken', server);
                        })


                    writeText('Connection established').then(() => {
                        //load the conversation history
                        axios.get(urlDebut + '/api/v1/conversation/' + conversationToken)
                            .then(function (response) {
                                let conversation = response.data.conversationMessages;
                                if (conversation === null || conversation === undefined || conversation.length === 0 || conversation.size === 0) {
                                    writeText('Welcome to the server').then(() => {
                                    });
                                } else {
                                    conversation.forEach(function (line) {
                                        document.querySelector('.history').innerHTML += '<div class="line">><span class="text">' + line.message + '</span></div>';
                                        messages.push({message: line.message, date: line.createdAt});
                                        scrollToBottom();
                                    });
                                    scrollToBottom();
                                }


                                // check if new message is sent every 10 seconds
                                setInterval(function () {
                                    let conversationToken = localStorage.getItem('conversationToken') || '';
                                    axios.get(urlDebut + '/api/v1/conversation/' + conversationToken)
                                        .then(function (response) {
                                            let conversation = response.data.conversationMessages;
                                            conversation.forEach(function (line) {
                                                //load only new messages with the date
                                                let found = false;
                                                messages.forEach(function (message) {
                                                    if (message.message === line.message && message.date === line.createdAt) {
                                                        found = true;
                                                    }
                                                });
                                                if (!found) {
                                                    writeText(line.message).then(r => {
                                                    });
                                                    messages.push({message: line.message, date: line.createdAt});
                                                }

                                            });
                                            document.querySelector('.history').scrollTop = document.querySelector('.history').scrollHeight;
                                        });
                                }, 10000);
                            });

                    });
                });
            });
        });
    });


const container = document.querySelector('body');
let isScrolling = false;

container.addEventListener('scroll', function () {
    if (!isScrolling) {
        isScrolling = true;
        setTimeout(function () {
            isScrolling = false;
        }, 200); // Ajustez la durée de l'intervalle selon vos besoins
    } else {
        this.scrollTop += 50; // Ajustez la valeur de défilement selon vos besoins
    }
});

document.addEventListener('click', function() {
    document.querySelector('.writer').focus();
});

// Path: script.js