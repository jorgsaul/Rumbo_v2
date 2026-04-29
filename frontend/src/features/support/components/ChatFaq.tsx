'use client';

import { useState } from 'react';
import { useChatScroll } from '../hooks/useChat';
import { iniciarFAQ, enviarOpcionFAQ } from '../services/chat.service';
import type { MensajeFAQ, Opcion } from '../types/chat.types';

const OPCIONES_MENU: Opcion[] = [
  { id: 'tests-resultados',   label: '🧪 Tests y resultados' },
  { id: 'perfil-privacidad',  label: '🔒 Perfil y privacidad' },
  { id: 'feed-publicaciones', label: '📢 Feed y publicaciones' },
  { id: 'carreras',           label: '🎓 Carreras recomendadas' },
];

export default function ChatFAQ() {
  const [abierto, setAbierto]   = useState(false);
  const [mensajes, setMensajes] = useState<MensajeFAQ[]>([]);
  const [cargando, setCargando] = useState(false);
  const bottomRef = useChatScroll([mensajes, cargando]);

  async function iniciar() {
    setCargando(true);
    try {
      const data = await iniciarFAQ();
      setMensajes([{
        role: 'bot',
        texto: data.message,
        opciones: data.opciones
      }]);
    } catch {
      setMensajes([{
        role: 'bot',
        texto: 'Error al conectar. Intenta de nuevo.'
      }]);
    } finally {
      setCargando(false);
    }
  }

  async function seleccionarOpcion(opcion: Opcion) {
    setMensajes(prev => [...prev, { role: 'user', texto: opcion.label }]);
    setCargando(true);
    try {
      const data = await enviarOpcionFAQ(opcion.id);
      setMensajes(prev => [...prev, {
        role: 'bot',
        texto: data.message,
        opciones: data.mostrar_menu ? OPCIONES_MENU : undefined,
      }]);
    } catch {
      setMensajes(prev => [...prev, {
        role: 'bot',
        texto: 'Error. Intenta de nuevo.'
      }]);
    } finally {
      setCargando(false);
    }
  }

  function toggleChat() {
    if (!abierto && mensajes.length === 0) iniciar();
    setAbierto(prev => !prev);
  }

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center">

      {/* Panel retráctil */}
      <div className={`
        flex flex-col overflow-hidden
        transition-all duration-300 ease-in-out
        bg-white dark:bg-black-mode
        rounded-l-xl
        shadow-[-4px_0_24px_rgba(90,18,54,0.12)]
        ${abierto
          ? 'w-[320px] h-[480px] border border-r-0 border-primary-100 dark:border-primary-700 opacity-100'
          : 'w-0 h-0 border-0 opacity-0 pointer-events-none'
        }
      `}>
        {abierto && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-primary rounded-tl-xl flex-shrink-0">
              <div>
                <p className="text-white font-semibold text-sm">Soporte Rumbo</p>
                <p className="text-primary-200 text-xs">Preguntas frecuentes</p>
              </div>
              <button
                onClick={() => setAbierto(false)}
                className="text-primary-200 hover:text-white text-xl leading-none transition-colors bg-transparent border-none cursor-pointer"
              >
                ×
              </button>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2 bg-primary-100/20 dark:bg-black-mode">
              {mensajes.map((m, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className={`
                    px-3 py-2 rounded-xl text-xs leading-relaxed max-w-[85%]
                    ${m.role === 'user'
                      ? 'bg-primary text-white self-end'
                      : 'bg-white dark:bg-neutral/10 text-neutral dark:text-white border border-primary-100 dark:border-primary-700 self-start'
                    }
                  `}>
                    {m.texto}
                  </div>

                  {m.opciones && (
                    <div className="flex flex-col gap-1.5">
                      {m.opciones.map(op => (
                        <button
                          key={op.id}
                          onClick={() => seleccionarOpcion(op)}
                          disabled={cargando}
                          className="
                            bg-white dark:bg-black-mode
                            border border-primary-400
                            text-primary dark:text-primary-200
                            hover:bg-primary-100 dark:hover:bg-primary-700/20
                            rounded-lg px-3 py-2 text-xs font-medium
                            text-left transition-colors
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

              {/* Puntos animados */}
              {cargando && (
                <div className="
                  self-start bg-white dark:bg-neutral/10
                  border border-primary-100 dark:border-primary-700
                  rounded-xl px-3 py-2.5
                  flex items-center gap-1.5
                ">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-chat-bounce" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-chat-bounce delay-100" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-chat-bounce delay-200" />
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          </>
        )}
      </div>

      {/* Tab retráctil pegada a la derecha */}
      <button
        onClick={toggleChat}
        className="
          bg-primary hover:bg-primary-500
          border-none rounded-l-lg
          py-4 px-2.5
          flex flex-col items-center gap-2
          shadow-[-2px_0_12px_rgba(90,18,54,0.2)]
          flex-shrink-0 transition-colors cursor-pointer
        "
      >
        <span className="text-lg">💬</span>
        <span
          className="text-primary-100 text-[11px] font-semibold tracking-widest"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Soporte
        </span>
      </button>
    </div>
  );
}