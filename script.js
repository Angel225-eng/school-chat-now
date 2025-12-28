// さっきコピーした Firebase の設定
const firebaseConfig = {
  apiKey: "AIzaSyBPBP9kqfneGy1-6Q32Dc6mQReg6NA7hj4",
  authDomain: "chat-now-bf87c.firebaseapp.com",
  databaseURL: "https://chat-now-bf87c-default-rtdb.firebaseio.com",
  projectId: "chat-now-bf87c",
  storageBucket: "chat-now-bf87c.firebasestorage.app",
  messagingSenderId: "689354904054",
  appId: "1:689354904054:web:5b1dcbc5784286b39fb7d7",
  measurementId: "G-8ZJKQW7X1J"
};

// ここを追加する
firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const messagesRef = db.ref("messages");

// 以下チャット用コード（send() と child_added）
function send() {
  const name = document.getElementById("name").value;
  const msg = document.getElementById("msg").value;
  if (!name || !msg) return;

  messagesRef.push({
    name: name,
    text: msg,
    time: Date.now()
  });

  document.getElementById("msg").value = "";
}

messagesRef.limitToLast(50).on("child_added", snap => {
  const m = snap.val();
  const li = document.createElement("li");
  li.textContent = `${m.name}: ${m.text}`;
  document.getElementById("chat").appendChild(li);
});
