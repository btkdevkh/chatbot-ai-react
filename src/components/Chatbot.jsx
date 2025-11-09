import { useState } from "react";
import axios from "axios";
import Loader from "./Loader";

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
    <div
      className={`${
        messages.length === 0 ? "max-w-[600px]" : "max-w-[1200px]"
      }  min-w-[320px] mx-auto py-4 text-white`}
    >
      <div className="md:flex md:gap-5">
        {messages.length > 0 && (
          <div className="bg-[#1f2839] px-4 py-5 flex-1 rounded-2xl h-fit mb-5">
            {/* Historique des questions */}
            <h2 className="text-2xl mb-5">Historique des questions</h2>
            <div className="flex flex-col gap-2">
              {messages
                .filter((msg) => msg.sender === "user")
                .map((msg, i) => (
                  <a
                    key={i}
                    className="bg-gray-900 p-3 rounded-2xl w-fit"
                    href={`#${msg.text.split(" ").join("-")}`}
                  >
                    {msg.text}
                  </a>
                ))}
            </div>
          </div>
        )}

        <div className="w-full mx-auto flex flex-col gap-3 flex-3">
          {messages.length === 0 && (
            <h2 className="text-3xl mb-5">
              Bonjour, comment puis-je vous aider ?
            </h2>
          )}

          <div className="flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div key={i} id={msg.text.split(" ").join("-")}>
                <p
                  className={`wrap-anywhere ${
                    msg.sender === "user"
                      ? "bg-[#303030] p-3 rounded-2xl w-fit"
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
              placeholder="Posez une question..."
              className="w-full border-2 border-violet-400 p-3 rounded-2xl focus:border-violet-600 outline-none"
            />
            <button
              type="submit"
              className="w-[100px] bg-violet-700 p-3 rounded-2xl font-bold cursor-pointer hover:bg-violet-800 transition"
            >
              {loading ? <Loader /> : "Envoyer"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
