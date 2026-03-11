import { AlertCircle, Clock, CheckCircle } from "lucide-react";

export const CATEGORY_OPTIONS = [
  { value: "BUG", label: "Reporte de error" },
  { value: "QUESTION", label: "Pregunta" },
  { value: "SUGGESTION", label: "Sugerencia" },
  { value: "OTHER", label: "Otro" },
];

export const STATUS_CONFIG = {
  OPEN: {
    label: "Abierto",
    color: "bg-warning/10 text-warning",
    icon: AlertCircle,
  },
  IN_REVIEW: {
    label: "En revisión",
    color: "bg-info/10 text-info",
    icon: Clock,
  },
  RESOLVED: {
    label: "Resuelto",
    color: "bg-success/10 text-success",
    icon: CheckCircle,
  },
};

export const FAQ = [
  {
    category: "Tests y resultados",
    items: [
      {
        q: "¿Puedo repetir el test vocacional?",
        a: "Sí, puedes reiniciar el test en cualquier momento desde la página de resultados. Tu resultado anterior se reemplazará.",
      },
      {
        q: "¿Qué significa mi zona Ikigai?",
        a: "Es la intersección entre lo que amas, lo que haces bien, lo que el mundo necesita y por lo que te pueden pagar. Propósito fuerte significa alta alineación en los 4 pilares.",
      },
      {
        q: "¿Mis resultados son definitivos?",
        a: "No, son una orientación basada en tus respuestas actuales. Puedes retomar el test cuando sientas que tus intereses han cambiado.",
      },
      {
        q: "¿Por qué me salen carreras que no esperaba?",
        a: "El algoritmo considera los 4 pilares del Ikigai, no solo tus materias favoritas. Una carrera puede aparecer por su impacto social o empleabilidad aunque no sea tu primera intuición.",
      },
    ],
  },
  {
    category: "Perfil y privacidad",
    items: [
      {
        q: "¿Qué pasa si pongo mi perfil en privado?",
        a: "Tu actividad, publicaciones y resultados solo serán visibles para tus seguidores aprobados.",
      },
      {
        q: "¿Puedo cambiar mi nombre de usuario?",
        a: "Por ahora no, el nombre de usuario es permanente tras el registro.",
      },
      {
        q: "¿Cómo cambio mi foto de perfil?",
        a: "Desde Configuración → Fotos de perfil, haz clic en el ícono de cámara.",
      },
    ],
  },
  {
    category: "Feed y publicaciones",
    items: [
      {
        q: "¿Por qué mi publicación no aparece de inmediato?",
        a: "Las publicaciones pasan por un proceso de moderación automática antes de ser visibles.",
      },
      {
        q: "¿Cómo reporto una publicación?",
        a: 'Haz clic en los tres puntos de cualquier publicación y selecciona "Reportar".',
      },
      {
        q: "¿Qué puedo publicar?",
        a: "Contenido relacionado con orientación vocacional, experiencias académicas, consejos y reflexiones sobre carreras.",
      },
    ],
  },
  {
    category: "Carreras",
    items: [
      {
        q: "¿De dónde vienen las carreras recomendadas?",
        a: "El catálogo está basado en las carreras del Instituto Politécnico Nacional (IPN).",
      },
      {
        q: "¿Las recomendaciones son exactas?",
        a: "Las carreras sugeridas se basan en áreas de afinidad general (tecnológica, científica, social, etc.) más que en una carrera específica. Son un punto de partida para explorar, no una decisión definitiva.",
      },
      {
        q: "¿Habrá más tests?",
        a: "Sí, estamos trabajando en tests más específicos por área para darte recomendaciones más precisas. Mantente al tanto de las actualizaciones de la plataforma.",
      },
    ],
  },
];
