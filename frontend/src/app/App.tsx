import { FormEvent, useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

interface Message {
  text: string;
  isFromCurrentUser: boolean;
}

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!inputValue) return;

    socket.emit("chat message", inputValue);

    setMessages((prev) => [
      ...prev,
      { text: inputValue, isFromCurrentUser: true },
    ]);

    setInputValue("");
  };

  useEffect(() => {
    const fetchHelloWorld = async () => {
      const res = await fetch("http://localhost:3000/").then((res) =>
        res.json()
      );
      console.log(res);
    };
    fetchHelloWorld();

    const chatMessageListener = (msg: string) => {
      setMessages((prev) => [...prev, { text: msg, isFromCurrentUser: false }]);
    };

    socket.on("chat message", chatMessageListener);

    return () => {
      socket.off("chat message", chatMessageListener);
    };
  }, []);

  return (
    <div>
      <div style={{ maxWidth: "300px" }}>
        {messages.map((msg) => (
          <p
            style={{
              backgroundColor: msg.isFromCurrentUser && "gray",
              textAlign: msg.isFromCurrentUser ? "right" : null,
            }}
          >
            {msg.text}
          </p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button>send</button>
      </form>
    </div>
  );
};
export default App;
