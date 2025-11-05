import React, { useEffect, useRef, useState } from "react";

export default function ChatWidget({ apiBase = "/py" }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Fala! Pergunte sobre jogos, tabela, agenda… ⚽" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  async function sendMessage(e) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setLoading(true);

    try {
      // Faz GET para /chat?q=<mensagem>
      const url = `${apiBase}/chat?q=${encodeURIComponent(text)}`;
      const resp = await fetch(url);
      const data = await resp.json(); // { text, intent, data, ... }

      const replyText = data?.text || data?.resposta || data?.reply || "Não consegui responder agora 😅";

      setMessages((m) => [...m, { role: "assistant", content: replyText }]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Erro ao falar com o servidor 😅" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Botão flutuante do chat */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-50 rounded-full px-4 py-3 shadow-lg bg-[#523E6C] text-white hover:opacity-95"
      >
        {open ? "Fechar chat" : "Chat"}
      </button>

      {/* Caixa do chat */}
      {open && (
        <div className="fixed bottom-20 right-5 z-50 w-[92vw] max-w-sm rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-[#523E6C] text-white text-sm font-semibold">
            Chat • Futebol Feminino
          </div>

          {/* Mensagens */}
          <div ref={listRef} className="h-72 overflow-y-auto p-3 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-3 py-2 rounded-xl text-sm ${
                  m.role === "user"
                    ? "ml-auto bg-[#F2ECFF] text-gray-900"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="bg-gray-100 text-gray-700 px-3 py-2 rounded-xl w-fit text-sm">
                digitando…
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="p-3 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte sobre jogos, tabela…"
              className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#523E6C]"
            />
            <button
              className="px-3 py-2 rounded-lg bg-[#523E6C] text-white text-sm hover:opacity-95 disabled:opacity-60"
              disabled={loading}
            >
              Enviar
            </button>
          </form>
        </div>
      )}
    </>
  );
}