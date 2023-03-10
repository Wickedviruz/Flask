const form = document.querySelector('#chat-form');
const messageInput = document.querySelector('#message-input');
const chatLog = document.querySelector('#chat-log');
const toggleThemeBtn = document.querySelector('#toggle-theme');

let isDarkTheme = false;

toggleThemeBtn.addEventListener('click', () => {
  isDarkTheme = !isDarkTheme;
  document.body.classList.toggle('dark-theme', isDarkTheme);
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const message = messageInput.value.trim();
  if (!message) return;

  const response = await fetch('/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message })
  });

  if (response.ok) {
    const data = await response.json();
    const chatbotMessage = createChatMessage('ChatBot', data.message);
    chatLog.appendChild(chatbotMessage);
  }

  messageInput.value = '';
  messageInput.focus();
});

function createChatMessage(sender, message) {
  const chatMessage = document.createElement('p');
  chatMessage.classList.add('chat-message');
  chatMessage.innerHTML = `<strong>${sender}:</strong> ${message}`;
  return chatMessage;
}
