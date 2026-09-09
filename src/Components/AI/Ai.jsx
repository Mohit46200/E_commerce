import { useState } from "react";

function Ai() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!text.trim() || loading) return;

    const userMessage = text;

    // Show user's message immediately
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    setText("");
    setLoading(true);

    try {
      const response = await fetch("https://projects-backend-6.onrender.com/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: userMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Show AI response
      const functionName = data.functionCall.functionCall.name;
      const functionArgs = data.functionCall.functionCall.args;

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: `${functionName}\n${JSON.stringify(functionArgs, null, 2)}`,
        },
      ]);
    } catch (error) {
        console.error("Frontend error:", error);

        setMessages((prev) => [
            ...prev,
            {
            role: "ai",
            text: error.message,
            },
        ]);
        } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

        
        return (
        <div className="w-[400px] mx-auto my-[50px] font-sans">
            <h2 className="text-xl font-semibold mb-4">AI Chat</h2>

            {/* Messages */}
            <div className="h-[400px] border border-gray-300 p-[15px] overflow-y-auto mb-[10px]">
            {messages.map((message, index) => (
                <div
                key={index}
                className={`mb-[15px] ${
                    message.role === "user" ? "text-right" : "text-left"
                }`}
                >
                <div
                    className={`inline-block p-[10px] rounded-[10px] max-w-[80%] ${
                    message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                >
                    {message.text}
                </div>
                </div>
            ))}

            {loading && <p>AI is thinking...</p>}
            </div>

            {/* Input */}
            <div className="flex gap-[10px]">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask something..."
                className="flex-1 p-[10px] border border-gray-300 rounded"
            />

            <button
                onClick={sendMessage}
                disabled={loading || !text.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
                Send
            </button>
            </div>
        </div>
        );


}

export default Ai;

