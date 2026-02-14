import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Smile, Mic } from "lucide-react";
import AppLayout from "@/components/AppLayout";

interface Message {
  id: string;
  text: string;
  sent: boolean;
  time: string;
}

const mockMessages: Message[] = [
  { id: "1", text: "Good morning, love! ☀️", sent: false, time: "9:00 AM" },
  { id: "2", text: "Good morning! How did you sleep? 💕", sent: true, time: "9:02 AM" },
  { id: "3", text: "Dreamed about you 🥰", sent: false, time: "9:03 AM" },
  { id: "4", text: "You're the sweetest! Can't wait to see you today", sent: true, time: "9:05 AM" },
  { id: "5", text: "Me neither! I have a surprise for you 🎁", sent: false, time: "9:06 AM" },
];

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: input,
        sent: true,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setInput("");
  };

  return (
    <AppLayout title="Chat">
      <div className="flex flex-col" style={{ height: "calc(100vh - 120px)" }}>
        <div className="flex-1 overflow-y-auto space-y-3 pb-4">
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`flex ${msg.sent ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                  msg.sent
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-card border border-border text-card-foreground rounded-bl-md"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p
                  className={`text-[10px] mt-1 ${
                    msg.sent ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}
                >
                  {msg.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-card border border-border rounded-2xl p-2">
          <button className="text-muted-foreground hover:text-foreground p-1.5 transition-colors">
            <Smile size={20} />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground font-body"
          />
          <button className="text-muted-foreground hover:text-foreground p-1.5 transition-colors">
            <Mic size={20} />
          </button>
          <button
            onClick={sendMessage}
            className="bg-primary text-primary-foreground rounded-xl p-2 hover:opacity-90 transition-opacity"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Chat;
