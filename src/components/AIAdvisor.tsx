import { useState, useRef, useEffect } from "react";
import { ChatMessage, Zone, OperationState } from "../types";
import { Bot, User, Send, Compass, ShieldAlert, Sparkles, Terminal } from "lucide-react";

interface AIAdvisorProps {
  selectedZone: Zone;
  operationState: OperationState;
}

export default function AIAdvisor({ selectedZone, operationState }: AIAdvisorProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      role: "assistant",
      text: `Greetings, specialist. I am the SHANGO Atmospheric Intelligence Core. 

I am fully synchronized with **${selectedZone.title}** in the *${selectedZone.region}* sector. 
Ask me to draft uncrewed vector dispersal parameters, analyze barometric pressure feedback loops, or compute safety margins for active weather manipulation.`,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat to bottom when message log changes
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  // Welcome message updates when selected zone changes
  useEffect(() => {
    setMessages([
      {
        id: `msg-welcome-${selectedZone.id}`,
        role: "assistant",
        text: `Command grid focused on **${selectedZone.name}** sector. Current threat vector: *${selectedZone.title}*.

I have imported regional parameters (temp: ${selectedZone.parameters.temperature}°C, pressure: ${selectedZone.parameters.pressure} mb). How can I assist in optimizing this intervention?`,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  }, [selectedZone.id]);

  const sendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim()) return;

    if (customText) {
      // Clear input if using a preset chip
      setInputMessage("");
    }

    setErrorMessage(null);
    const userMsgId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsSending(true);

    if (!customText) {
      setInputMessage("");
    }

    try {
      const response = await fetch("/api/ai/advise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: textToSend,
          operationContext: {
            zone: selectedZone,
            activeToggles: operationState,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to process meteorological query.");
      }

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: data.text,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err?.message || "Communication channel timeout. Please verify external key state.");
    } finally {
      setIsSending(false);
    }
  };

  const presetBriefings = [
    {
      label: "Dispersal Flight Vector",
      prompt: `Outline a tactical uncrewed flight vector path to execute Cloud Seeding over the ${selectedZone.name} sector under current temperatures of ${selectedZone.parameters.temperature}°C.`,
    },
    {
      label: "Precipitation Calculation",
      prompt: `Estimate rainfall augmentation or pressure dissipation parameters based on our active commands.`,
    },
    {
      label: "Intervention Risk Briefing",
      prompt: `What are the environmental feedback pathways and security mitigations of manipulating weather in the ${selectedZone.region}?`,
    }
  ];

  return (
    <div className="bg-[#1e293b] border border-[#06b6d4]/15 rounded-md shadow-sm flex flex-col h-full min-h-[460px]">
      {/* Advisor Header */}
      <div className="bg-[#0f172a] border-b border-[#06b6d4]/15 px-5 py-3.5 flex items-center justify-between rounded-t-md">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#06b6d4]" />
          <h2 className="font-display font-bold text-xs uppercase tracking-widest text-[#f8fafc]">
            SHANGO CO-PILOT ADVISOR (GEMINI)
          </h2>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-[#06b6d4]/10 text-[#67e8f9] border border-[#06b6d4]/20 text-[10px] font-mono font-bold">
          <Sparkles className="w-3 h-3 text-[#06b6d4]" />
          <span>INTELLIGENCE ACTIVE</span>
        </div>
      </div>

      {/* Chat messages viewport */}
      <div className="flex-grow p-5 overflow-y-auto space-y-4 max-h-[380px] bg-[#0f172a]/60">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-[85%] ${
              msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
            }`}
          >
            {/* Avatar block with beautiful golds and greens */}
            <div
              className={`w-7 h-7 rounded-sm flex items-center justify-center border text-xs shrink-0 select-none ${
                msg.role === "user"
                  ? "bg-[#06b6d4] border-[#0891b2] text-[#0f172a]"
                  : "bg-[#1e293b] border-[#06b6d4]/15 text-[#67e8f9]"
              }`}
            >
              {msg.role === "user" ? <User className="w-3.5 h-3.5 text-[#0f172a]" /> : <Bot className="w-3.5 h-3.5 text-[#06b6d4]" />}
            </div>

            {/* Message bubble */}
            <div className="flex flex-col gap-1">
              <div
                className={`rounded-md px-4 py-2.5 text-xs font-sans leading-relaxed whitespace-pre-line shadow-sm border ${
                  msg.role === "user"
                    ? "bg-[#06b6d4] text-[#0f172a] border-[#0891b2]/30"
                    : "bg-[#1e293b] text-[#f8fafc] border-[#06b6d4]/15"
                }`}
              >
                {msg.text}
              </div>
              <span className={`text-[9px] font-mono text-[#94a3b8] ${msg.role === "user" ? "text-right" : "text-left"}`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isSending && (
          <div className="flex gap-3 max-w-[80%] mr-auto">
            <div className="w-7 h-7 rounded-sm flex items-center justify-center border bg-[#1e293b] border-[#06b6d4]/15 text-[#67e8f9] shrink-0">
              <Bot className="w-3.5 h-3.5 text-[#06b6d4] animate-bounce" />
            </div>
            <div className="bg-[#1e293b] rounded-sm px-4 py-2.5 text-xs font-mono text-[#94a3b8] animate-pulse border border-[#06b6d4]/15 shadow-sm">
              SHANGO Core drafting meteorological response...
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-950/40 border border-red-500/20 rounded-md p-4 text-xs flex items-start gap-2.5 text-red-200 font-sans shadow-md">
            <ShieldAlert className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
            <div className="flex flex-col gap-1 select-text">
              <span className="font-bold">INTELLIGENCE Core Disconnected</span>
              <span>{errorMessage}</span>
              <span className="text-[10px] text-red-400/60 mt-0.5 font-mono">
                Verify server secrets for GEMINI_API_KEY.
              </span>
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Preset Action Briefing chips */}
      <div className="px-5 py-2.5 bg-[#0f172a]/50 border-t border-[#06b6d4]/15 flex flex-wrap gap-2 items-center">
        <span className="text-[10px] font-mono text-[#94a3b8] flex items-center gap-1 uppercase font-bold tracking-wider">
          <Compass className="w-3.5 h-3.5 text-[#06b6d4]" />
          <span>Operational Briefs:</span>
        </span>
        {presetBriefings.map((brief, index) => (
          <button
            key={index}
            onClick={() => sendMessage(brief.prompt)}
            disabled={isSending}
            className="px-3 py-1 bg-[#1e293b] hover:bg-[#06b6d4] hover:text-[#0f172a] border border-[#06b6d4]/15 text-[10px] text-[#f8fafc] transition-all font-mono font-medium rounded-md shadow-sm"
          >
            + {brief.label}
          </button>
        ))}
      </div>

      {/* Chat Input form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="p-3 bg-[#0f172a] border-t border-[#06b6d4]/15 flex items-center gap-2 rounded-b-md"
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={`Enter prompt to query SHANGO Intelligence Core or suggest customized vectors...`}
          disabled={isSending}
          className="flex-grow bg-[#1e293b] rounded-md border border-[#06b6d4]/15 px-4 py-2.5 text-xs text-[#f8fafc] placeholder-[#94a3b8]/60 focus:outline-none focus:border-[#06b6d4] focus:ring-1 focus:ring-[#06b6d4]/20 transition-all font-sans"
        />
        <button
          type="submit"
          disabled={isSending || !inputMessage.trim()}
          style={{ cursor: isSending || !inputMessage.trim() ? "not-allowed" : "pointer" }}
          className={`h-9 w-9 rounded-md flex items-center justify-center transition-all ${
            isSending || !inputMessage.trim()
              ? "bg-[#334155] text-[#94a3b8] cursor-not-allowed"
              : "bg-[#06b6d4] text-[#0f172a] hover:bg-[#67e8f9]"
          }`}
        >
          <Send className="w-4 h-4 text-inherit" />
        </button>
      </form>
    </div>
  );
}
