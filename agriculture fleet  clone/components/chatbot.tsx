"use client"; // ✅ Required for React hooks in Next.js

import { useEffect, useState } from "react";

type Message = {
    sender: "user" | "bot";
    text: string;
};

export default function Chatbot() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>("");
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:5000"); // ✅ Connect to backend

        socket.onopen = () => console.log("✅ WebSocket connected");
        socket.onmessage = (event) =>
            setMessages((prev) => [...prev, { sender: "bot", text: event.data }]);

        setWs(socket);

        return () => socket.close();
    }, []);

    const sendMessage = () => {
        if (!input.trim() || !ws) return;
        setMessages([...messages, { sender: "user", text: input }]);
        ws.send(input);
        setInput("");
    };

    return (
        <div style={styles.container}>
            {/* ✅ Floating Chat Button */}
            {!isOpen && (
                <button onClick={() => setIsOpen(true)} style={styles.chatButton}>
                    💬 Chat
                </button>
            )}

            {/* ✅ Chat Window */}
            {isOpen && (
                <div style={styles.chatWindow}>
                    <div style={styles.header}>
                        <span>🚜 Agriculture Chatbot</span>
                        <button onClick={() => setIsOpen(false)}>✖</button>
                    </div>
                    <div style={styles.messages}>
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                style={{
                                    ...styles.message,
                                    backgroundColor: msg.sender === "user" ? "#DCF8C6" : "#E5E5EA",
                                    alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                                }}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <div style={styles.inputContainer}>
                        <input
                            style={styles.input}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about farming..."
                        />
                        <button onClick={sendMessage} style={styles.sendButton}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
}

// ✅ Type-safe styles
const styles: { [key: string]: React.CSSProperties } = {
    container: {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
    },
    chatButton: {
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        padding: "10px 20px",
        borderRadius: "20px",
        cursor: "pointer",
        fontSize: "16px",
    },
    chatWindow: {
        width: "300px",
        height: "400px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
    },
    header: {
        backgroundColor: "#28a745",
        color: "#fff",
        padding: "10px",
        fontSize: "16px",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "space-between",
    },
    messages: {
        flex: 1,
        padding: "10px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
    },
    message: {
        maxWidth: "80%",
        padding: "8px",
        marginBottom: "5px",
        borderRadius: "10px",
        wordWrap: "break-word",
    },
    inputContainer: {
        display: "flex",
        padding: "10px",
        borderTop: "1px solid #ddd",
    },
    input: {
        flex: 1,
        padding: "8px",
        border: "1px solid #ddd",
        borderRadius: "5px",
    },
    sendButton: {
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        padding: "8px 12px",
        marginLeft: "5px",
        cursor: "pointer",
        borderRadius: "5px",
    },
};
