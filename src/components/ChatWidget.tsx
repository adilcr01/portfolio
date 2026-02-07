import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Bot, User, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    link?: {
        text: string;
        url: string;
    };
};

const SUGGESTIONS = [
    "What are Adil's skills?",
    "Show me the resume",
    "How can I contact Adil?",
    "Why should I hire him?",
];

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hi! I'm the portfolio bot. 🤖 Ask me about Adil's skills, experience, or how to contact him!",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping, isOpen]);

    const handleSendMessage = async (text: string) => {
        if (!text.trim()) return;

        const newUserMessage: Message = {
            id: Date.now().toString(),
            text: text,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputValue("");
        setIsTyping(true);

        // Simulate bot thinking time
        setTimeout(() => {
            const botResponse = getBotResponse(text);
            const newBotMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: botResponse.text,
                link: botResponse.link,
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, newBotMessage]);
            setIsTyping(false);
        }, 1000);
    };

    const getBotResponse = (input: string): { text: string, link?: { text: string, url: string } } => {
        const lowerInput = input.toLowerCase();

        // Intent Matching Logic
        if (lowerInput.includes('resume') || lowerInput.includes('cv') || lowerInput.includes('experience') || lowerInput.includes('history')) {
            const resumeUrl = import.meta.env.VITE_RESUME_URL || '#resume';
            return {
                text: "Adil has extensive experience in full-stack development. You can download his full CV below or check the 'Resume' section on this page definition.",
                link: { text: "Download Resume", url: resumeUrl }
            };
        }

        if (lowerInput.includes('skill') || lowerInput.includes('stack') || lowerInput.includes('tech') || lowerInput.includes('react')) {
            return {
                text: "Adil's tech stack is centered around Python and JavaScript. He specializes in Django, Flask, and React for web development, and uses tools like Celery, Docker, and AWS for scalable backend solutions. Check the 'Skills' section for his full stack including AI and Data Science tools!",
                link: { text: "View Skills", url: "#skills" }
            };
        }

        if (lowerInput.includes('hire') || lowerInput.includes('why') || lowerInput.includes('value')) {
            return {
                text: "You should hire Adil because he focuses on building high-quality, performant, and user-friendly applications. He brings a problem-solving mindset and a passion for clean code to every project.",
                link: { text: "See Portfolio", url: "#portfolio" }
            };
        }

        if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('phone') || lowerInput.includes('reach')) {
            return {
                text: "You can reach Adil via the form in the 'Contact' section, email him at adilalpha2@gmail.com, or call +91 7701922985. He is always open to discussing new opportunities!",
                link: { text: "Go to Contact", url: "#contact" }
            };
        }

        if (lowerInput.includes('project') || lowerInput.includes('work') || lowerInput.includes('portfolio')) {
            return {
                text: "Adil has worked on various projects ranging from web apps to AI integrations. Scroll down to the 'Portfolio' section to see some of his best work.",
                link: { text: "View Projects", url: "#portfolio" }
            };
        }

        if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
            return {
                text: "Hello there! 👋 How can I help you learn more about Adil today?"
            };
        }

        // Fallback
        return {
            text: "I'm just a simple portfolio bot, not an AI like ChatGPT! 😅 I can't answer general questions, but I can tell you about Adil's skills, experience, or how to contact him. Try asking 'What are Adil's skills?'"
        };
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSendMessage(inputValue);
        }
    };

    const handleLinkClick = (url: string) => {
        if (url.startsWith('http') || url.startsWith('/')) {
            window.open(url, '_blank');
        } else {
            const element = document.querySelector(url);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-4 sm:right-8 z-50 w-[300px] sm:w-[380px]"
                    >
                        <Card className="border-border shadow-2xl overflow-hidden flex flex-col h-[500px] bg-background/95 backdrop-blur-sm">
                            {/* Header */}
                            <div className="p-4 border-b gradient-bg text-white flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white/20 p-2 rounded-full">
                                        <Bot size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm">Portfolio Assistant</h3>
                                        <p className="text-xs opacity-90 flex items-center gap-1">
                                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                            Online
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-white hover:bg-white/20 rounded-full"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <X size={18} />
                                </Button>
                            </div>

                            {/* Messages Area */}
                            <div
                                className="flex-1 overflow-y-auto p-4 space-y-4"
                                ref={scrollRef}
                            >
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {msg.sender === 'bot' && (
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                <Bot size={16} className="text-primary" />
                                            </div>
                                        )}

                                        <div
                                            className={`max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === 'user'
                                                ? 'bg-primary text-primary-foreground rounded-tr-none'
                                                : 'bg-card border border-border text-foreground rounded-tl-none'
                                                }`}
                                        >
                                            <p>{msg.text}</p>
                                            {msg.link && (
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    className="mt-3 w-full justify-between bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20"
                                                    onClick={() => handleLinkClick(msg.link!.url)}
                                                >
                                                    {msg.link.text}
                                                    <ArrowRight size={14} />
                                                </Button>
                                            )}
                                        </div>

                                        {msg.sender === 'user' && (
                                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                                                <User size={16} className="text-primary-foreground" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex gap-3 justify-start">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <Bot size={16} className="text-primary" />
                                        </div>
                                        <div className="bg-card border border-border p-4 rounded-2xl rounded-tl-none flex gap-1 items-center h-12 shadow-sm">
                                            <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                            <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                            <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Suggestions */}
                            {messages.length < 3 && (
                                <div className="px-4 py-2 bg-background/50 border-t border-border/50">
                                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                                        {SUGGESTIONS.map((suggestion) => (
                                            <button
                                                key={suggestion}
                                                onClick={() => handleSendMessage(suggestion)}
                                                className="whitespace-nowrap text-xs bg-primary/5 hover:bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-full transition-colors"
                                            >
                                                {suggestion}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Input Area */}
                            <div className="p-3 bg-background border-t">
                                <div className="flex gap-2 items-center bg-muted/50 p-1 rounded-full border border-input focus-within:ring-2 focus-within:ring-ring ring-offset-background">
                                    <Input
                                        placeholder="Ask about Adil..."
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 h-10 px-4"
                                    />
                                    <Button
                                        size="icon"
                                        onClick={() => handleSendMessage(inputValue)}
                                        disabled={!inputValue.trim() || isTyping}
                                        className="rounded-full w-10 h-10 shrink-0"
                                    >
                                        <Send size={18} />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="fixed bottom-8 right-28 z-50"
            >
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    size="icon"
                    className="h-14 w-14 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105 gradient-bg text-white border-4 border-background flex items-center justify-center"
                >
                    {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
                </Button>
            </motion.div>
        </>
    );
}
