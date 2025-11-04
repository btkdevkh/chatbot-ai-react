import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInput("");

    if (!input) {
      return alert("Veuillez entrer un message.");
    }

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    setLoading(true);
    const res = await axios.post(API_URL, {
      message: input,
      replyHistory: messages,
    });

    const botMessage = { sender: "bot", text: res.data.answer };

    setMessages((prev) => [...prev, botMessage]);
    setLoading(false);
  };

  return (
    <div className="max-w-[720px] min-w-[320px] mx-auto p-4 text-white">
      <div className="flex flex-col gap-3">
        {messages.length === 0 && (
          <h2 className="text-3xl mb-3">Comment puis-je vous aider ?</h2>
        )}

        <div>
          {messages.map((msg, i) => (
            <div key={i}>
              <p
                className={`w-fit ${
                  msg.sender === "user"
                    ? "bg-[#303030] p-3 rounded-2xl mt-3 mb-3"
                    : "p-1"
                }`}
              >
                {msg.text}
              </p>
            </div>
          ))}
        </div>

        <form className="flex gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              loading ? "Le bot réfléchit..." : "Posez une question..."
            }
            className="w-full border border-violet-400 p-3 rounded-2xl"
          />
          <button
            type="submit"
            className="bg-violet-700 py-3 px-5 rounded-2xl font-bold cursor-pointer hover:bg-violet-800 transition"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
