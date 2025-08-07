// Firebase config (use your actual config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("messageInput");

const currentUser = localStorage.getItem("chatUser") || "Anonymous";

// Send message
chatForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const messageText = messageInput.value.trim();

  if (messageText !== "") {
    db.ref("messages").push({
      sender: currentUser,
      text: messageText,
      timestamp: Date.now(),
    });
    messageInput.value = "";
  }
});

// Listen for messages
db.ref("messages").on("child_added", function (snapshot) {
  const message = snapshot.val();
  displayMessage(message.sender, message.text);
});

// Display message
function displayMessage(sender, text) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");

  if (sender === currentUser) {
    messageDiv.classList.add("you");
  } else {
    messageDiv.classList.add("them");
  }

  messageDiv.textContent = `${text}`;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
