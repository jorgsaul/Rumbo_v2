import { NextRequest, NextResponse } from "next/server";

const MENU_PRINCIPAL = [
  { id: "tests-resultados", label: "🧪 Tests y resultados" },
  { id: "perfil-privacidad", label: "🔒 Perfil y privacidad" },
  { id: "feed-publicaciones", label: "📢 Feed y publicaciones" },
  { id: "carreras", label: "🎓 Carreras recomendadas" },
];

const FAQ: Record<
  string,
  {
    titulo: string;
    preguntas: { id: string; label: string; respuesta: string }[];
  }
> = {
  "tests-resultados": {
    titulo: "🧪 Tests y resultados",
    preguntas: [
      {
        id: "repetir-test",
        label: "¿Puedo repetir el test vocacional?",
        respuesta:
          "Sí, puedes reiniciar el test en cualquier momento desde la página del test. Tu resultado anterior se reemplazará.",
      },
      {
        id: "ikigai",
        label: "¿Qué significa mi zona Ikigai?",
        respuesta:
          "Es la intersección entre lo que amas, lo que haces bien, lo que el mundo necesita y por lo que te pueden pagar.",
      },
      {
        id: "definitivos",
        label: "¿Mis resultados son definitivos?",
        respuesta:
          "No, son una orientación basada en tus respuestas actuales. Puedes retomar el test cuando sientas que tus intereses han cambiado.",
      },
      {
        id: "carreras-inesperadas",
        label: "¿Por qué me salen carreras que no esperaba?",
        respuesta:
          "El algoritmo considera los 4 pilares del Ikigai, no solo tus materias favoritas.",
      },
    ],
  },
  "perfil-privacidad": {
    titulo: "🔒 Perfil y privacidad",
    preguntas: [
      {
        id: "perfil-privado",
        label: "¿Qué pasa si pongo mi perfil en privado?",
        respuesta:
          "Tu actividad, publicaciones y resultados solo serán visibles para tus seguidores aprobados.",
      },
      {
        id: "cambiar-usuario",
        label: "¿Puedo cambiar mi nombre de usuario?",
        respuesta:
          "Por ahora no. El nombre de usuario es permanente tras el registro.",
      },
      {
        id: "foto-perfil",
        label: "¿Cómo cambio mi foto de perfil?",
        respuesta:
          "Ve a Configuración → Fotos de perfil y haz clic en el ícono de cámara.",
      },
    ],
  },
  "feed-publicaciones": {
    titulo: "📢 Feed y publicaciones",
    preguntas: [
      {
        id: "publicacion-demora",
        label: "¿Por qué mi publicación no aparece de inmediato?",
        respuesta:
          "Las publicaciones pasan por un proceso de moderación automática antes de ser visibles.",
      },
      {
        id: "reportar",
        label: "¿Cómo reporto una publicación?",
        respuesta:
          "Haz clic en los tres puntos de cualquier publicación y selecciona Reportar.",
      },
      {
        id: "que-publicar",
        label: "¿Qué puedo publicar?",
        respuesta:
          "Contenido relacionado con orientación vocacional, experiencias académicas, consejos y reflexiones sobre carreras.",
      },
    ],
  },
  carreras: {
    titulo: "🎓 Carreras recomendadas",
    preguntas: [
      {
        id: "origen-carreras",
        label: "¿De dónde vienen las carreras recomendadas?",
        respuesta:
          "El catálogo está basado en las carreras del Instituto Politécnico Nacional (IPN).",
      },
      {
        id: "exactitud",
        label: "¿Las recomendaciones son exactas?",
        respuesta:
          "Son un punto de partida para explorar, no una decisión definitiva.",
      },
      {
        id: "mas-tests",
        label: "¿Habrá más tests?",
        respuesta: "Sí, estamos trabajando en tests más específicos por área.",
      },
    ],
  },
};

export default function handleFAQ(body: any) {
  if (body.action === "start") {
    return NextResponse.json({
      type: "menu",
      message: "Hola, soy Atlas 👋 ¿En qué te puedo ayudar?",
      opciones: MENU_PRINCIPAL,
    });
  }

  if (body.boton && FAQ[body.boton]) {
    const seccion = FAQ[body.boton];
    return NextResponse.json({
      message: `${seccion.titulo}\n\nElige tu pregunta:`,
      opciones: [
        ...seccion.preguntas.map((p) => ({
          id: `${body.boton}__${p.id}`,
          label: p.label,
        })),
        { id: "volver", label: "⬅️ Volver al menú" },
      ],
    });
  }

  if (body.boton === "volver") {
    return NextResponse.json({
      message: "¿En qué más te puedo ayudar?",
      opciones: MENU_PRINCIPAL,
    });
  }

  if (body.boton && body.boton.includes("__")) {
    const [seccionId, preguntaId] = body.boton.split("__");
    const seccion = FAQ[seccionId];
    const pregunta = seccion?.preguntas.find((p) => p.id === preguntaId);

    if (pregunta) {
      return NextResponse.json({
        message: pregunta.respuesta,
        opciones: [
          ...seccion.preguntas.map((p) => ({
            id: `${seccionId}__${p.id}`,
            label: p.label,
          })),
          { id: "volver", label: "⬅️ Volver al menú" },
        ],
      });
    }
  }

  return NextResponse.json({
    message: "¿En qué te puedo ayudar?",
    opciones: MENU_PRINCIPAL,
  });
}
