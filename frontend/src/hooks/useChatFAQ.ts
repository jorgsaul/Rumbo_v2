import { useState, useRef, useEffect } from 'react';
import { iniciarFAQ, enviarOpcionFAQ, enviarPreguntaFAQ } from '../features/support/services/chat.service';
import type { MensajeFAQ, Opcion } from '../features/support/types/chat.types';

export const OPCIONES_MENU: Opcion[] = [
  { id: 'tests-resultados',   label: '🧪 Tests y resultados' },
  { id: 'perfil-privacidad',  label: '🔒 Perfil y privacidad' },
  { id: 'feed-publicaciones', label: '📢 Feed y publicaciones' },
  { id: 'carreras',           label: '🎓 Carreras recomendadas' },
];

const IDS_SECCIONES = new Set([
  'tests-resultados',
  'perfil-privacidad',
  'feed-publicaciones',
  'carreras',
]);

export function useChatFAQ() {
  const [abierto, setAbierto]   = useState(false);
  const [mensajes, setMensajes] = useState<MensajeFAQ[]>([]);
  const [cargando, setCargando] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes, cargando]);

  async function iniciar() {
    setCargando(true);
    try {
      const data = await iniciarFAQ();
      setMensajes([{
        role: 'bot',
        texto: data.message,
        opciones: data.opciones,
      }]);
    } catch {
      setMensajes([{
        role: 'bot',
        texto: 'Error al conectar. Intenta de nuevo.',
      }]);
    } finally {
      setCargando(false);
    }
  }

  async function seleccionarOpcion(opcion: Opcion) {
    setMensajes(prev => [...prev, { role: 'user', texto: opcion.label }]);
    setCargando(true);

    try {
      let data;

      if (IDS_SECCIONES.has(opcion.id)) {
        data = await enviarOpcionFAQ(opcion.id);
      } else {
        data = await enviarPreguntaFAQ(opcion.label);
      }

      setMensajes(prev => [...prev, {
        role: 'bot',
        texto: data.message,
        opciones: data.mostrar_menu
          ? OPCIONES_MENU
          : data.opciones ?? undefined,
      }]);

    } catch {
      setMensajes(prev => [...prev, {
        role: 'bot',
        texto: 'Error. Intenta de nuevo.',
      }]);
    } finally {
      setCargando(false);
    }
  }

  function toggleChat() {
    if (!abierto && mensajes.length === 0) iniciar();
    setAbierto(prev => !prev);
  }

  return {
    abierto,
    setAbierto,
    mensajes,
    cargando,
    bottomRef,
    toggleChat,
    seleccionarOpcion,
  };
}