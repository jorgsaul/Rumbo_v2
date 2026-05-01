"use client";

import Image from "next/image";
import { useChatFAQ } from "@/hooks/useChatFAQ";
import atlas from "../../../../public/atlas.png";

export default function ChatFAQ() {
  const {
    abierto,
    mensajes,
    cargando,
    bottomRef,
    toggleChat,
    seleccionarOpcion,
  } = useChatFAQ();

  return (
    <>
      <div
        className={`
        fixed bottom-[60px] right-4 z-50
        w-[300px] flex flex-col
        bg-white dark:bg-black-mode
        border border-primary-200 dark:border-primary-700
        shadow-xl rounded-tl-2xl rounded-bl-2xl rounded-r-none
        transition-all duration-300 ease-in-out overflow-hidden
        ${abierto ? "h-[380px] opacity-100" : "h-0 opacity-0 pointer-events-none"}
      `}
      >
        <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-3 bg-primary-100/10 dark:bg-primary-700/10">
          {mensajes.map((m, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div
                className={`flex items-end gap-2 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {m.role === "bot" && (
                  <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 bg-primary-500 mb-0.5">
                    <Image
                      src={atlas}
                      alt="Atlas"
                      width={28}
                      height={28}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div
                  className={`
                  px-3 py-2 text-sm leading-relaxed max-w-[75%]
                  ${
                    m.role === "user"
                      ? "bg-primary text-white rounded-t-[18px] rounded-bl-[18px] rounded-br-sm"
                      : "bg-white dark:bg-primary-700/20 text-neutral dark:text-white border border-primary-100 dark:border-primary-700 rounded-t-[18px] rounded-br-[18px] rounded-bl-sm"
                  }
                `}
                >
                  {m.texto}
                </div>
              </div>

              {m.opciones && (
                <div className="flex flex-col gap-1.5 ml-9">
                  {m.opciones.map((op) => (
                    <button
                      key={op.id}
                      onClick={() => seleccionarOpcion(op)}
                      disabled={cargando}
                      className="
                        border border-primary-400
                        text-primary dark:text-primary-200
                        hover:bg-primary hover:text-white
                        dark:hover:bg-primary dark:hover:text-white
                        bg-white dark:bg-transparent
                        rounded-full px-4 py-1.5 text-xs font-semibold
                        text-left transition-all duration-150
                        disabled:opacity-50 disabled:cursor-not-allowed
                        cursor-pointer
                      "
                    >
                      {op.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {cargando && (
            <div className="flex items-end gap-2">
              <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 bg-primary-500">
                <Image
                  src="/atlas.png"
                  alt="Atlas"
                  width={28}
                  height={28}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="bg-white dark:bg-primary-700/20 border border-primary-100 dark:border-primary-700 rounded-t-[18px] rounded-br-[18px] rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-primary-400 animate-chat-bounce" />
                <div className="w-2 h-2 rounded-full bg-primary-400 animate-chat-bounce delay-100" />
                <div className="w-2 h-2 rounded-full bg-primary-400 animate-chat-bounce delay-200" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      <div
        onClick={toggleChat}
        className="
          fixed bottom-4 right-4 z-50
          w-[300px]
          flex items-center gap-3
          px-4 py-2.5
          bg-white dark:bg-black-mode
          border border-primary-200 dark:border-primary-700
          shadow-lg rounded-tl-2xl rounded-bl-2xl rounded-r-none
          cursor-pointer
          hover:bg-primary-100 dark:hover:bg-primary-700/20
          transition-all duration-200
        "
      >
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-primary-500">
          <Image
            src="/atlas.png"
            alt="Atlas"
            width={32}
            height={32}
            className="object-cover w-full h-full"
          />
        </div>

        <span className="flex-1 text-sm font-semibold text-neutral dark:text-white">
          Atlas
        </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`text-primary-400 transition-transform duration-300 ${abierto ? "rotate-180" : ""}`}
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </div>
    </>
  );
}
