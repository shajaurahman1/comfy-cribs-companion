
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, ArrowDown } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

interface ChatInterfaceProps {
  onSendMessage: (message: string) => void;
  messages: Message[];
  isTyping?: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  onSendMessage,
  messages,
  isTyping = false,
}) => {
  const [inputValue, setInputValue] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col h-full rounded-lg overflow-hidden border bg-card">
      <div className="p-4 border-b bg-muted/20">
        <h3 className="font-semibold text-lg">Funky Homes Assistant</h3>
        <p className="text-sm text-muted-foreground">Ask me anything about rentals!</p>
      </div>

      <ScrollArea 
        className="flex-1 p-4"
        ref={scrollAreaRef}
        onScroll={(e) => {
          const target = e.currentTarget;
          const isNearBottom = target.scrollHeight - target.scrollTop - target.clientHeight < 100;
          setShowScrollButton(!isNearBottom);
        }}
      >
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message-bubble ${
                message.sender === "assistant"
                  ? "message-assistant"
                  : "message-user"
              }`}
            >
              <p>{message.text}</p>
              <div className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="message-bubble message-assistant">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: "0s" }}></div>
                <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {showScrollButton && (
        <Button
          className="absolute bottom-20 right-8 rounded-full w-10 h-10 p-0 bg-rental-primary hover:bg-rental-dark"
          onClick={scrollToBottom}
        >
          <ArrowDown size={20} />
        </Button>
      )}

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            className="bg-rental-primary hover:bg-rental-dark"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
