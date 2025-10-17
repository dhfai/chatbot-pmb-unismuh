import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import {
  Send,
  MessageCircle,
  HelpCircle,
  Info,
  Sparkles,
  ChevronsDown,
  ShieldCheck,
  ArrowLeft,
  User,
  FileText,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = "";

const ChatMessage = ({ message, aiIconUrl, isLastBotMessage }) => {
  const [renderedContent, setRenderedContent] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    if (message.type === "user" || !isLastBotMessage) {
      setRenderedContent(message.content);
      setIsTypingDone(true);
      return;
    }

    setIsTypingDone(false);
    const plainText = message.content
      .replace(/<[^>]*>?/gm, "")
      .replace(/\*\*/g, "");
    let i = 0;
    const intervalId = setInterval(() => {
      if (i <= plainText.length) {
        setRenderedContent(plainText.slice(0, i));
        i++;
      } else {
        clearInterval(intervalId);
        setRenderedContent(message.content);
        setIsTypingDone(true);
      }
    }, 20);

    return () => clearInterval(intervalId);
  }, [message.content, message.type, isLastBotMessage]);

  const messageVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      key={message.id}
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      className={`flex w-full ${
        message.type === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex items-end gap-2.5 max-w-[85%] sm:max-w-[75%] ${
          message.type === "user" ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg overflow-hidden ${
            message.type === "bot" ? "bg-secondary" : "bg-muted"
          }`}
        >
          {message.type === "bot" ? (
            <img
              src={aiIconUrl}
              alt="Bot"
              className="w-full h-full object-cover p-0.5"
            />
          ) : (
            <User className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div
            className={`px-4 py-3 shadow-xl shadow-black/5 dark:shadow-black/10 text-sm ${
              message.type === "bot"
                ? "bg-secondary text-secondary-foreground rounded-t-2xl rounded-br-2xl"
                : "bg-input text-foreground rounded-t-2xl rounded-bl-2xl"
            }`}
          >
            <p
              className="leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: renderedContent }}
            ></p>
            {isTypingDone && (
              <p
                className={`text-xs mt-2 ${
                  message.type === "bot"
                    ? "text-muted-foreground/70"
                    : "text-muted-foreground/70"
                } text-right`}
              >
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}
          </div>

          {/* Display sources and confidence scores for bot messages */}
          {message.type === "bot" && message.sources && message.sources.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-3 py-2 bg-muted/50 backdrop-blur-sm rounded-lg text-xs space-y-2"
            >
              <div className="flex items-center gap-1.5 text-muted-foreground font-semibold">
                <FileText className="w-3.5 h-3.5" />
                <span>Sumber Referensi ({message.retrieved_documents})</span>
              </div>
              <div className="space-y-1">
                {message.sources.map((source, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <TrendingUp className="w-3 h-3 mt-0.5 text-primary flex-shrink-0" />
                    <div className="flex-1">
                      <span className="text-foreground/80">{source}</span>
                      {message.confidence_scores && message.confidence_scores[idx] && (
                        <span className="ml-2 text-primary font-medium">
                          ({Math.round(message.confidence_scores[idx] * 100)}%)
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};const ChatbotPage = () => {
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState(null);
  const [isSessionReady, setIsSessionReady] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "initial-bot-1",
      type: "bot",
      content:
        "Assalamu alaikum! 👋 Selamat datang di Asisten AI. Saya siap membantu Anda dengan informasi pendaftaran.",
      timestamp: new Date(),
    },
    {
      id: "initial-bot-2",
      type: "bot",
      content:
        "Silakan ajukan pertanyaan tentang jalur pendaftaran, program studi, biaya, atau jadwal. Anda juga bisa memilih topik di bawah ini.",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const { toast } = useToast();
  const aiIconUrl =
    "https://i.pinimg.com/originals/0c/67/5a/0c675a8e1061478d2b7b21b330093444.gif";
  const quickTopics = [
    { name: "Fakultas", icon: <MessageCircle size={16} /> },
    { name: "Biaya kuliah jurusan informatika", icon: <HelpCircle size={16} /> },
    { name: "Prodi yang tersedia di FEB", icon: <Info size={16} /> },
    { name: "Akredetasi Informatika", icon: <Sparkles size={16} /> },
    { name: "FKIP", icon: <ShieldCheck size={16} /> },
  ];

  // Create session when component mounts
  useEffect(() => {
    const createSession = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/sessions/create`, {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error("Failed to create session");
        }

        const data = await response.json();
        setSessionId(data.session_id);
        setIsSessionReady(true);

        toast({
          title: "✅ Terhubung ke Server",
          description: "Session berhasil dibuat. Anda bisa mulai bertanya!",
          duration: 3000,
          className:
            "bg-card/80 backdrop-blur-lg border-accent/50 text-accent-foreground",
        });
      } catch (error) {
        console.error("Error creating session:", error);
        setIsSessionReady(false);

        toast({
          title: "⚠️ Gagal Terhubung",
          description: "Tidak dapat terhubung ke server. Pastikan API sudah berjalan.",
          duration: 5000,
          variant: "destructive",
        });
      }
    };

    createSession();
  }, [toast]);

  const handleScroll = () => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      setShowScrollButton(
        chatContainer.scrollHeight -
          chatContainer.scrollTop -
          chatContainer.clientHeight >
          300
      );
    }
  };
  const scrollToBottom = (behavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior, block: "end" });
  };
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    chatContainer?.addEventListener("scroll", handleScroll);
    return () => chatContainer?.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (!showScrollButton) {
      scrollToBottom("smooth");
    }
  }, [messages, isTyping, showScrollButton]);

  const handleSendMessage = async (content) => {
    const messageText = content || inputMessage;
    if (!messageText.trim() || isTyping) return;

    // Check if session is ready
    if (!isSessionReady || !sessionId) {
      toast({
        title: "⚠️ Session Belum Siap",
        description: "Tunggu sebentar, sedang menghubungkan ke server...",
        duration: 3000,
        variant: "destructive",
      });
      return;
    }

    const newMessage = {
      id: `user-${Date.now()}`,
      type: "user",
      content: messageText,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    if (!content) setInputMessage("");
    setIsTyping(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: sessionId,
          message: messageText,
        }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Session tidak valid atau expired");
        } else if (response.status === 503) {
          throw new Error("Chatbot service belum ready. Tunggu sebentar dan coba lagi.");
        }
        throw new Error("Terjadi kesalahan saat mengirim pesan");
      }

      const data = await response.json();

      const botResponse = {
        id: `bot-${Date.now()}`,
        type: "bot",
        content: data.response,
        timestamp: new Date(),
        sources: data.sources || [],
        confidence_scores: data.confidence_scores || [],
        retrieved_documents: data.retrieved_documents || 0,
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error sending message:", error);

      // Handle session expired error
      if (error.message.includes("Session tidak valid")) {
        toast({
          title: "❌ Session Expired",
          description: "Session Anda telah berakhir. Memuat ulang halaman...",
          duration: 3000,
          variant: "destructive",
        });

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        const errorResponse = {
          id: `bot-${Date.now()}`,
          type: "bot",
          content: `⚠️ Maaf, terjadi kesalahan: ${error.message}. Silakan coba lagi.`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorResponse]);

        toast({
          title: "❌ Error",
          description: error.message,
          duration: 4000,
          variant: "destructive",
        });
      }
    } finally {
      setIsTyping(false);
    }
  };

  const handleTopicClick = (topicName) => {
    handleSendMessage(topicName);
    toast({
      title: `🔎 Mencari info: ${topicName}`,
      description: "Pertanyaan Anda telah dikirim.",
      duration: 3000,
      className:
        "bg-card/80 backdrop-blur-lg border-accent/50 text-accent-foreground",
    });
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
      },
    },
  };
  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };
  const inputAreaVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center p-0 sm:p-4 bg-background aurora-background">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col h-full w-full max-w-3xl bg-card/60 dark:bg-card/50 backdrop-blur-2xl shadow-2xl shadow-black/10 dark:shadow-black/20 rounded-none sm:rounded-3xl overflow-hidden border border-black/10 dark:border-white/10"
      >
        <motion.div
          variants={headerVariants}
          className="bg-card/50 dark:bg-card/40 backdrop-blur-xl p-4 border-b border-black/5 dark:border-white/5 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                onClick={() => navigate("/")}
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full"
                aria-label="Kembali ke Beranda"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </motion.div>
            <div className="relative">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center shadow-lg ring-2 ring-primary/30 overflow-hidden">
                <img
                  src={aiIconUrl}
                  alt="Asisten AI"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 block h-4 w-4 rounded-full bg-green-500 ring-4 ring-card animate-pulse"></span>
            </div>
            <div>
              <h1 className="text-xl font-bold animated-gradient-text">
                Asisten AI PMB
              </h1>
              <p className="text-xs text-muted-foreground">
                {isSessionReady ? "Online & Responsif" : "Menghubungkan..."}
              </p>
            </div>
          </div>
        </motion.div>
        <div
          ref={chatContainerRef}
          className="flex-1 flex flex-col gap-5 p-4 overflow-y-auto custom-scrollbar min-h-0 relative"
        >
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <ChatMessage
                key={message.id}
                message={message}
                aiIconUrl={aiIconUrl}
                isLastBotMessage={
                  message.type === "bot" && index === messages.length - 1
                }
              />
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} className="h-0.5" />
          <AnimatePresence>
            {showScrollButton && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-4 right-4 z-10"
              >
                <Button
                  onClick={() => scrollToBottom("smooth")}
                  size="icon"
                  className="rounded-full h-11 w-11 shadow-lg bg-card/80 hover:bg-card backdrop-blur-sm border border-border/50"
                >
                  <ChevronsDown size={22} />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <motion.div
          variants={inputAreaVariants}
          className="bg-card/50 dark:bg-card/40 backdrop-blur-xl p-3 sm:p-4 border-t border-black/5 dark:border-white/5"
        >
          <div className="mb-3 flex flex-wrap gap-2 justify-center">
            {quickTopics.map((topic) => (
              <motion.button
                key={topic.name}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTopicClick(topic.name)}
                className="flex items-center text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-full text-xs font-semibold border border-primary/20 transition-all duration-200"
              >
                {React.cloneElement(topic.icon, {
                  className: "mr-1.5 w-4 h-4",
                })}{" "}
                {topic.name}
              </motion.button>
            ))}
          </div>
          <div className="flex gap-3 items-center">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isSessionReady ? "Tulis pesan Anda..." : "Menghubungkan ke server..."}
              disabled={!isSessionReady || isTyping}
              className="flex-1 bg-input/70 dark:bg-input/60 border-border text-foreground placeholder:text-muted-foreground h-12 text-sm rounded-xl shadow-inner shadow-black/5 dark:shadow-black/20 transition-shadow duration-300 input-glow"
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isTyping || !isSessionReady}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ChatbotPage;
