import type {
  Question,
  VocationalProfile,
  CareerResult,
  IkigaiZone,
} from "@/features/tests/types/tests.types";

// ─── Tipos internos ───────────────────────────────────────────────────────────

interface IkigaiScores {
  pasion: number;
  vocacion: number;
  profesion: number;
  mision: number;
}

interface IkigaiCalculatorResult {
  profile: VocationalProfile;
  topCareers: CareerResult[];
  resultadosCompletos: CareerResult[];
  scoreGlobal: number;
  zonaIkigai: IkigaiZone;
}

// ─── Catálogo de carreras (IPN) ───────────────────────────────────────────────

interface Career {
  id: number;
  nombre: string;
  area: string;
  pasion: {
    palabras_clave: string[];
    actividades: string[];
    nivel_creatividad: number;
    ambientes: string[];
  };
  vocacion: {
    materias: {
      matematicas: number;
      fisica: number;
      quimica: number;
      biologia: number;
      expresion: number;
    };
    dificultad_academica: number;
  };
  profesion: {
    empleabilidad: number;
    salario_inicial: number;
    salario_experiencia: number;
    sectores: string[];
    demanda: string;
    emprendimiento: number;
  };
  mision: {
    problemas: string[];
    impacto_social: number;
    contribucion_nacional: number;
  };
}

const CAREERS: Career[] = [
  {
    id: 1,
    nombre: "Ingeniería Aeronáutica",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Aeronáutica",
        "Mecánica",
        "Manufactura",
        "Diseño industrial",
        "Materiales",
        "Simulación",
      ],
      actividades: [
        "Diseñar sistemas",
        "Construir prototipos",
        "Realizar pruebas y ensayos",
        "Analizar datos",
        "Mantener equipos/sistemas",
      ],
      nivel_creatividad: 7,
      ambientes: [
        "Taller mecánico",
        "Aeropuerto/aeronaves",
        "Oficina corporativa",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 9,
        fisica: 10,
        quimica: 4,
        biologia: 2,
        expresion: 7,
      },
      dificultad_academica: 9,
    },
    profesion: {
      empleabilidad: 90,
      salario_inicial: 21500,
      salario_experiencia: 52500,
      sectores: [
        "Aeroespacial",
        "Industria manufacturera",
        "Logística y transporte",
        "Gobierno y sector público",
      ],
      demanda: "Alta",
      emprendimiento: 6,
    },
    mision: {
      problemas: [
        "Diseño y desarrollo de productos innovadores",
        "Problemas de transporte y movilidad",
        "Seguridad estructural",
      ],
      impacto_social: 7,
      contribucion_nacional: 8,
    },
  },
  {
    id: 2,
    nombre: "Ingeniería Ambiental",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Medio ambiente",
        "Sustentabilidad",
        "Recursos naturales",
        "Procesos químicos",
        "Química",
        "Investigación",
      ],
      actividades: [
        "Evaluar impacto ambiental",
        "Investigar y experimentar",
        "Realizar estudios de campo",
        "Optimizar procesos",
        "Diseñar sistemas",
      ],
      nivel_creatividad: 6,
      ambientes: [
        "Áreas naturales",
        "Centro de investigación",
        "Oficina gubernamental",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 7,
        fisica: 6,
        quimica: 8,
        biologia: 5,
        expresion: 6,
      },
      dificultad_academica: 7,
    },
    profesion: {
      empleabilidad: 80,
      salario_inicial: 16500,
      salario_experiencia: 34000,
      sectores: [
        "Medio ambiente y sustentabilidad",
        "Gobierno y sector público",
        "Consultoría",
        "Construcción",
        "Energía y petróleo",
      ],
      demanda: "Media",
      emprendimiento: 7,
    },
    mision: {
      problemas: [
        "Contaminación ambiental",
        "Impacto ambiental de industrias",
        "Gestión eficiente de recursos",
        "Prevención de riesgos",
      ],
      impacto_social: 8,
      contribucion_nacional: 8,
    },
  },
  {
    id: 3,
    nombre: "Ingeniería Biomédica",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Salud",
        "Medicina",
        "Tecnología",
        "Biomedicina",
        "Diagnóstico",
        "Investigación",
      ],
      actividades: [
        "Diseñar sistemas",
        "Investigar y experimentar",
        "Diagnosticar problemas",
        "Construir prototipos",
        "Realizar pruebas y ensayos",
      ],
      nivel_creatividad: 8,
      ambientes: ["Laboratorio", "Hospital/clínica", "Centro de investigación"],
    },
    vocacion: {
      materias: {
        matematicas: 8,
        fisica: 8,
        quimica: 6,
        biologia: 8,
        expresion: 7,
      },
      dificultad_academica: 8,
    },
    profesion: {
      empleabilidad: 85,
      salario_inicial: 18000,
      salario_experiencia: 40000,
      sectores: [
        "Salud (hospitales, clínicas)",
        "Tecnología de la información",
        "Industria manufacturera",
        "Educación e investigación",
      ],
      demanda: "Alta",
      emprendimiento: 7,
    },
    mision: {
      problemas: [
        "Problemas de salud y enfermedades",
        "Diseño y desarrollo de productos innovadores",
        "Desarrollo tecnológico",
      ],
      impacto_social: 9,
      contribucion_nacional: 8,
    },
  },
  {
    id: 4,
    nombre: "Ingeniería Biotecnológica",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Biotecnología",
        "Química",
        "Biología",
        "Investigación",
        "Farmacéutica",
        "Salud",
      ],
      actividades: [
        "Investigar y experimentar",
        "Optimizar procesos",
        "Realizar pruebas y ensayos",
        "Analizar datos",
        "Supervisar procesos de producción",
      ],
      nivel_creatividad: 7,
      ambientes: [
        "Laboratorio",
        "Centro de investigación",
        "Planta industrial",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 7,
        fisica: 5,
        quimica: 9,
        biologia: 9,
        expresion: 6,
      },
      dificultad_academica: 8,
    },
    profesion: {
      empleabilidad: 83,
      salario_inicial: 16000,
      salario_experiencia: 35000,
      sectores: [
        "Biotecnología",
        "Farmacéutico",
        "Alimentario",
        "Educación e investigación",
      ],
      demanda: "Alta",
      emprendimiento: 7,
    },
    mision: {
      problemas: [
        "Problemas de salud y enfermedades",
        "Investigación científica",
        "Desarrollo tecnológico",
      ],
      impacto_social: 9,
      contribucion_nacional: 9,
    },
  },
  {
    id: 5,
    nombre: "Ingeniería Civil",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Construcción",
        "Infraestructura",
        "Arquitectura",
        "Estructuras",
        "Geotecnia",
        "Urbanismo",
      ],
      actividades: [
        "Diseñar infraestructura",
        "Gestionar proyectos",
        "Supervisar obras",
        "Calcular y modelar",
        "Asesorar técnicamente",
      ],
      nivel_creatividad: 7,
      ambientes: [
        "Obra/campo de construcción",
        "Oficina corporativa",
        "Espacios abiertos/campo",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 8,
        fisica: 8,
        quimica: 4,
        biologia: 1,
        expresion: 7,
      },
      dificultad_academica: 7,
    },
    profesion: {
      empleabilidad: 85,
      salario_inicial: 16000,
      salario_experiencia: 40000,
      sectores: [
        "Construcción",
        "Gobierno y sector público",
        "Consultoría",
        "Industria manufacturera",
      ],
      demanda: "Alta",
      emprendimiento: 7,
    },
    mision: {
      problemas: [
        "Infraestructura y construcción de obras",
        "Problemas de transporte y movilidad",
        "Gestión eficiente de recursos",
      ],
      impacto_social: 8,
      contribucion_nacional: 8,
    },
  },
  {
    id: 6,
    nombre: "Ingeniería de Transporte",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Transporte",
        "Infraestructura",
        "Logística",
        "Construcción",
        "Movilidad",
        "Administración",
      ],
      actividades: [
        "Diseñar infraestructura",
        "Gestionar proyectos",
        "Optimizar procesos",
        "Asesorar técnicamente",
        "Calcular y modelar",
      ],
      nivel_creatividad: 6,
      ambientes: [
        "Obra/campo de construcción",
        "Oficina corporativa",
        "Almacén/logística",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 7,
        fisica: 6,
        quimica: 2,
        biologia: 1,
        expresion: 7,
      },
      dificultad_academica: 6,
    },
    profesion: {
      empleabilidad: 80,
      salario_inicial: 14000,
      salario_experiencia: 30000,
      sectores: [
        "Logística y transporte",
        "Gobierno y sector público",
        "Consultoría",
        "Construcción",
      ],
      demanda: "Alta",
      emprendimiento: 6,
    },
    mision: {
      problemas: [
        "Problemas de transporte y movilidad",
        "Infraestructura y construcción de obras",
        "Gestión eficiente de recursos",
      ],
      impacto_social: 7,
      contribucion_nacional: 7,
    },
  },
  {
    id: 7,
    nombre: "Ingeniería en Acuicultura",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Recursos naturales",
        "Biología",
        "Sustentabilidad",
        "Medio ambiente",
        "Alimentos",
        "Investigación",
      ],
      actividades: [
        "Realizar estudios de campo",
        "Investigar y experimentar",
        "Supervisar procesos de producción",
        "Evaluar impacto ambiental",
      ],
      nivel_creatividad: 6,
      ambientes: ["Áreas naturales", "Laboratorio", "Planta industrial"],
    },
    vocacion: {
      materias: {
        matematicas: 6,
        fisica: 4,
        quimica: 6,
        biologia: 9,
        expresion: 6,
      },
      dificultad_academica: 6,
    },
    profesion: {
      empleabilidad: 70,
      salario_inicial: 13000,
      salario_experiencia: 28000,
      sectores: [
        "Alimentario",
        "Gobierno y sector público",
        "Medio ambiente y sustentabilidad",
      ],
      demanda: "Media",
      emprendimiento: 7,
    },
    mision: {
      problemas: [
        "Producción de alimentos",
        "Gestión eficiente de recursos",
        "Contaminación ambiental",
      ],
      impacto_social: 7,
      contribucion_nacional: 7,
    },
  },
  {
    id: 8,
    nombre: "Ingeniería Eléctrica",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Energía",
        "Electrónica",
        "Automatización",
        "Redes",
        "Sustentabilidad",
        "Infraestructura",
      ],
      actividades: [
        "Diseñar sistemas",
        "Resolver problemas técnicos",
        "Mantener equipos/sistemas",
        "Gestionar proyectos",
        "Optimizar procesos",
      ],
      nivel_creatividad: 6,
      ambientes: [
        "Planta industrial",
        "Obra/campo de construcción",
        "Oficina corporativa",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 9,
        fisica: 10,
        quimica: 3,
        biologia: 1,
        expresion: 6,
      },
      dificultad_academica: 9,
    },
    profesion: {
      empleabilidad: 92,
      salario_inicial: 20500,
      salario_experiencia: 50000,
      sectores: [
        "Energía y petróleo",
        "Industria manufacturera",
        "Telecomunicaciones",
        "Gobierno y sector público",
        "Construcción",
      ],
      demanda: "Muy Alta",
      emprendimiento: 7,
    },
    mision: {
      problemas: [
        "Escasez de energía",
        "Automatización de procesos industriales",
        "Problemas de comunicación y conectividad",
        "Desarrollo tecnológico",
      ],
      impacto_social: 8,
      contribucion_nacional: 8,
    },
  },
  {
    id: 9,
    nombre: "Ingeniería en Alimentos",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Alimentos",
        "Procesos industriales",
        "Química",
        "Biotecnología",
        "Control de calidad",
        "Manufactura",
      ],
      actividades: [
        "Supervisar procesos de producción",
        "Controlar calidad",
        "Optimizar procesos",
        "Investigar y experimentar",
        "Realizar pruebas y ensayos",
      ],
      nivel_creatividad: 5,
      ambientes: [
        "Laboratorio",
        "Planta industrial",
        "Centro de investigación",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 6,
        fisica: 4,
        quimica: 8,
        biologia: 7,
        expresion: 5,
      },
      dificultad_academica: 6,
    },
    profesion: {
      empleabilidad: 80,
      salario_inicial: 15500,
      salario_experiencia: 31500,
      sectores: [
        "Alimentario",
        "Farmacéutico",
        "Industria manufacturera",
        "Emprendimiento/startups",
        "Comercio y retail",
      ],
      demanda: "Alta",
      emprendimiento: 8,
    },
    mision: {
      problemas: [
        "Producción de alimentos",
        "Calidad de productos y servicios",
        "Problemas de salud y enfermedades",
      ],
      impacto_social: 7,
      contribucion_nacional: 7,
    },
  },
  {
    id: 10,
    nombre: "Ingeniería en Computación",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Programación",
        "Hardware",
        "Software",
        "Redes",
        "Sistemas embebidos",
        "Algoritmos",
      ],
      actividades: [
        "Programar y desarrollar software",
        "Diseñar sistemas",
        "Analizar datos",
        "Resolver problemas técnicos",
        "Construir prototipos",
      ],
      nivel_creatividad: 7,
      ambientes: ["Centro de cómputo", "Oficina corporativa", "Hogar/remoto"],
    },
    vocacion: {
      materias: {
        matematicas: 9,
        fisica: 6,
        quimica: 1,
        biologia: 1,
        expresion: 6,
      },
      dificultad_academica: 8,
    },
    profesion: {
      empleabilidad: 95,
      salario_inicial: 21500,
      salario_experiencia: 50000,
      sectores: [
        "Tecnología de la información",
        "Telecomunicaciones",
        "Industria manufacturera",
        "Emprendimiento/startups",
        "Servicios financieros",
      ],
      demanda: "Muy Alta",
      emprendimiento: 9,
    },
    mision: {
      problemas: [
        "Desarrollo de software y aplicaciones",
        "Automatización de procesos industriales",
        "Desarrollo tecnológico",
        "Procesamiento y análisis de información",
      ],
      impacto_social: 7,
      contribucion_nacional: 8,
    },
  },
  {
    id: 11,
    nombre: "Ingeniería en Comunicaciones y Electrónica",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Electrónica",
        "Telecomunicaciones",
        "Redes",
        "Hardware",
        "Sistemas embebidos",
        "Simulación",
      ],
      actividades: [
        "Diseñar sistemas",
        "Resolver problemas técnicos",
        "Construir prototipos",
        "Mantener equipos/sistemas",
        "Realizar pruebas y ensayos",
      ],
      nivel_creatividad: 7,
      ambientes: ["Laboratorio", "Sala de control", "Centro de cómputo"],
    },
    vocacion: {
      materias: {
        matematicas: 8,
        fisica: 9,
        quimica: 2,
        biologia: 1,
        expresion: 6,
      },
      dificultad_academica: 8,
    },
    profesion: {
      empleabilidad: 90,
      salario_inicial: 19000,
      salario_experiencia: 42500,
      sectores: [
        "Telecomunicaciones",
        "Tecnología de la información",
        "Aeroespacial",
        "Industria manufacturera",
        "Gobierno y sector público",
      ],
      demanda: "Muy Alta",
      emprendimiento: 7,
    },
    mision: {
      problemas: [
        "Problemas de comunicación y conectividad",
        "Desarrollo tecnológico",
        "Automatización de procesos industriales",
      ],
      impacto_social: 7,
      contribucion_nacional: 8,
    },
  },
  {
    id: 12,
    nombre: "Ingeniería en Control y Automatización",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Automatización",
        "Control de calidad",
        "Procesos industriales",
        "Electrónica",
        "Robótica",
        "Sistemas embebidos",
      ],
      actividades: [
        "Diseñar sistemas",
        "Optimizar procesos",
        "Controlar calidad",
        "Supervisar procesos de producción",
        "Programar y desarrollar software",
      ],
      nivel_creatividad: 6,
      ambientes: [
        "Planta industrial",
        "Sala de control",
        "Oficina corporativa",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 9,
        fisica: 8,
        quimica: 2,
        biologia: 1,
        expresion: 6,
      },
      dificultad_academica: 7,
    },
    profesion: {
      empleabilidad: 88,
      salario_inicial: 20000,
      salario_experiencia: 46500,
      sectores: [
        "Industria manufacturera",
        "Automotriz",
        "Energía y petróleo",
        "Tecnología de la información",
        "Emprendimiento/startups",
      ],
      demanda: "Muy Alta",
      emprendimiento: 8,
    },
    mision: {
      problemas: [
        "Automatización de procesos industriales",
        "Optimización de la producción",
        "Desarrollo tecnológico",
        "Calidad de productos y servicios",
      ],
      impacto_social: 7,
      contribucion_nacional: 7,
    },
  },
  {
    id: 13,
    nombre: "Ingeniería en Energía",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Energía",
        "Sustentabilidad",
        "Medio ambiente",
        "Recursos naturales",
        "Procesos industriales",
        "Infraestructura",
      ],
      actividades: [
        "Optimizar procesos",
        "Evaluar impacto ambiental",
        "Diseñar sistemas",
        "Gestionar proyectos",
        "Asesorar técnicamente",
      ],
      nivel_creatividad: 6,
      ambientes: ["Sitios remotos", "Oficina corporativa", "Planta industrial"],
    },
    vocacion: {
      materias: {
        matematicas: 8,
        fisica: 9,
        quimica: 5,
        biologia: 3,
        expresion: 6,
      },
      dificultad_academica: 7,
    },
    profesion: {
      empleabilidad: 85,
      salario_inicial: 19000,
      salario_experiencia: 42500,
      sectores: [
        "Energía y petróleo",
        "Gobierno y sector público",
        "Consultoría",
        "Industria manufacturera",
      ],
      demanda: "Alta",
      emprendimiento: 7,
    },
    mision: {
      problemas: [
        "Escasez de energía",
        "Desarrollo de energías renovables",
        "Gestión eficiente de recursos",
        "Impacto ambiental de industrias",
      ],
      impacto_social: 8,
      contribucion_nacional: 8,
    },
  },
  {
    id: 14,
    nombre: "Ingeniería en Informática",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Software",
        "Programación",
        "Datos",
        "Administración",
        "Redes",
        "Algoritmos",
      ],
      actividades: [
        "Programar y desarrollar software",
        "Diseñar sistemas",
        "Administrar recursos",
        "Analizar datos",
        "Documentar procesos",
      ],
      nivel_creatividad: 5,
      ambientes: ["Oficina corporativa", "Centro de cómputo", "Hogar/remoto"],
    },
    vocacion: {
      materias: {
        matematicas: 8,
        fisica: 5,
        quimica: 1,
        biologia: 1,
        expresion: 7,
      },
      dificultad_academica: 6,
    },
    profesion: {
      empleabilidad: 85,
      salario_inicial: 15000,
      salario_experiencia: 30000,
      sectores: [
        "Tecnología de la información",
        "Servicios financieros",
        "Gobierno y sector público",
        "Consultoría",
      ],
      demanda: "Muy Alta",
      emprendimiento: 7,
    },
    mision: {
      problemas: [
        "Desarrollo de software y aplicaciones",
        "Seguridad informática y protección de datos",
        "Procesamiento y análisis de información",
      ],
      impacto_social: 7,
      contribucion_nacional: 7,
    },
  },
  {
    id: 15,
    nombre: "Ingeniería en Inteligencia Artificial",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Inteligencia Artificial",
        "Algoritmos",
        "Datos",
        "Programación",
        "Robótica",
        "Modelado",
      ],
      actividades: [
        "Analizar datos",
        "Programar y desarrollar software",
        "Calcular y modelar",
        "Investigar y experimentar",
        "Diseñar sistemas",
      ],
      nivel_creatividad: 9,
      ambientes: [
        "Ambiente tecnológico/startup",
        "Centro de cómputo",
        "Hogar/remoto",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 10,
        fisica: 7,
        quimica: 1,
        biologia: 1,
        expresion: 8,
      },
      dificultad_academica: 9,
    },
    profesion: {
      empleabilidad: 95,
      salario_inicial: 20000,
      salario_experiencia: 50000,
      sectores: [
        "Tecnología de la información",
        "Servicios financieros",
        "Emprendimiento/startups",
        "Educación e investigación",
      ],
      demanda: "Muy Alta",
      emprendimiento: 10,
    },
    mision: {
      problemas: [
        "Desarrollo de software y aplicaciones",
        "Procesamiento y análisis de información",
        "Innovación en procesos",
        "Desarrollo tecnológico",
      ],
      impacto_social: 9,
      contribucion_nacional: 9,
    },
  },
  {
    id: 16,
    nombre: "Ingeniería en Metalurgia y Materiales",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Materiales",
        "Procesos industriales",
        "Química",
        "Manufactura",
        "Control de calidad",
        "Física",
      ],
      actividades: [
        "Investigar y experimentar",
        "Realizar pruebas y ensayos",
        "Supervisar procesos de producción",
        "Optimizar procesos",
        "Asesorar técnicamente",
      ],
      nivel_creatividad: 4,
      ambientes: [
        "Planta industrial",
        "Laboratorio",
        "Centro de investigación",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 7,
        fisica: 8,
        quimica: 7,
        biologia: 2,
        expresion: 5,
      },
      dificultad_academica: 7,
    },
    profesion: {
      empleabilidad: 78,
      salario_inicial: 14000,
      salario_experiencia: 28000,
      sectores: [
        "Industria manufacturera",
        "Automotriz",
        "Minería",
        "Aeroespacial",
      ],
      demanda: "Media",
      emprendimiento: 5,
    },
    mision: {
      problemas: [
        "Desarrollo de nuevos materiales",
        "Optimización de la producción",
        "Calidad de productos y servicios",
      ],
      impacto_social: 6,
      contribucion_nacional: 6,
    },
  },
  {
    id: 17,
    nombre: "Ingeniería en Meteorología",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Medio ambiente",
        "Física",
        "Matemáticas",
        "Simulación",
        "Datos",
        "Investigación",
      ],
      actividades: [
        "Analizar datos",
        "Calcular y modelar",
        "Investigar y experimentar",
        "Realizar estudios de campo",
        "Asesorar técnicamente",
      ],
      nivel_creatividad: 5,
      ambientes: [
        "Centro de investigación",
        "Sala de control",
        "Espacios abiertos/campo",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 9,
        fisica: 9,
        quimica: 4,
        biologia: 3,
        expresion: 6,
      },
      dificultad_academica: 8,
    },
    profesion: {
      empleabilidad: 78,
      salario_inicial: 16000,
      salario_experiencia: 35000,
      sectores: [
        "Gobierno y sector público",
        "Consultoría",
        "Educación e investigación",
        "Medio ambiente y sustentabilidad",
      ],
      demanda: "Media",
      emprendimiento: 5,
    },
    mision: {
      problemas: [
        "Cambio climático",
        "Prevención de riesgos",
        "Investigación científica",
      ],
      impacto_social: 8,
      contribucion_nacional: 8,
    },
  },
  {
    id: 18,
    nombre: "Ingeniería en Sistemas Automotrices",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Automotriz",
        "Mecánica",
        "Electrónica",
        "Manufactura",
        "Diseño industrial",
        "Automatización",
      ],
      actividades: [
        "Diseñar sistemas",
        "Construir prototipos",
        "Mantener equipos/sistemas",
        "Realizar pruebas y ensayos",
        "Optimizar procesos",
      ],
      nivel_creatividad: 7,
      ambientes: ["Taller mecánico", "Planta industrial", "Laboratorio"],
    },
    vocacion: {
      materias: {
        matematicas: 7,
        fisica: 8,
        quimica: 3,
        biologia: 1,
        expresion: 6,
      },
      dificultad_academica: 7,
    },
    profesion: {
      empleabilidad: 90,
      salario_inicial: 18000,
      salario_experiencia: 45000,
      sectores: [
        "Automotriz",
        "Industria manufacturera",
        "Emprendimiento/startups",
      ],
      demanda: "Muy Alta",
      emprendimiento: 7,
    },
    mision: {
      problemas: [
        "Diseño y desarrollo de productos innovadores",
        "Desarrollo tecnológico",
        "Problemas de transporte y movilidad",
      ],
      impacto_social: 7,
      contribucion_nacional: 8,
    },
  },
  {
    id: 19,
    nombre: "Ingeniería en Sistemas Computacionales",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Programación",
        "Software",
        "Redes",
        "Sistemas",
        "Datos",
        "Algoritmos",
      ],
      actividades: [
        "Programar y desarrollar software",
        "Analizar datos",
        "Diseñar sistemas",
        "Resolver problemas técnicos",
        "Gestionar proyectos",
      ],
      nivel_creatividad: 7,
      ambientes: ["Centro de cómputo", "Hogar/remoto", "Oficina corporativa"],
    },
    vocacion: {
      materias: {
        matematicas: 8,
        fisica: 5,
        quimica: 1,
        biologia: 1,
        expresion: 7,
      },
      dificultad_academica: 7,
    },
    profesion: {
      empleabilidad: 95,
      salario_inicial: 18000,
      salario_experiencia: 45000,
      sectores: [
        "Tecnología de la información",
        "Emprendimiento/startups",
        "Servicios financieros",
        "Telecomunicaciones",
      ],
      demanda: "Muy Alta",
      emprendimiento: 9,
    },
    mision: {
      problemas: [
        "Desarrollo de software y aplicaciones",
        "Desarrollo tecnológico",
        "Procesamiento y análisis de información",
      ],
      impacto_social: 7,
      contribucion_nacional: 8,
    },
  },
  {
    id: 20,
    nombre: "Ingeniería en Sistemas de Transporte Urbano",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Transporte",
        "Infraestructura",
        "Urbanismo",
        "Movilidad",
        "Sistemas",
      ],
      actividades: [
        "Gestionar proyectos",
        "Diseñar infraestructura",
        "Optimizar procesos",
        "Analizar datos",
      ],
      nivel_creatividad: 6,
      ambientes: [
        "Obra/campo de construcción",
        "Oficina corporativa",
        "Sala de control",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 7,
        fisica: 7,
        quimica: 2,
        biologia: 1,
        expresion: 7,
      },
      dificultad_academica: 6,
    },
    profesion: {
      empleabilidad: 78,
      salario_inicial: 14000,
      salario_experiencia: 28000,
      sectores: [
        "Logística y transporte",
        "Gobierno y sector público",
        "Industria manufacturera",
      ],
      demanda: "Alta",
      emprendimiento: 6,
    },
    mision: {
      problemas: [
        "Problemas de transporte y movilidad",
        "Gestión eficiente de recursos",
        "Optimización de la producción",
      ],
      impacto_social: 6,
      contribucion_nacional: 6,
    },
  },
  {
    id: 21,
    nombre: "Ingeniería en Tecnologías de la Información y Comunicaciones",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Telecomunicaciones",
        "Redes",
        "Software",
        "Datos",
        "Seguridad",
        "Programación",
      ],
      actividades: [
        "Diseñar sistemas",
        "Administrar redes",
        "Analizar datos",
        "Programar y desarrollar software",
        "Resolver problemas técnicos",
      ],
      nivel_creatividad: 7,
      ambientes: ["Oficina corporativa", "Centro de cómputo", "Hogar/remoto"],
    },
    vocacion: {
      materias: {
        matematicas: 7,
        fisica: 6,
        quimica: 1,
        biologia: 1,
        expresion: 7,
      },
      dificultad_academica: 7,
    },
    profesion: {
      empleabilidad: 90,
      salario_inicial: 17000,
      salario_experiencia: 40000,
      sectores: [
        "Telecomunicaciones",
        "Tecnología de la información",
        "Gobierno y sector público",
        "Servicios financieros",
      ],
      demanda: "Muy Alta",
      emprendimiento: 8,
    },
    mision: {
      problemas: [
        "Problemas de comunicación y conectividad",
        "Desarrollo tecnológico",
        "Seguridad informática y protección de datos",
      ],
      impacto_social: 8,
      contribucion_nacional: 8,
    },
  },
  {
    id: 22,
    nombre: "Ingeniería Forestal",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Medio ambiente",
        "Recursos naturales",
        "Sustentabilidad",
        "Biología",
        "Administración",
      ],
      actividades: [
        "Realizar estudios de campo",
        "Evaluar impacto ambiental",
        "Gestionar proyectos",
        "Investigar y experimentar",
      ],
      nivel_creatividad: 6,
      ambientes: [
        "Áreas naturales",
        "Oficina gubernamental",
        "Espacios abiertos/campo",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 6,
        fisica: 4,
        quimica: 5,
        biologia: 8,
        expresion: 7,
      },
      dificultad_academica: 5,
    },
    profesion: {
      empleabilidad: 72,
      salario_inicial: 13000,
      salario_experiencia: 28000,
      sectores: [
        "Medio ambiente y sustentabilidad",
        "Gobierno y sector público",
        "Consultoría",
        "Educación e investigación",
      ],
      demanda: "Media",
      emprendimiento: 6,
    },
    mision: {
      problemas: [
        "Contaminación ambiental",
        "Impacto ambiental de industrias",
        "Gestión eficiente de recursos",
      ],
      impacto_social: 8,
      contribucion_nacional: 7,
    },
  },
  {
    id: 23,
    nombre: "Ingeniería Geomática",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Cartografía",
        "Datos",
        "Geotecnia",
        "Construcción",
        "Matemáticas",
        "Simulación",
      ],
      actividades: [
        "Calcular y modelar",
        "Analizar datos",
        "Realizar estudios de campo",
        "Asesorar técnicamente",
      ],
      nivel_creatividad: 5,
      ambientes: [
        "Espacios abiertos/campo",
        "Oficina corporativa",
        "Centro de cómputo",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 8,
        fisica: 7,
        quimica: 3,
        biologia: 2,
        expresion: 6,
      },
      dificultad_academica: 7,
    },
    profesion: {
      empleabilidad: 80,
      salario_inicial: 14000,
      salario_experiencia: 30000,
      sectores: [
        "Gobierno y sector público",
        "Construcción",
        "Consultoría",
        "Minería",
      ],
      demanda: "Alta",
      emprendimiento: 6,
    },
    mision: {
      problemas: [
        "Infraestructura y construcción de obras",
        "Gestión eficiente de recursos",
        "Prevención de riesgos",
      ],
      impacto_social: 7,
      contribucion_nacional: 7,
    },
  },
  {
    id: 24,
    nombre: "Ingeniería en Robótica",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Robótica",
        "Automatización",
        "Programación",
        "Electrónica",
        "Sistemas embebidos",
        "IA",
      ],
      actividades: [
        "Diseñar sistemas",
        "Construir prototipos",
        "Programar y desarrollar software",
        "Investigar y experimentar",
      ],
      nivel_creatividad: 9,
      ambientes: [
        "Laboratorio",
        "Planta industrial",
        "Centro de investigación",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 9,
        fisica: 8,
        quimica: 2,
        biologia: 2,
        expresion: 7,
      },
      dificultad_academica: 9,
    },
    profesion: {
      empleabilidad: 90,
      salario_inicial: 20000,
      salario_experiencia: 50000,
      sectores: [
        "Industria manufacturera",
        "Tecnología de la información",
        "Emprendimiento/startups",
        "Educación e investigación",
      ],
      demanda: "Muy Alta",
      emprendimiento: 9,
    },
    mision: {
      problemas: [
        "Automatización de procesos industriales",
        "Desarrollo tecnológico",
        "Diseño y desarrollo de productos innovadores",
      ],
      impacto_social: 8,
      contribucion_nacional: 9,
    },
  },
  {
    id: 25,
    nombre: "Ingeniería en Logística",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Logística",
        "Administración",
        "Procesos industriales",
        "Negocios",
        "Transporte",
      ],
      actividades: [
        "Gestionar proyectos",
        "Optimizar procesos",
        "Administrar recursos",
        "Supervisar procesos de producción",
      ],
      nivel_creatividad: 5,
      ambientes: [
        "Almacén/logística",
        "Oficina corporativa",
        "Planta industrial",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 6,
        fisica: 4,
        quimica: 2,
        biologia: 1,
        expresion: 8,
      },
      dificultad_academica: 5,
    },
    profesion: {
      empleabilidad: 80,
      salario_inicial: 14000,
      salario_experiencia: 28000,
      sectores: [
        "Logística y transporte",
        "Gobierno y sector público",
        "Industria manufacturera",
        "Comercio y retail",
      ],
      demanda: "Alta",
      emprendimiento: 6,
    },
    mision: {
      problemas: [
        "Problemas de transporte y movilidad",
        "Gestión eficiente de recursos",
        "Optimización de la producción",
      ],
      impacto_social: 6,
      contribucion_nacional: 6,
    },
  },
  {
    id: 26,
    nombre: "Ingeniería Farmacéutica",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Farmacéutica",
        "Química",
        "Procesos químicos",
        "Biotecnología",
        "Salud",
        "Control de calidad",
      ],
      actividades: [
        "Investigar y experimentar",
        "Supervisar procesos de producción",
        "Controlar calidad",
        "Realizar pruebas y ensayos",
        "Optimizar procesos",
      ],
      nivel_creatividad: 5,
      ambientes: [
        "Laboratorio",
        "Planta industrial",
        "Centro de investigación",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 6,
        fisica: 5,
        quimica: 10,
        biologia: 7,
        expresion: 5,
      },
      dificultad_academica: 6,
    },
    profesion: {
      empleabilidad: 85,
      salario_inicial: 15000,
      salario_experiencia: 30000,
      sectores: [
        "Farmacéutico",
        "Químico",
        "Salud (hospitales, clínicas)",
        "Biotecnología",
      ],
      demanda: "Alta",
      emprendimiento: 6,
    },
    mision: {
      problemas: [
        "Problemas de salud y enfermedades",
        "Desarrollo de nuevos materiales (Fármacos)",
        "Calidad de productos y servicios",
      ],
      impacto_social: 8,
      contribucion_nacional: 8,
    },
  },
  {
    id: 27,
    nombre: "Ingeniería Ferroviaria",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Infraestructura",
        "Mecánica",
        "Electrónica",
        "Construcción",
        "Automatización",
        "Sustentabilidad",
      ],
      actividades: [
        "Diseñar infraestructura",
        "Mantener equipos/sistemas",
        "Gestionar proyectos",
        "Supervisar procesos de producción",
      ],
      nivel_creatividad: 5,
      ambientes: [
        "Obra/campo de construcción",
        "Sala de control",
        "Taller mecánico",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 7,
        fisica: 8,
        quimica: 3,
        biologia: 1,
        expresion: 6,
      },
      dificultad_academica: 6,
    },
    profesion: {
      empleabilidad: 75,
      salario_inicial: 15000,
      salario_experiencia: 30000,
      sectores: [
        "Logística y transporte",
        "Construcción",
        "Industria manufacturera",
        "Gobierno y sector público",
      ],
      demanda: "Media",
      emprendimiento: 5,
    },
    mision: {
      problemas: [
        "Problemas de transporte y movilidad",
        "Infraestructura y construcción de obras",
        "Gestión eficiente de recursos",
      ],
      impacto_social: 6,
      contribucion_nacional: 6,
    },
  },
  {
    id: 28,
    nombre: "Ingeniería Fotónica",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Física",
        "Electrónica",
        "Telecomunicaciones",
        "Materiales",
        "Investigación",
        "Nanotecnología",
      ],
      actividades: [
        "Investigar y experimentar",
        "Construir prototipos",
        "Realizar pruebas y ensayos",
        "Diseñar sistemas",
      ],
      nivel_creatividad: 8,
      ambientes: [
        "Laboratorio",
        "Centro de investigación",
        "Ambiente tecnológico/startup",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 9,
        fisica: 10,
        quimica: 3,
        biologia: 1,
        expresion: 6,
      },
      dificultad_academica: 9,
    },
    profesion: {
      empleabilidad: 70,
      salario_inicial: 17000,
      salario_experiencia: 38000,
      sectores: [
        "Telecomunicaciones",
        "Tecnología de la información",
        "Educación e investigación",
      ],
      demanda: "Media",
      emprendimiento: 8,
    },
    mision: {
      problemas: [
        "Desarrollo tecnológico",
        "Investigación científica",
        "Problemas de comunicación y conectividad",
      ],
      impacto_social: 8,
      contribucion_nacional: 8,
    },
  },
  {
    id: 29,
    nombre: "Ingeniería Geofísica",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Física",
        "Matemáticas",
        "Recursos naturales",
        "Geotecnia",
        "Investigación",
        "Datos",
      ],
      actividades: [
        "Realizar estudios de campo",
        "Investigar y experimentar",
        "Analizar datos",
        "Calcular y modelar",
      ],
      nivel_creatividad: 4,
      ambientes: [
        "Espacios abiertos/campo",
        "Centro de investigación",
        "Sitios remotos",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 10,
        fisica: 10,
        quimica: 3,
        biologia: 1,
        expresion: 6,
      },
      dificultad_academica: 9,
    },
    profesion: {
      empleabilidad: 80,
      salario_inicial: 18000,
      salario_experiencia: 45000,
      sectores: [
        "Energía y petróleo",
        "Minería",
        "Gobierno y sector público",
        "Consultoría",
      ],
      demanda: "Alta",
      emprendimiento: 5,
    },
    mision: {
      problemas: [
        "Investigación científica",
        "Escasez de energía (Exploración)",
        "Prevención de riesgos (Sismos)",
      ],
      impacto_social: 8,
      contribucion_nacional: 8,
    },
  },
  {
    id: 30,
    nombre: "Ingeniería Geológica",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Recursos naturales",
        "Geotecnia",
        "Medio ambiente",
        "Construcción",
        "Investigación",
        "Materiales",
      ],
      actividades: [
        "Realizar estudios de campo",
        "Investigar y experimentar",
        "Diagnosticar problemas",
        "Evaluar impacto ambiental",
      ],
      nivel_creatividad: 4,
      ambientes: [
        "Espacios abiertos/campo",
        "Minería/extracción",
        "Centro de investigación",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 8,
        fisica: 9,
        quimica: 6,
        biologia: 2,
        expresion: 6,
      },
      dificultad_academica: 8,
    },
    profesion: {
      empleabilidad: 80,
      salario_inicial: 15000,
      salario_experiencia: 35000,
      sectores: [
        "Minería",
        "Construcción",
        "Energía y petróleo",
        "Gobierno y sector público",
      ],
      demanda: "Alta",
      emprendimiento: 5,
    },
    mision: {
      problemas: [
        "Investigación científica",
        "Escasez de energía (Recursos)",
        "Prevención de riesgos",
      ],
      impacto_social: 7,
      contribucion_nacional: 7,
    },
  },
  {
    id: 31,
    nombre: "Ingeniería Industrial",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Procesos industriales",
        "Manufactura",
        "Administración",
        "Control de calidad",
        "Negocios",
        "Economía",
      ],
      actividades: [
        "Supervisar procesos de producción",
        "Optimizar procesos",
        "Gestionar proyectos",
        "Controlar calidad",
        "Dirigir equipos de trabajo",
      ],
      nivel_creatividad: 6,
      ambientes: [
        "Planta industrial",
        "Oficina corporativa",
        "Almacén/logística",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 7,
        fisica: 5,
        quimica: 4,
        biologia: 2,
        expresion: 8,
      },
      dificultad_academica: 7,
    },
    profesion: {
      empleabilidad: 85,
      salario_inicial: 15000,
      salario_experiencia: 30000,
      sectores: [
        "Industria manufacturera",
        "Consultoría",
        "Servicios financieros",
        "Logística y transporte",
      ],
      demanda: "Muy Alta",
      emprendimiento: 7,
    },
    mision: {
      problemas: [
        "Optimización de procesos",
        "Gestión eficiente de recursos",
        "Calidad de productos y servicios",
      ],
      impacto_social: 7,
      contribucion_nacional: 7,
    },
  },
  {
    id: 32,
    nombre: "Ingeniería Matemática",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Matemáticas",
        "Modelado",
        "Simulación",
        "Algoritmos",
        "Datos",
        "Finanzas",
      ],
      actividades: [
        "Calcular y modelar",
        "Analizar datos",
        "Investigar y experimentar",
        "Programar y desarrollar software",
      ],
      nivel_creatividad: 8,
      ambientes: [
        "Centro de investigación",
        "Oficina corporativa",
        "Hogar/remoto",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 10,
        fisica: 7,
        quimica: 1,
        biologia: 1,
        expresion: 7,
      },
      dificultad_academica: 10,
    },
    profesion: {
      empleabilidad: 90,
      salario_inicial: 18000,
      salario_experiencia: 65000,
      sectores: [
        "Servicios financieros",
        "Tecnología de la información",
        "Educación e investigación",
        "Consultoría",
      ],
      demanda: "Alta",
      emprendimiento: 8,
    },
    mision: {
      problemas: [
        "Procesamiento y análisis de información",
        "Investigación científica",
        "Gestión eficiente de recursos",
        "Desarrollo tecnológico",
      ],
      impacto_social: 9,
      contribucion_nacional: 9,
    },
  },
  {
    id: 33,
    nombre: "Ingeniería Mecánica",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Mecánica",
        "Manufactura",
        "Diseño industrial",
        "Materiales",
        "Energía",
        "CAD/CAM",
      ],
      actividades: [
        "Diseñar productos",
        "Construir prototipos",
        "Mantener equipos/sistemas",
        "Supervisar procesos de producción",
      ],
      nivel_creatividad: 6,
      ambientes: ["Taller mecánico", "Planta industrial", "Estudio de diseño"],
    },
    vocacion: {
      materias: {
        matematicas: 8,
        fisica: 9,
        quimica: 4,
        biologia: 1,
        expresion: 6,
      },
      dificultad_academica: 7,
    },
    profesion: {
      empleabilidad: 90,
      salario_inicial: 16000,
      salario_experiencia: 50000,
      sectores: [
        "Industria manufacturera",
        "Automotriz",
        "Energía y petróleo",
        "Construcción",
      ],
      demanda: "Muy Alta",
      emprendimiento: 7,
    },
    mision: {
      problemas: [
        "Diseño y desarrollo de productos innovadores",
        "Optimización de la producción",
        "Desarrollo tecnológico",
      ],
      impacto_social: 7,
      contribucion_nacional: 7,
    },
  },
  {
    id: 34,
    nombre: "Ingeniería Mecatrónica",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Mecánica",
        "Electrónica",
        "Robótica",
        "Automatización",
        "Programación",
        "Sistemas embebidos",
      ],
      actividades: [
        "Diseñar sistemas",
        "Construir prototipos",
        "Programar y desarrollar software",
        "Optimizar procesos",
      ],
      nivel_creatividad: 7,
      ambientes: ["Laboratorio", "Planta industrial", "Taller mecánico"],
    },
    vocacion: {
      materias: {
        matematicas: 8,
        fisica: 8,
        quimica: 3,
        biologia: 1,
        expresion: 6,
      },
      dificultad_academica: 8,
    },
    profesion: {
      empleabilidad: 92,
      salario_inicial: 17000,
      salario_experiencia: 60000,
      sectores: [
        "Industria manufacturera",
        "Automotriz",
        "Tecnología de la información",
        "Emprendimiento/startups",
      ],
      demanda: "Muy Alta",
      emprendimiento: 8,
    },
    mision: {
      problemas: [
        "Automatización de procesos industriales",
        "Desarrollo tecnológico",
        "Diseño y desarrollo de productos innovadores",
      ],
      impacto_social: 8,
      contribucion_nacional: 8,
    },
  },
  {
    id: 35,
    nombre: "Ingeniería Minera",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Minería",
        "Geotecnia",
        "Recursos naturales",
        "Manufactura",
        "Materiales",
      ],
      actividades: [
        "Realizar estudios de campo",
        "Gestionar proyectos",
        "Supervisar procesos de producción",
        "Analizar datos",
      ],
      nivel_creatividad: 4,
      ambientes: [
        "Minería/extracción",
        "Espacios abiertos/campo",
        "Planta industrial",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 7,
        fisica: 7,
        quimica: 5,
        biologia: 2,
        expresion: 5,
      },
      dificultad_academica: 6,
    },
    profesion: {
      empleabilidad: 78,
      salario_inicial: 17000,
      salario_experiencia: 40000,
      sectores: ["Minería", "Energía y petróleo", "Gobierno y sector público"],
      demanda: "Alta",
      emprendimiento: 5,
    },
    mision: {
      problemas: [
        "Gestión eficiente de recursos",
        "Impacto ambiental de industrias",
        "Infraestructura",
      ],
      impacto_social: 6,
      contribucion_nacional: 7,
    },
  },
  {
    id: 36,
    nombre: "Ingeniería Petroquímica",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Química",
        "Procesos industriales",
        "Energía",
        "Petróleo",
        "Manufactura",
        "Materiales",
      ],
      actividades: [
        "Supervisar procesos de producción",
        "Optimizar procesos",
        "Investigar y experimentar",
        "Controlar calidad",
      ],
      nivel_creatividad: 5,
      ambientes: ["Planta industrial", "Laboratorio", "Sitios remotos"],
    },
    vocacion: {
      materias: {
        matematicas: 7,
        fisica: 7,
        quimica: 9,
        biologia: 3,
        expresion: 5,
      },
      dificultad_academica: 7,
    },
    profesion: {
      empleabilidad: 85,
      salario_inicial: 20000,
      salario_experiencia: 50000,
      sectores: ["Energía y petróleo", "Químico", "Industria manufacturera"],
      demanda: "Alta",
      emprendimiento: 6,
    },
    mision: {
      problemas: [
        "Escasez de energía",
        "Gestión eficiente de recursos",
        "Innovación en procesos",
      ],
      impacto_social: 7,
      contribucion_nacional: 8,
    },
  },
  {
    id: 37,
    nombre: "Ingeniería Química",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Química",
        "Procesos químicos",
        "Biotecnología",
        "Procesos industriales",
        "Investigación",
        "Materiales",
      ],
      actividades: [
        "Optimizar procesos",
        "Investigar y experimentar",
        "Supervisar procesos de producción",
        "Controlar calidad",
      ],
      nivel_creatividad: 6,
      ambientes: [
        "Laboratorio",
        "Planta industrial",
        "Centro de investigación",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 8,
        fisica: 7,
        quimica: 10,
        biologia: 5,
        expresion: 6,
      },
      dificultad_academica: 8,
    },
    profesion: {
      empleabilidad: 85,
      salario_inicial: 16000,
      salario_experiencia: 35000,
      sectores: [
        "Químico",
        "Farmacéutico",
        "Alimentario",
        "Energía y petróleo",
      ],
      demanda: "Alta",
      emprendimiento: 7,
    },
    mision: {
      problemas: [
        "Contaminación ambiental",
        "Desarrollo de nuevos materiales",
        "Calidad de productos y servicios",
      ],
      impacto_social: 8,
      contribucion_nacional: 8,
    },
  },
  {
    id: 38,
    nombre: "Ingeniería Textil",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Manufactura",
        "Diseño industrial",
        "Materiales",
        "Procesos industriales",
        "Control de calidad",
      ],
      actividades: [
        "Supervisar procesos de producción",
        "Diseñar productos",
        "Controlar calidad",
        "Optimizar procesos",
      ],
      nivel_creatividad: 6,
      ambientes: ["Planta industrial", "Taller mecánico", "Estudio de diseño"],
    },
    vocacion: {
      materias: {
        matematicas: 6,
        fisica: 5,
        quimica: 7,
        biologia: 3,
        expresion: 6,
      },
      dificultad_academica: 5,
    },
    profesion: {
      empleabilidad: 72,
      salario_inicial: 12000,
      salario_experiencia: 25000,
      sectores: ["Industria manufacturera", "Comercio y retail", "Consultoría"],
      demanda: "Media",
      emprendimiento: 7,
    },
    mision: {
      problemas: [
        "Optimización de la producción",
        "Calidad de productos y servicios",
        "Gestión eficiente de recursos",
      ],
      impacto_social: 5,
      contribucion_nacional: 5,
    },
  },
  {
    id: 39,
    nombre: "Ingeniería Topográfica",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Cartografía",
        "Geotecnia",
        "Construcción",
        "Datos",
        "Matemáticas",
      ],
      actividades: [
        "Realizar estudios de campo",
        "Calcular y modelar",
        "Asesorar técnicamente",
        "Gestionar proyectos",
      ],
      nivel_creatividad: 4,
      ambientes: [
        "Espacios abiertos/campo",
        "Obra/campo de construcción",
        "Oficina corporativa",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 7,
        fisica: 6,
        quimica: 2,
        biologia: 1,
        expresion: 6,
      },
      dificultad_academica: 5,
    },
    profesion: {
      empleabilidad: 78,
      salario_inicial: 12000,
      salario_experiencia: 28000,
      sectores: [
        "Construcción",
        "Gobierno y sector público",
        "Consultoría",
        "Minería",
      ],
      demanda: "Alta",
      emprendimiento: 6,
    },
    mision: {
      problemas: [
        "Infraestructura y construcción de obras",
        "Gestión eficiente de recursos",
        "Prevención de riesgos",
      ],
      impacto_social: 6,
      contribucion_nacional: 6,
    },
  },
  {
    id: 40,
    nombre: "Licenciatura en Ciencias Computacionales",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Programación",
        "Algoritmos",
        "Datos",
        "Inteligencia Artificial",
        "Software",
        "Investigación",
      ],
      actividades: [
        "Programar y desarrollar software",
        "Analizar datos",
        "Investigar y experimentar",
        "Calcular y modelar",
      ],
      nivel_creatividad: 8,
      ambientes: [
        "Centro de cómputo",
        "Centro de investigación",
        "Hogar/remoto",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 10,
        fisica: 6,
        quimica: 1,
        biologia: 1,
        expresion: 7,
      },
      dificultad_academica: 9,
    },
    profesion: {
      empleabilidad: 93,
      salario_inicial: 20000,
      salario_experiencia: 55000,
      sectores: [
        "Tecnología de la información",
        "Educación e investigación",
        "Emprendimiento/startups",
        "Servicios financieros",
      ],
      demanda: "Muy Alta",
      emprendimiento: 9,
    },
    mision: {
      problemas: [
        "Desarrollo tecnológico",
        "Procesamiento y análisis de información",
        "Investigación científica",
      ],
      impacto_social: 9,
      contribucion_nacional: 9,
    },
  },
  {
    id: 41,
    nombre: "Licenciatura en Administración Industrial",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Administración",
        "Procesos industriales",
        "Manufactura",
        "Negocios",
        "Economía",
        "Finanzas",
      ],
      actividades: [
        "Administrar recursos",
        "Gestionar proyectos",
        "Supervisar procesos de producción",
        "Planificar estrategias",
      ],
      nivel_creatividad: 5,
      ambientes: [
        "Planta industrial",
        "Oficina corporativa",
        "Almacén/logística",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 6,
        fisica: 3,
        quimica: 2,
        biologia: 1,
        expresion: 8,
      },
      dificultad_academica: 5,
    },
    profesion: {
      empleabilidad: 80,
      salario_inicial: 13000,
      salario_experiencia: 28000,
      sectores: [
        "Industria manufacturera",
        "Consultoría",
        "Logística y transporte",
        "Comercio y retail",
      ],
      demanda: "Alta",
      emprendimiento: 7,
    },
    mision: {
      problemas: [
        "Gestión empresarial y administrativa",
        "Optimización de la producción",
        "Gestión eficiente de recursos",
      ],
      impacto_social: 6,
      contribucion_nacional: 6,
    },
  },
  {
    id: 42,
    nombre: "Licenciatura en Aeronáutica",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Aeronáutica",
        "Aviación",
        "Mecánica",
        "Electrónica",
        "Manufactura",
      ],
      actividades: [
        "Mantener equipos/sistemas",
        "Resolver problemas técnicos",
        "Realizar pruebas y ensayos",
        "Supervisar procesos de producción",
      ],
      nivel_creatividad: 5,
      ambientes: ["Aeropuerto/aeronaves", "Taller mecánico", "Sala de control"],
    },
    vocacion: {
      materias: {
        matematicas: 7,
        fisica: 8,
        quimica: 3,
        biologia: 1,
        expresion: 6,
      },
      dificultad_academica: 7,
    },
    profesion: {
      empleabilidad: 85,
      salario_inicial: 18000,
      salario_experiencia: 45000,
      sectores: [
        "Aeroespacial",
        "Logística y transporte",
        "Industria manufacturera",
        "Gobierno y sector público",
      ],
      demanda: "Alta",
      emprendimiento: 5,
    },
    mision: {
      problemas: [
        "Problemas de transporte y movilidad",
        "Seguridad estructural",
        "Desarrollo tecnológico",
      ],
      impacto_social: 7,
      contribucion_nacional: 7,
    },
  },
  {
    id: 43,
    nombre: "Licenciatura en Ciencia de Datos",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Datos",
        "Estadística",
        "Programación",
        "Inteligencia Artificial",
        "Modelado",
        "Análisis",
      ],
      actividades: [
        "Analizar datos",
        "Programar y desarrollar software",
        "Modelar y simular",
        "Investigar y experimentar",
      ],
      nivel_creatividad: 8,
      ambientes: [
        "Centro de cómputo",
        "Oficina corporativa",
        "Ambiente tecnológico/startup",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 9,
        fisica: 6,
        quimica: 2,
        biologia: 1,
        expresion: 7,
      },
      dificultad_academica: 9,
    },
    profesion: {
      empleabilidad: 95,
      salario_inicial: 20000,
      salario_experiencia: 60000,
      sectores: [
        "Tecnología de la información",
        "Servicios financieros",
        "Consultoría",
        "Educación e investigación",
      ],
      demanda: "Muy Alta",
      emprendimiento: 9,
    },
    mision: {
      problemas: [
        "Procesamiento y análisis de información",
        "Desarrollo tecnológico",
        "Innovación en procesos",
      ],
      impacto_social: 9,
      contribucion_nacional: 9,
    },
  },
  {
    id: 44,
    nombre: "Licenciatura en Ciencias de la Informática",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Informática",
        "Software",
        "Programación",
        "Datos",
        "Administración",
        "Redes",
      ],
      actividades: [
        "Programar y desarrollar software",
        "Diseñar sistemas",
        "Analizar datos",
        "Documentar procesos",
      ],
      nivel_creatividad: 7,
      ambientes: ["Oficina corporativa", "Centro de cómputo", "Hogar/remoto"],
    },
    vocacion: {
      materias: {
        matematicas: 8,
        fisica: 5,
        quimica: 1,
        biologia: 1,
        expresion: 7,
      },
      dificultad_academica: 7,
    },
    profesion: {
      empleabilidad: 90,
      salario_inicial: 15000,
      salario_experiencia: 45000,
      sectores: [
        "Tecnología de la información",
        "Servicios financieros",
        "Gobierno y sector público",
        "Consultoría",
      ],
      demanda: "Muy Alta",
      emprendimiento: 7,
    },
    mision: {
      problemas: [
        "Desarrollo de software y aplicaciones",
        "Seguridad informática y protección de datos",
        "Procesamiento y análisis de información",
      ],
      impacto_social: 8,
      contribucion_nacional: 8,
    },
  },
  {
    id: 45,
    nombre: "Licenciatura en Física y Matemáticas",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Física",
        "Matemáticas",
        "Investigación",
        "Modelado",
        "Simulación",
        "Docencia",
      ],
      actividades: [
        "Calcular y modelar",
        "Analizar datos",
        "Investigar y experimentar",
        "Docencia",
      ],
      nivel_creatividad: 8,
      ambientes: [
        "Centro de investigación",
        "Instituciones educativas",
        "Hogar/remoto",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 10,
        fisica: 10,
        quimica: 3,
        biologia: 2,
        expresion: 7,
      },
      dificultad_academica: 10,
    },
    profesion: {
      empleabilidad: 85,
      salario_inicial: 16000,
      salario_experiencia: 50000,
      sectores: [
        "Educación e investigación",
        "Gobierno y sector público",
        "Servicios financieros",
      ],
      demanda: "Alta",
      emprendimiento: 7,
    },
    mision: {
      problemas: [
        "Investigación científica",
        "Procesamiento y análisis de información",
        "Docencia y formación académica",
      ],
      impacto_social: 9,
      contribucion_nacional: 9,
    },
  },
  {
    id: 46,
    nombre: "Licenciatura en Matemática Algorítmica",
    area: "Físico-Matemático",
    pasion: {
      palabras_clave: [
        "Matemáticas",
        "Algoritmos",
        "Programación",
        "Modelado",
        "Datos",
        "Simulación",
      ],
      actividades: [
        "Analizar datos",
        "Programar y desarrollar software",
        "Calcular y modelar",
        "Investigar y experimentar",
      ],
      nivel_creatividad: 8,
      ambientes: [
        "Centro de cómputo",
        "Centro de investigación",
        "Ambiente tecnológico/startup",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 10,
        fisica: 7,
        quimica: 2,
        biologia: 1,
        expresion: 7,
      },
      dificultad_academica: 9,
    },
    profesion: {
      empleabilidad: 90,
      salario_inicial: 18000,
      salario_experiencia: 60000,
      sectores: [
        "Tecnología de la información",
        "Servicios financieros",
        "Educación e investigación",
        "Consultoría",
      ],
      demanda: "Muy Alta",
      emprendimiento: 8,
    },
    mision: {
      problemas: [
        "Procesamiento y análisis de información",
        "Desarrollo tecnológico",
        "Investigación científica",
      ],
      impacto_social: 9,
      contribucion_nacional: 9,
    },
  },
  {
    id: 47,
    nombre: "Licenciatura en Biología",
    area: "Biológico-Químico",
    pasion: {
      palabras_clave: [
        "Biología",
        "Medio ambiente",
        "Investigación",
        "Recursos naturales",
        "Salud",
        "Sustentabilidad",
      ],
      actividades: [
        "Realizar estudios de campo",
        "Investigar y experimentar",
        "Analizar datos",
        "Diagnosticar problemas",
        "Evaluar impacto ambiental",
      ],
      nivel_creatividad: 7,
      ambientes: ["Áreas naturales", "Laboratorio", "Centro de investigación"],
    },
    vocacion: {
      materias: {
        matematicas: 6,
        fisica: 5,
        quimica: 7,
        biologia: 10,
        expresion: 7,
      },
      dificultad_academica: 8,
    },
    profesion: {
      empleabilidad: 80,
      salario_inicial: 14000,
      salario_experiencia: 35000,
      sectores: [
        "Medio ambiente y sustentabilidad",
        "Salud",
        "Educación e investigación",
        "Biotecnología",
      ],
      demanda: "Alta",
      emprendimiento: 6,
    },
    mision: {
      problemas: [
        "Problemas de salud y enfermedades",
        "Contaminación ambiental",
        "Investigación científica",
        "Gestión eficiente de recursos",
      ],
      impacto_social: 8,
      contribucion_nacional: 8,
    },
  },
  {
    id: 48,
    nombre: "Licenciatura en Enfermería",
    area: "Biológico-Químico",
    pasion: {
      palabras_clave: [
        "Salud",
        "Cuidado",
        "Pacientes",
        "Atención clínica",
        "Prevención",
        "Bienestar",
      ],
      actividades: [
        "Atender pacientes",
        "Diagnosticar problemas",
        "Aplicar tratamientos",
        "Educar en salud",
      ],
      nivel_creatividad: 7,
      ambientes: [
        "Hospital/clínica",
        "Centro de salud",
        "Instituciones educativas",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 5,
        fisica: 4,
        quimica: 7,
        biologia: 9,
        expresion: 8,
      },
      dificultad_academica: 7,
    },
    profesion: {
      empleabilidad: 90,
      salario_inicial: 12000,
      salario_experiencia: 30000,
      sectores: [
        "Salud (hospitales, clínicas)",
        "Educación e investigación",
        "Gobierno y sector público",
      ],
      demanda: "Muy Alta",
      emprendimiento: 6,
    },
    mision: {
      problemas: [
        "Problemas de salud y enfermedades",
        "Prevención de riesgos",
        "Atención primaria",
      ],
      impacto_social: 9,
      contribucion_nacional: 9,
    },
  },
  {
    id: 49,
    nombre: "Licenciatura en Enfermería y Obstetricia",
    area: "Biológico-Químico",
    pasion: {
      palabras_clave: [
        "Salud",
        "Obstetricia",
        "Cuidado materno",
        "Pacientes",
        "Prevención",
        "Bienestar",
      ],
      actividades: [
        "Atender pacientes",
        "Aplicar tratamientos",
        "Educar en salud",
        "Asistir partos",
      ],
      nivel_creatividad: 7,
      ambientes: [
        "Hospital/clínica",
        "Centro de salud",
        "Instituciones educativas",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 5,
        fisica: 4,
        quimica: 7,
        biologia: 9,
        expresion: 8,
      },
      dificultad_academica: 7,
    },
    profesion: {
      empleabilidad: 90,
      salario_inicial: 13000,
      salario_experiencia: 32000,
      sectores: [
        "Salud (hospitales, clínicas)",
        "Educación e investigación",
        "Gobierno y sector público",
      ],
      demanda: "Muy Alta",
      emprendimiento: 6,
    },
    mision: {
      problemas: [
        "Problemas de salud materna",
        "Prevención de riesgos",
        "Atención primaria",
      ],
      impacto_social: 9,
      contribucion_nacional: 9,
    },
  },
  {
    id: 50,
    nombre: "Licenciatura en Nutrición",
    area: "Biológico-Químico",
    pasion: {
      palabras_clave: [
        "Salud",
        "Alimentación",
        "Bienestar",
        "Prevención",
        "Metabolismo",
        "Educación",
      ],
      actividades: [
        "Atender pacientes",
        "Educar en salud",
        "Analizar datos",
        "Diseñar planes alimenticios",
      ],
      nivel_creatividad: 8,
      ambientes: [
        "Hospital/clínica",
        "Centro de salud",
        "Instituciones educativas",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 6,
        fisica: 4,
        quimica: 8,
        biologia: 9,
        expresion: 8,
      },
      dificultad_academica: 8,
    },
    profesion: {
      empleabilidad: 88,
      salario_inicial: 12000,
      salario_experiencia: 30000,
      sectores: [
        "Salud (hospitales, clínicas)",
        "Educación e investigación",
        "Gobierno y sector público",
        "Consultoría",
      ],
      demanda: "Alta",
      emprendimiento: 7,
    },
    mision: {
      problemas: [
        "Problemas de salud y enfermedades",
        "Prevención de riesgos",
        "Educación alimentaria",
      ],
      impacto_social: 9,
      contribucion_nacional: 9,
    },
  },
  {
    id: 51,
    nombre: "Licenciatura en Odontología",
    area: "Médico-Biológico",
    pasion: {
      palabras_clave: [
        "Salud",
        "Medicina",
        "Diagnóstico",
        "Terapéutica",
        "Materiales",
      ],
      actividades: [
        "Atender pacientes/clientes",
        "Diagnosticar problemas",
        "Realizar pruebas y ensayos",
        "Operar maquinaria/equipos",
      ],
      nivel_creatividad: 4,
      ambientes: ["Consultorio", "Hospital/clínica"],
    },
    vocacion: {
      materias: {
        matematicas: 3,
        fisica: 4,
        quimica: 5,
        biologia: 7,
        expresion: 8,
      },
      dificultad_academica: 4,
    },
    profesion: {
      empleabilidad: 80,
      salario_inicial: 12000,
      salario_experiencia: 40000,
      sectores: ["Salud (hospitales, clínicas)", "Emprendimiento/startups"],
      demanda: "Media",
      emprendimiento: 9,
    },
    mision: {
      problemas: [
        "Problemas de salud y enfermedades (Oral)",
        "Diagnóstico y tratamiento médico",
      ],
      impacto_social: 7,
      contribucion_nacional: 7,
    },
  },
  {
    id: 52,
    nombre: "Licenciatura en Optometría",
    area: "Médico-Biológico",
    pasion: {
      palabras_clave: [
        "Salud",
        "Medicina",
        "Física",
        "Diagnóstico",
        "Terapéutica",
      ],
      actividades: [
        "Atender pacientes/clientes",
        "Diagnosticar problemas",
        "Realizar pruebas y ensayos",
        "Asesorar técnicamente",
      ],
      nivel_creatividad: 3,
      ambientes: ["Consultorio", "Espacios comerciales"],
    },
    vocacion: {
      materias: {
        matematicas: 4,
        fisica: 7,
        quimica: 3,
        biologia: 5,
        expresion: 7,
      },
      dificultad_academica: 4,
    },
    profesion: {
      empleabilidad: 85,
      salario_inicial: 11000,
      salario_experiencia: 30000,
      sectores: [
        "Salud (hospitales, clínicas)",
        "Comercio y retail",
        "Emprendimiento/startups",
      ],
      demanda: "Alta",
      emprendimiento: 8,
    },
    mision: {
      problemas: ["Problemas de salud visual", "Atención primaria"],
      impacto_social: 7,
      contribucion_nacional: 7,
    },
  },
  {
    id: 53,
    nombre: "Licenciatura en Médico Cirujano y Partero",
    area: "Médico-Biológico",
    pasion: {
      palabras_clave: [
        "Medicina",
        "Salud",
        "Diagnóstico",
        "Cirugía",
        "Investigación",
        "Terapéutica",
      ],
      actividades: [
        "Diagnosticar problemas",
        "Atender pacientes",
        "Investigar y experimentar",
        "Aplicar tratamientos",
      ],
      nivel_creatividad: 7,
      ambientes: ["Hospital/clínica", "Consultorio", "Centro de investigación"],
    },
    vocacion: {
      materias: {
        matematicas: 6,
        fisica: 7,
        quimica: 8,
        biologia: 10,
        expresion: 8,
      },
      dificultad_academica: 10,
    },
    profesion: {
      empleabilidad: 95,
      salario_inicial: 18000,
      salario_experiencia: 80000,
      sectores: [
        "Salud (hospitales, clínicas)",
        "Gobierno y sector público",
        "Educación e investigación",
        "Emprendimiento/startups",
      ],
      demanda: "Muy Alta",
      emprendimiento: 8,
    },
    mision: {
      problemas: [
        "Problemas de salud y enfermedades",
        "Diagnóstico y tratamiento médico",
        "Prevención de riesgos",
        "Investigación científica",
      ],
      impacto_social: 10,
      contribucion_nacional: 10,
    },
  },
  {
    id: 54,
    nombre: "Licenciatura en Medicina Forense y Criminalística",
    area: "Médico-Biológico",
    pasion: {
      palabras_clave: [
        "Medicina",
        "Biología",
        "Investigación",
        "Diagnóstico",
        "Seguridad",
      ],
      actividades: [
        "Diagnosticar problemas",
        "Investigar y experimentar",
        "Analizar datos",
        "Realizar pruebas y ensayos",
      ],
      nivel_creatividad: 6,
      ambientes: ["Laboratorio", "Hospital/clínica", "Oficina gubernamental"],
    },
    vocacion: {
      materias: {
        matematicas: 5,
        fisica: 5,
        quimica: 7,
        biologia: 9,
        expresion: 8,
      },
      dificultad_academica: 7,
    },
    profesion: {
      empleabilidad: 80,
      salario_inicial: 14000,
      salario_experiencia: 35000,
      sectores: [
        "Gobierno y sector público",
        "Salud (hospitales, clínicas)",
        "Educación e investigación",
      ],
      demanda: "Media",
      emprendimiento: 4,
    },
    mision: {
      problemas: [
        "Seguridad informática y protección de datos",
        "Investigación científica",
        "Diagnóstico y tratamiento médico",
      ],
      impacto_social: 8,
      contribucion_nacional: 8,
    },
  },
  {
    id: 55,
    nombre: "Licenciatura en Psicología",
    area: "Médico-Biológico",
    pasion: {
      palabras_clave: [
        "Salud",
        "Psicología",
        "Bienestar",
        "Educación",
        "Diagnóstico",
      ],
      actividades: [
        "Diagnosticar problemas",
        "Atender pacientes",
        "Investigar y experimentar",
        "Educar en salud",
        "Asesorar técnicamente",
      ],
      nivel_creatividad: 7,
      ambientes: [
        "Consultorio",
        "Instituciones educativas",
        "Hospital/clínica",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 5,
        fisica: 3,
        quimica: 3,
        biologia: 7,
        expresion: 9,
      },
      dificultad_academica: 6,
    },
    profesion: {
      empleabilidad: 82,
      salario_inicial: 12000,
      salario_experiencia: 35000,
      sectores: [
        "Salud (hospitales, clínicas)",
        "Educación e investigación",
        "Gobierno y sector público",
        "Emprendimiento/startups",
      ],
      demanda: "Alta",
      emprendimiento: 8,
    },
    mision: {
      problemas: [
        "Problemas de salud y enfermedades (Mental)",
        "Desigualdad social",
        "Educación y capacitación",
      ],
      impacto_social: 9,
      contribucion_nacional: 8,
    },
  },
  {
    id: 56,
    nombre: "Licenciatura en Terapia Física y Rehabilitación",
    area: "Médico-Biológico",
    pasion: {
      palabras_clave: [
        "Salud",
        "Rehabilitación",
        "Bienestar",
        "Anatomía",
        "Terapéutica",
      ],
      actividades: [
        "Atender pacientes",
        "Aplicar tratamientos",
        "Educar en salud",
        "Diagnosticar problemas",
      ],
      nivel_creatividad: 6,
      ambientes: ["Hospital/clínica", "Centro de salud", "Consultorio"],
    },
    vocacion: {
      materias: {
        matematicas: 4,
        fisica: 6,
        quimica: 5,
        biologia: 8,
        expresion: 8,
      },
      dificultad_academica: 6,
    },
    profesion: {
      empleabilidad: 88,
      salario_inicial: 11000,
      salario_experiencia: 30000,
      sectores: [
        "Salud (hospitales, clínicas)",
        "Emprendimiento/startups",
        "Gobierno y sector público",
      ],
      demanda: "Alta",
      emprendimiento: 8,
    },
    mision: {
      problemas: [
        "Problemas de salud y enfermedades",
        "Prevención de riesgos",
        "Atención primaria",
      ],
      impacto_social: 9,
      contribucion_nacional: 8,
    },
  },
  {
    id: 57,
    nombre: "Licenciatura en Quiropráctica",
    area: "Médico-Biológico",
    pasion: {
      palabras_clave: [
        "Salud",
        "Medicina",
        "Rehabilitación",
        "Bienestar",
        "Anatomía",
      ],
      actividades: [
        "Atender pacientes",
        "Aplicar tratamientos",
        "Diagnosticar problemas",
      ],
      nivel_creatividad: 4,
      ambientes: ["Consultorio", "Hospital/clínica"],
    },
    vocacion: {
      materias: {
        matematicas: 3,
        fisica: 5,
        quimica: 4,
        biologia: 8,
        expresion: 7,
      },
      dificultad_academica: 5,
    },
    profesion: {
      empleabilidad: 80,
      salario_inicial: 11000,
      salario_experiencia: 30000,
      sectores: ["Salud (hospitales, clínicas)", "Emprendimiento/startups"],
      demanda: "Media",
      emprendimiento: 9,
    },
    mision: {
      problemas: ["Problemas de salud y enfermedades", "Atención primaria"],
      impacto_social: 7,
      contribucion_nacional: 7,
    },
  },
  {
    id: 58,
    nombre: "Licenciatura en Administración",
    area: "Social-Administrativo",
    pasion: {
      palabras_clave: [
        "Administración",
        "Negocios",
        "Economía",
        "Finanzas",
        "Marketing",
        "Emprendimiento",
      ],
      actividades: [
        "Administrar recursos",
        "Planificar estrategias",
        "Gestionar proyectos",
        "Dirigir equipos de trabajo",
        "Negociar y vender",
      ],
      nivel_creatividad: 6,
      ambientes: [
        "Oficina corporativa",
        "Ambiente tecnológico/startup",
        "Espacios comerciales",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 5,
        fisica: 1,
        quimica: 1,
        biologia: 1,
        expresion: 9,
      },
      dificultad_academica: 5,
    },
    profesion: {
      empleabilidad: 80,
      salario_inicial: 12000,
      salario_experiencia: 35000,
      sectores: [
        "Servicios financieros",
        "Comercio y retail",
        "Gobierno y sector público",
        "Consultoría",
      ],
      demanda: "Alta",
      emprendimiento: 8,
    },
    mision: {
      problemas: [
        "Gestión empresarial y administrativa",
        "Gestión eficiente de recursos",
        "Problemas financieros y económicos",
      ],
      impacto_social: 6,
      contribucion_nacional: 6,
    },
  },
  {
    id: 59,
    nombre: "Licenciatura en Contaduría Pública",
    area: "Social-Administrativo",
    pasion: {
      palabras_clave: [
        "Finanzas",
        "Contabilidad",
        "Economía",
        "Administración",
        "Negocios",
      ],
      actividades: [
        "Analizar datos",
        "Administrar recursos",
        "Asesorar técnicamente",
        "Documentar procesos",
        "Planificar estrategias",
      ],
      nivel_creatividad: 4,
      ambientes: [
        "Oficina corporativa",
        "Oficina gubernamental",
        "Servicios financieros",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 7,
        fisica: 1,
        quimica: 1,
        biologia: 1,
        expresion: 8,
      },
      dificultad_academica: 6,
    },
    profesion: {
      empleabilidad: 88,
      salario_inicial: 14000,
      salario_experiencia: 40000,
      sectores: [
        "Servicios financieros",
        "Comercio y retail",
        "Gobierno y sector público",
        "Consultoría",
      ],
      demanda: "Muy Alta",
      emprendimiento: 7,
    },
    mision: {
      problemas: [
        "Problemas financieros y económicos",
        "Gestión eficiente de recursos",
        "Gestión empresarial y administrativa",
      ],
      impacto_social: 6,
      contribucion_nacional: 7,
    },
  },
  {
    id: 60,
    nombre: "Licenciatura en Administración de Empresas Turísticas",
    area: "Social-Administrativo",
    pasion: {
      palabras_clave: [
        "Turismo",
        "Administración",
        "Negocios",
        "Economía",
        "Marketing",
      ],
      actividades: [
        "Administrar recursos",
        "Gestionar proyectos",
        "Planificar estrategias",
        "Atender clientes",
      ],
      nivel_creatividad: 6,
      ambientes: [
        "Espacios comerciales",
        "Oficina corporativa",
        "Aeropuerto/aeronaves",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 5,
        fisica: 1,
        quimica: 1,
        biologia: 1,
        expresion: 8,
      },
      dificultad_academica: 5,
    },
    profesion: {
      empleabilidad: 78,
      salario_inicial: 12000,
      salario_experiencia: 30000,
      sectores: [
        "Turismo y hotelería",
        "Comercio y retail",
        "Gobierno y sector público",
      ],
      demanda: "Alta",
      emprendimiento: 7,
    },
    mision: {
      problemas: [
        "Gestión empresarial y administrativa",
        "Desarrollo económico",
        "Gestión eficiente de recursos",
      ],
      impacto_social: 6,
      contribucion_nacional: 6,
    },
  },
  {
    id: 61,
    nombre: "Licenciatura en Administración y Desarrollo Empresarial",
    area: "Social-Administrativo",
    pasion: {
      palabras_clave: [
        "Administración",
        "Emprendimiento",
        "Negocios",
        "Marketing",
        "Economía",
        "Finanzas",
      ],
      actividades: [
        "Administrar recursos",
        "Gestionar proyectos",
        "Planificar estrategias",
        "Negociar y vender",
        "Innovar y proponer soluciones",
      ],
      nivel_creatividad: 7,
      ambientes: [
        "Oficina corporativa",
        "Ambiente tecnológico/startup",
        "Espacios comerciales",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 5,
        fisica: 1,
        quimica: 1,
        biologia: 1,
        expresion: 9,
      },
      dificultad_academica: 7,
    },
    profesion: {
      empleabilidad: 75,
      salario_inicial: 12000,
      salario_experiencia: 35000,
      sectores: [
        "Emprendimiento/startups",
        "Servicios financieros",
        "Comercio y retail",
        "Consultoría",
      ],
      demanda: "Alta",
      emprendimiento: 10,
    },
    mision: {
      problemas: [
        "Gestión empresarial y administrativa",
        "Problemas financieros y económicos",
        "Innovación en procesos",
      ],
      impacto_social: 7,
      contribucion_nacional: 7,
    },
  },
  {
    id: 62,
    nombre: "Licenciatura en Archivonomía",
    area: "Social-Administrativo",
    pasion: {
      palabras_clave: ["Administración", "Datos", "Investigación", "Análisis"],
      actividades: [
        "Administrar recursos",
        "Analizar datos",
        "Documentar procesos",
        "Optimizar procesos",
      ],
      nivel_creatividad: 3,
      ambientes: [
        "Oficina gubernamental",
        "Oficina corporativa",
        "Centro de cómputo",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 4,
        fisica: 1,
        quimica: 1,
        biologia: 1,
        expresion: 7,
      },
      dificultad_academica: 4,
    },
    profesion: {
      empleabilidad: 60,
      salario_inicial: 10000,
      salario_experiencia: 25000,
      sectores: [
        "Gobierno y sector público",
        "Servicios financieros",
        "Educación e investigación",
      ],
      demanda: "Baja",
      emprendimiento: 3,
    },
    mision: {
      problemas: [
        "Gestión eficiente de recursos",
        "Procesamiento y análisis de información",
        "Seguridad informática y protección de datos",
      ],
      impacto_social: 5,
      contribucion_nacional: 5,
    },
  },
  {
    id: 63,
    nombre: "Licenciatura en Biblioteconomía",
    area: "Social-Administrativo",
    pasion: {
      palabras_clave: [
        "Datos",
        "Investigación",
        "Administración",
        "Análisis",
        "Multimedia",
      ],
      actividades: [
        "Administrar recursos",
        "Documentar procesos",
        "Analizar datos",
        "Capacitar personal",
      ],
      nivel_creatividad: 4,
      ambientes: [
        "Oficina gubernamental",
        "Centro de cómputo",
        "Centro de investigación",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 3,
        fisica: 1,
        quimica: 1,
        biologia: 1,
        expresion: 7,
      },
      dificultad_academica: 4,
    },
    profesion: {
      empleabilidad: 60,
      salario_inicial: 10000,
      salario_experiencia: 25000,
      sectores: [
        "Educación e investigación",
        "Gobierno y sector público",
        "Tecnología de la información",
      ],
      demanda: "Baja",
      emprendimiento: 3,
    },
    mision: {
      problemas: [
        "Gestión eficiente de recursos",
        "Educación y capacitación",
        "Procesamiento y análisis de información",
      ],
      impacto_social: 5,
      contribucion_nacional: 5,
    },
  },
  {
    id: 64,
    nombre: "Licenciatura en Economía",
    area: "Social-Administrativo",
    pasion: {
      palabras_clave: [
        "Economía",
        "Finanzas",
        "Mercados",
        "Matemáticas",
        "Análisis",
        "Investigación",
      ],
      actividades: [
        "Analizar datos",
        "Calcular y modelar",
        "Investigar y experimentar",
        "Planificar estrategias",
        "Asesorar técnicamente",
      ],
      nivel_creatividad: 6,
      ambientes: [
        "Oficina corporativa",
        "Oficina gubernamental",
        "Centro de investigación",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 8,
        fisica: 1,
        quimica: 1,
        biologia: 1,
        expresion: 7,
      },
      dificultad_academica: 7,
    },
    profesion: {
      empleabilidad: 78,
      salario_inicial: 15000,
      salario_experiencia: 45000,
      sectores: [
        "Servicios financieros",
        "Gobierno y sector público",
        "Consultoría",
        "Banca",
      ],
      demanda: "Alta",
      emprendimiento: 6,
    },
    mision: {
      problemas: [
        "Problemas financieros y económicos",
        "Gestión eficiente de recursos",
        "Desigualdad social",
        "Investigación científica",
      ],
      impacto_social: 8,
      contribucion_nacional: 8,
    },
  },
  {
    id: 65,
    nombre: "Licenciatura en Mercadotecnia Digital",
    area: "Social-Administrativo",
    pasion: {
      palabras_clave: [
        "Marketing",
        "Negocios",
        "Comunicación visual",
        "Multimedia",
        "Datos",
        "Mercados",
      ],
      actividades: [
        "Planificar estrategias",
        "Analizar datos",
        "Crear diseños gráficos/visuales",
        "Negociar y vender",
      ],
      nivel_creatividad: 9,
      ambientes: [
        "Oficina corporativa",
        "Ambiente tecnológico/startup",
        "Hogar/remoto",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 6,
        fisica: 1,
        quimica: 1,
        biologia: 1,
        expresion: 9,
      },
      dificultad_academica: 7,
    },
    profesion: {
      empleabilidad: 85,
      salario_inicial: 14000,
      salario_experiencia: 45000,
      sectores: [
        "Emprendimiento/startups",
        "Tecnología de la información",
        "Comercio y retail",
        "Consultoría",
      ],
      demanda: "Muy Alta",
      emprendimiento: 9,
    },
    mision: {
      problemas: [
        "Gestión empresarial y administrativa",
        "Desarrollo tecnológico",
        "Innovación en procesos",
      ],
      impacto_social: 6,
      contribucion_nacional: 6,
    },
  },
  {
    id: 66,
    nombre: "Licenciatura en Negocios Digitales",
    area: "Social-Administrativo",
    pasion: {
      palabras_clave: [
        "Negocios",
        "Emprendimiento",
        "Marketing",
        "Datos",
        "Economía",
        "Administración",
      ],
      actividades: [
        "Negociar y vender",
        "Planificar estrategias",
        "Administrar recursos",
        "Analizar datos",
        "Innovar y proponer soluciones",
      ],
      nivel_creatividad: 9,
      ambientes: [
        "Ambiente tecnológico/startup",
        "Oficina corporativa",
        "Hogar/remoto",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 6,
        fisica: 1,
        quimica: 1,
        biologia: 1,
        expresion: 9,
      },
      dificultad_academica: 7,
    },
    profesion: {
      empleabilidad: 88,
      salario_inicial: 16000,
      salario_experiencia: 50000,
      sectores: [
        "Emprendimiento/startups",
        "Tecnología de la información",
        "Comercio y retail",
        "Servicios financieros",
      ],
      demanda: "Muy Alta",
      emprendimiento: 10,
    },
    mision: {
      problemas: [
        "Gestión empresarial y administrativa",
        "Desarrollo tecnológico",
        "Innovación en procesos",
        "Problemas financieros y económicos",
      ],
      impacto_social: 8,
      contribucion_nacional: 8,
    },
  },
  {
    id: 67,
    nombre: "Licenciatura en Negocios Internacionales",
    area: "Social-Administrativo",
    pasion: {
      palabras_clave: [
        "Negocios",
        "Mercados",
        "Economía",
        "Administración",
        "Finanzas",
        "Marketing",
      ],
      actividades: [
        "Negociar y vender",
        "Planificar estrategias",
        "Administrar recursos",
        "Realizar análisis financieros",
        "Dirigir equipos de trabajo",
      ],
      nivel_creatividad: 7,
      ambientes: [
        "Oficina corporativa",
        "Espacios comerciales",
        "Aeropuerto/aeronaves",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 7,
        fisica: 1,
        quimica: 1,
        biologia: 1,
        expresion: 10,
      },
      dificultad_academica: 8,
    },
    profesion: {
      empleabilidad: 82,
      salario_inicial: 15000,
      salario_experiencia: 45000,
      sectores: [
        "Comercio y retail",
        "Logística y transporte",
        "Servicios financieros",
        "Gobierno y sector público",
      ],
      demanda: "Alta",
      emprendimiento: 7,
    },
    mision: {
      problemas: [
        "Problemas financieros y económicos",
        "Gestión empresarial y administrativa",
        "Gestión eficiente de recursos",
      ],
      impacto_social: 7,
      contribucion_nacional: 7,
    },
  },
  {
    id: 68,
    nombre: "Licenciatura en Relaciones Comerciales",
    area: "Social-Administrativo",
    pasion: {
      palabras_clave: [
        "Marketing",
        "Negocios",
        "Mercados",
        "Comunicación visual",
        "Administración",
      ],
      actividades: [
        "Negociar y vender",
        "Planificar estrategias",
        "Dirigir equipos de trabajo",
        "Asesorar técnicamente",
      ],
      nivel_creatividad: 6,
      ambientes: [
        "Oficina corporativa",
        "Espacios comerciales",
        "Oficina gubernamental",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 5,
        fisica: 1,
        quimica: 1,
        biologia: 1,
        expresion: 9,
      },
      dificultad_academica: 6,
    },
    profesion: {
      empleabilidad: 80,
      salario_inicial: 13000,
      salario_experiencia: 35000,
      sectores: [
        "Comercio y retail",
        "Logística y transporte",
        "Servicios financieros",
        "Consultoría",
      ],
      demanda: "Alta",
      emprendimiento: 6,
    },
    mision: {
      problemas: [
        "Problemas financieros y económicos",
        "Gestión empresarial y administrativa",
        "Gestión eficiente de recursos",
      ],
      impacto_social: 6,
      contribucion_nacional: 6,
    },
  },
  {
    id: 69,
    nombre: "Licenciatura en Turismo Sustentable",
    area: "Social-Administrativo",
    pasion: {
      palabras_clave: [
        "Sustentabilidad",
        "Medio ambiente",
        "Administración",
        "Negocios",
        "Economía",
      ],
      actividades: [
        "Planificar estrategias",
        "Gestionar proyectos",
        "Administrar recursos",
        "Evaluar impacto ambiental",
      ],
      nivel_creatividad: 7,
      ambientes: [
        "Áreas naturales",
        "Oficina gubernamental",
        "Espacios comerciales",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 4,
        fisica: 2,
        quimica: 2,
        biologia: 3,
        expresion: 8,
      },
      dificultad_academica: 5,
    },
    profesion: {
      empleabilidad: 65,
      salario_inicial: 10000,
      salario_experiencia: 28000,
      sectores: [
        "Turismo y hotelería",
        "Medio ambiente y sustentabilidad",
        "Gobierno y sector público",
      ],
      demanda: "Media",
      emprendimiento: 8,
    },
    mision: {
      problemas: [
        "Impacto ambiental de industrias",
        "Gestión eficiente de recursos",
        "Desigualdad social",
      ],
      impacto_social: 7,
      contribucion_nacional: 7,
    },
  },
  {
    id: 70,
    nombre: "Licenciatura en Turismo",
    area: "Social-Administrativo",
    pasion: {
      palabras_clave: [
        "Administración",
        "Negocios",
        "Economía",
        "Marketing",
        "Mercados",
      ],
      actividades: [
        "Planificar estrategias",
        "Gestionar proyectos",
        "Administrar recursos",
        "Negociar y vender",
        "Capacitar personal",
      ],
      nivel_creatividad: 6,
      ambientes: [
        "Espacios comerciales",
        "Oficina corporativa",
        "Aeropuerto/aeronaves",
      ],
    },
    vocacion: {
      materias: {
        matematicas: 4,
        fisica: 1,
        quimica: 1,
        biologia: 1,
        expresion: 8,
      },
      dificultad_academica: 5,
    },
    profesion: {
      empleabilidad: 70,
      salario_inicial: 10000,
      salario_experiencia: 28000,
      sectores: [
        "Turismo y hotelería",
        "Comercio y retail",
        "Logística y transporte",
      ],
      demanda: "Media",
      emprendimiento: 7,
    },
    mision: {
      problemas: [
        "Gestión empresarial y administrativa",
        "Problemas de transporte y movilidad",
        "Gestión eficiente de recursos",
      ],
      impacto_social: 5,
      contribucion_nacional: 5,
    },
  },
];

// ─── Preguntas del test alineadas con las carreras ────────────────────────────
// Las preguntas 1-10 corresponden a PASIÓN
// Las preguntas 11-20 corresponden a VOCACIÓN
// Las preguntas 21-30 corresponden a PROFESIÓN
// Las preguntas 31-40 corresponden a MISIÓN

// ─── Helpers ──────────────────────────────────────────────────────────────────

const norm = (v: number): number => ((v - 1) / 4) * 100;

const calcularIkigaiScore = (s: IkigaiScores): number => {
  const base = (s.pasion + s.vocacion + s.profesion + s.mision) / 4;
  const min = Math.min(s.pasion, s.vocacion, s.profesion, s.mision);
  const max = Math.max(s.pasion, s.vocacion, s.profesion, s.mision);
  const bonus = min >= 80 ? 10 : min >= 70 ? 5 : 0;
  const penalizacion = max - min > 40 ? -5 : 0;
  return Math.max(0, Math.min(100, Math.round(base + bonus + penalizacion)));
};

const identificarZona = (s: IkigaiScores): IkigaiZone => {
  const P = s.pasion >= 60;
  const V = s.vocacion >= 60;
  const PR = s.profesion >= 60;
  const M = s.mision >= 60;
  if (P && V && PR && M) return "PROPOSITO_FUERTE";
  if ((PR && M && P) || (M && P && V)) return "PROPOSITO_FUERTE";
  if ((P && V && PR) || (V && PR && M) || (V && PR) || (PR && M))
    return "PROFESION_IDEAL";
  return "EXPLORAR_MAS";
};

const scorePilar = (
  pilar: IkigaiPilar,
  answers: Record<string, number>,
  questions: Question[],
): number => {
  const qs = questions.filter((q) => q.pilar === pilar);
  if (!qs.length) return 50;
  const sum = qs.reduce((acc, q) => acc + norm(answers[q.id] ?? 3), 0);
  return Math.round(sum / qs.length);
};

type IkigaiPilar = "PASION" | "VOCACION" | "PROFESION" | "MISION";

// ─── Compatibilidad con carrera ───────────────────────────────────────────────

/**
 * Calcula qué tan compatible es el usuario con una carrera.
 * Usa las respuestas del test mapeadas a los 4 pilares Ikigai.
 *
 * PASIÓN   → preguntas 1-10 (intereses, actividades, creatividad, ambiente)
 * VOCACIÓN → preguntas 11-20 (materias y competencias)
 * PROFESIÓN→ preguntas 21-30 (sector, salario, estabilidad, emprendimiento)
 * MISIÓN   → preguntas 31-40 (impacto social, problemas que quiere resolver)
 */
// ─── Compatibilidad con carrera ───────────────────────────────────────────────

/**
 * Calcula qué tan compatible es el usuario con una carrera.
 * Usa las respuestas del test mapeadas a los 4 pilares Ikigai.
 *
 * PASIÓN   → preguntas 1-10 (intereses, actividades, creatividad, ambiente)
 * VOCACIÓN → preguntas 11-20 (materias y competencias)
 * PROFESIÓN→ preguntas 21-30 (sector, salario, estabilidad, emprendimiento)
 * MISIÓN   → preguntas 31-40 (impacto social, problemas que quiere resolver)
 */
const calcularCompatibilidad = (
  career: Career,
  scores: IkigaiScores,
  answers: Record<string, number>,
  questions: Question[],
): number => {
  let totalScore = 0;
  let totalWeight = 0;

  // 1. PASIÓN (40% del peso total)
  const pasionWeight = 40;

  // Q1: Interés en áreas tecnológicas/científicas
  const q1 = answers[questions[0]?.id] ?? 3;
  const q2 = answers[questions[1]?.id] ?? 3;
  const q3 = answers[questions[2]?.id] ?? 3;
  const q4 = answers[questions[3]?.id] ?? 3;
  const q5 = answers[questions[4]?.id] ?? 3;
  const q6 = answers[questions[5]?.id] ?? 3;
  const q7 = answers[questions[6]?.id] ?? 3;
  const q8 = answers[questions[7]?.id] ?? 3;
  const q9 = answers[questions[8]?.id] ?? 3;
  const q10 = answers[questions[9]?.id] ?? 3;

  // Mapeo de palabras clave a preguntas
  const palabrasClave = career.pasion.palabras_clave.map((p) =>
    p.toLowerCase(),
  );
  let pasionScore = 0;
  let pasionCount = 0;

  // Palabras clave tecnológicas
  if (
    palabrasClave.some((k) =>
      [
        "programación",
        "software",
        "algoritmos",
        "datos",
        "ia",
        "inteligencia artificial",
        "computación",
      ].includes(k),
    )
  ) {
    pasionScore += ((q1 + q8) / 2) * 2;
    pasionCount += 2;
  }

  // Palabras clave salud/medicina
  if (
    palabrasClave.some((k) =>
      [
        "salud",
        "medicina",
        "biología",
        "farmacéutica",
        "enfermería",
        "pacientes",
      ].includes(k),
    )
  ) {
    pasionScore += ((q2 + q6) / 2) * 2;
    pasionCount += 2;
  }

  // Palabras clave construcción/infraestructura
  if (
    palabrasClave.some((k) =>
      [
        "construcción",
        "infraestructura",
        "arquitectura",
        "civil",
        "estructuras",
      ].includes(k),
    )
  ) {
    pasionScore += ((q3 + q7) / 2) * 2;
    pasionCount += 2;
  }

  // Palabras clave negocios/administración
  if (
    palabrasClave.some((k) =>
      [
        "negocios",
        "administración",
        "finanzas",
        "marketing",
        "economía",
        "emprendimiento",
      ].includes(k),
    )
  ) {
    pasionScore += ((q4 + q10) / 2) * 2;
    pasionCount += 2;
  }

  // Palabras clave química/procesos
  if (
    palabrasClave.some((k) =>
      [
        "química",
        "procesos",
        "materiales",
        "laboratorio",
        "experimentación",
      ].includes(k),
    )
  ) {
    pasionScore += ((q5 + q6) / 2) * 2;
    pasionCount += 2;
  }

  // Palabras clave investigación
  if (
    palabrasClave.some((k) =>
      ["investigación", "ciencia", "experimentar", "laboratorio"].includes(k),
    )
  ) {
    pasionScore += q6 * 2;
    pasionCount += 2;
  }

  // Palabras clave diseño/creatividad
  if (
    palabrasClave.some((k) =>
      ["diseño", "creatividad", "arte", "visual", "gráfico"].includes(k),
    )
  ) {
    pasionScore += q7 * 2;
    pasionCount += 2;
  }

  // Palabras clave análisis/datos
  if (
    palabrasClave.some((k) =>
      ["análisis", "datos", "estadística", "matemáticas"].includes(k),
    )
  ) {
    pasionScore += q8 * 2;
    pasionCount += 2;
  }

  // Palabras clave naturaleza/ambiente
  if (
    palabrasClave.some((k) =>
      [
        "naturaleza",
        "ambiente",
        "sustentabilidad",
        "ecología",
        "forestal",
      ].includes(k),
    )
  ) {
    pasionScore += q9 * 2;
    pasionCount += 2;
  }

  // Nivel de creatividad de la carrera vs preferencia del usuario
  const creatividadCarrera = career.pasion.nivel_creatividad / 10; // 0-1
  const creatividadUsuario = norm(q7) / 100; // 0-1
  const afinidadCreatividad =
    100 - Math.abs(creatividadCarrera - creatividadUsuario) * 100;

  pasionScore += afinidadCreatividad;
  pasionCount += 1;

  // Ambientes de trabajo
  const ambientesCarrera = career.pasion.ambientes;
  const ambientesUsuario = {
    oficina: q3 > 3 ? 1 : 0, // Si le gusta construcción/oficina
    campo: q9 > 3 ? 1 : 0, // Si le gusta naturaleza
    laboratorio: q6 > 3 ? 1 : 0, // Si le gusta investigación
    tecnologia: q1 > 3 ? 1 : 0, // Si le gusta tecnología
    salud: q2 > 3 ? 1 : 0, // Si le gusta salud
    negocios: q4 > 3 ? 1 : 0, // Si le gusta negocios
  };

  let afinidadAmbientes = 0;
  ambientesCarrera.forEach((ambiente) => {
    const amb = ambiente.toLowerCase();
    if (amb.includes("oficina") && ambientesUsuario.oficina)
      afinidadAmbientes += 20;
    else if (amb.includes("campo") && ambientesUsuario.campo)
      afinidadAmbientes += 20;
    else if (amb.includes("laboratorio") && ambientesUsuario.laboratorio)
      afinidadAmbientes += 20;
    else if (amb.includes("tecnológico") && ambientesUsuario.tecnologia)
      afinidadAmbientes += 20;
    else if (amb.includes("hospital") && ambientesUsuario.salud)
      afinidadAmbientes += 20;
    else if (amb.includes("comercial") && ambientesUsuario.negocios)
      afinidadAmbientes += 20;
  });

  pasionScore += afinidadAmbientes / ambientesCarrera.length;
  pasionCount += 1;

  const pasionFinal = pasionCount > 0 ? pasionScore / pasionCount : 50;
  totalScore += pasionFinal * (pasionWeight / 100);
  totalWeight += pasionWeight / 100;

  // 2. VOCACIÓN (30% del peso total)
  const vocacionWeight = 30;
  const materiasCarrera = career.vocacion.materias;

  // Q11: Matemáticas
  const q11 = answers[questions[10]?.id] ?? 3;
  // Q12: Física
  const q12 = answers[questions[11]?.id] ?? 3;
  // Q13: Química
  const q13 = answers[questions[12]?.id] ?? 3;
  // Q14: Biología
  const q14 = answers[questions[13]?.id] ?? 3;
  // Q15: Expresión oral/escrita
  const q15 = answers[questions[14]?.id] ?? 3;
  // Q16: Trabajo en equipo
  const q16 = answers[questions[15]?.id] ?? 3;
  // Q17: Resolución de problemas
  const q17 = answers[questions[16]?.id] ?? 3;
  // Q18: Pensamiento analítico
  const q18 = answers[questions[17]?.id] ?? 3;
  // Q19: Aprendizaje autodidacta
  const q19 = answers[questions[18]?.id] ?? 3;
  // Q20: Persistencia
  const q20 = answers[questions[19]?.id] ?? 3;

  // Ponderación de materias según la carrera
  const afinidadMatematicas =
    100 - Math.abs(materiasCarrera.matematicas - q11 * 2) * 5;
  const afinidadFisica = 100 - Math.abs(materiasCarrera.fisica - q12 * 2) * 5;
  const afinidadQuimica = 100 - Math.abs(materiasCarrera.quimica - q13 * 2) * 5;
  const afinidadBiologia =
    100 - Math.abs(materiasCarrera.biologia - q14 * 2) * 5;
  const afinidadExpresion =
    100 - Math.abs(materiasCarrera.expresion - q15 * 2) * 5;

  // Habilidades generales
  const habilidadTecnica = (q17 + q18) / 2;
  const habilidadSocial = (q15 + q16) / 2;
  const perseverancia = (q19 + q20) / 2;

  // Dificultad académica de la carrera
  const dificultadCarrera = career.vocacion.dificultad_academica / 10;
  const afinidadDificultad =
    100 - Math.abs(dificultadCarrera - norm(perseverancia) / 100) * 100;

  const vocacionScore =
    afinidadMatematicas * 0.25 +
    afinidadFisica * 0.15 +
    afinidadQuimica * 0.15 +
    afinidadBiologia * 0.15 +
    afinidadExpresion * 0.15 +
    afinidadDificultad * 0.15;

  totalScore += vocacionScore * (vocacionWeight / 100);
  totalWeight += vocacionWeight / 100;

  // 3. PROFESIÓN (20% del peso total)
  const profesionWeight = 20;

  // Q21: Preferencia salarial
  const q21 = answers[questions[20]?.id] ?? 3;
  // Q22: Estabilidad laboral
  const q22 = answers[questions[21]?.id] ?? 3;
  // Q23: Sector público/privado
  const q23 = answers[questions[22]?.id] ?? 3;
  // Q24: Tamaño de empresa
  const q24 = answers[questions[23]?.id] ?? 3;
  // Q25: Emprendimiento
  const q25 = answers[questions[24]?.id] ?? 3;
  // Q26: Movilidad geográfica
  const q26 = answers[questions[25]?.id] ?? 3;
  // Q27: Trabajo en equipo/individual
  const q27 = answers[questions[26]?.id] ?? 3;
  // Q28: Rutina/variedad
  const q28 = answers[questions[27]?.id] ?? 3;
  // Q29: Presión laboral
  const q29 = answers[questions[28]?.id] ?? 3;
  // Q30: Balance vida-trabajo
  const q30 = answers[questions[29]?.id] ?? 3;

  // Salario esperado vs preferencia
  const salarioPromedio =
    (career.profesion.salario_inicial + career.profesion.salario_experiencia) /
    2;
  const salarioMinimo = 10000;
  const salarioMaximo = 80000;
  const salarioNormalizado = Math.min(
    1,
    Math.max(
      0,
      (salarioPromedio - salarioMinimo) / (salarioMaximo - salarioMinimo),
    ),
  );
  const preferenciaSalarial = norm(q21) / 100;
  const afinidadSalarial =
    100 - Math.abs(salarioNormalizado - preferenciaSalarial) * 100;

  // Empleabilidad vs preferencia de estabilidad
  const empleabilidadCarrera = career.profesion.empleabilidad / 100;
  const preferenciaEstabilidad = norm(q22) / 100;
  const afinidadEstabilidad =
    100 - Math.abs(empleabilidadCarrera - preferenciaEstabilidad) * 100;

  // Sectores vs preferencia
  const sectoresCarrera = career.profesion.sectores;
  const prefierePublico = q23 > 3;
  const prefierePrivado = q23 < 3;
  const prefiereMixto = q23 === 3;

  let afinidadSector = 0;
  sectoresCarrera.forEach((sector) => {
    if (sector.includes("Gobierno") && prefierePublico) afinidadSector += 25;
    else if (sector.includes("Privado") && prefierePrivado)
      afinidadSector += 25;
    else if (sector.includes("Privado") && prefiereMixto) afinidadSector += 15;
    else if (sector.includes("Gobierno") && prefiereMixto) afinidadSector += 15;
    else if (!sector.includes("Gobierno") && !sector.includes("Privado"))
      afinidadSector += 10;
  });

  // Emprendimiento
  const emprendimientoCarrera = career.profesion.emprendimiento / 10;
  const preferenciaEmprendimiento = norm(q25) / 100;
  const afinidadEmprendimiento =
    100 - Math.abs(emprendimientoCarrera - preferenciaEmprendimiento) * 100;

  // Demanda laboral
  const demandaMap: Record<string, number> = {
    "Muy Alta": 0.9,
    Alta: 0.7,
    Media: 0.5,
    Baja: 0.3,
  };
  const demandaCarrera = demandaMap[career.profesion.demanda] || 0.5;
  const afinidadDemanda =
    100 - Math.abs(demandaCarrera - preferenciaEstabilidad) * 100;

  const profesionScore =
    afinidadSalarial * 0.25 +
    afinidadEstabilidad * 0.25 +
    afinidadSector * 0.2 +
    afinidadEmprendimiento * 0.15 +
    afinidadDemanda * 0.15;

  totalScore += profesionScore * (profesionWeight / 100);
  totalWeight += profesionWeight / 100;

  // 4. MISIÓN (10% del peso total)
  const misionWeight = 10;

  // Q31: Impacto social
  const q31 = answers[questions[30]?.id] ?? 3;
  // Q32: Ayudar a personas
  const q32 = answers[questions[31]?.id] ?? 3;
  // Q33: Medio ambiente
  const q33 = answers[questions[32]?.id] ?? 3;
  // Q34: Innovación tecnológica
  const q34 = answers[questions[33]?.id] ?? 3;
  // Q35: Educación
  const q35 = answers[questions[34]?.id] ?? 3;
  // Q36: Investigación científica
  const q36 = answers[questions[35]?.id] ?? 3;
  // Q37: Desarrollo económico
  const q37 = answers[questions[36]?.id] ?? 3;
  // Q38: Justicia social
  const q38 = answers[questions[37]?.id] ?? 3;
  // Q39: Cultura/arte
  const q39 = answers[questions[38]?.id] ?? 3;
  // Q40: Salud/bienestar
  const q40 = answers[questions[39]?.id] ?? 3;

  const problemasCarrera = career.mision.problemas.map((p) => p.toLowerCase());
  let misionScore = 0;
  let misionCount = 0;

  // Mapeo de problemas a preguntas
  if (
    problemasCarrera.some(
      (p) =>
        p.includes("salud") || p.includes("enfermedad") || p.includes("médico"),
    )
  ) {
    misionScore += norm(q40) + norm(q32);
    misionCount += 2;
  }

  if (
    problemasCarrera.some(
      (p) =>
        p.includes("ambiente") ||
        p.includes("contaminación") ||
        p.includes("ecología"),
    )
  ) {
    misionScore += norm(q33) * 2;
    misionCount += 2;
  }

  if (
    problemasCarrera.some(
      (p) =>
        p.includes("tecnología") ||
        p.includes("innovación") ||
        p.includes("desarrollo tecnológico"),
    )
  ) {
    misionScore += norm(q34) * 2;
    misionCount += 2;
  }

  if (
    problemasCarrera.some(
      (p) =>
        p.includes("educación") ||
        p.includes("formación") ||
        p.includes("capacitación"),
    )
  ) {
    misionScore += norm(q35) * 2;
    misionCount += 2;
  }

  if (
    problemasCarrera.some(
      (p) => p.includes("investigación") || p.includes("ciencia"),
    )
  ) {
    misionScore += norm(q36) * 2;
    misionCount += 2;
  }

  if (
    problemasCarrera.some(
      (p) =>
        p.includes("económico") ||
        p.includes("financiero") ||
        p.includes("desarrollo"),
    )
  ) {
    misionScore += norm(q37) + norm(q31);
    misionCount += 2;
  }

  if (
    problemasCarrera.some(
      (p) =>
        p.includes("social") ||
        p.includes("desigualdad") ||
        p.includes("justicia"),
    )
  ) {
    misionScore += norm(q38) * 2;
    misionCount += 2;
  }

  // Impacto social de la carrera vs preferencia
  const impactoSocialCarrera = career.mision.impacto_social / 10;
  const preferenciaImpacto = norm(q31) / 100;
  const afinidadImpacto =
    100 - Math.abs(impactoSocialCarrera - preferenciaImpacto) * 100;

  misionScore += afinidadImpacto;
  misionCount += 1;

  // Contribución nacional
  const contribucionCarrera = career.mision.contribucion_nacional / 10;
  const afinidadContribucion =
    100 - Math.abs(contribucionCarrera - preferenciaImpacto) * 100;

  misionScore += afinidadContribucion;
  misionCount += 1;

  const misionFinal = misionCount > 0 ? misionScore / misionCount : 50;
  totalScore += misionFinal * (misionWeight / 100);
  totalWeight += misionWeight / 100;

  // Ajuste por consistencia con scores generales de Ikigai
  const scoreIkigai = calcularIkigaiScore(scores);
  const consistencia = 100 - Math.abs(scoreIkigai - totalScore) * 0.5;

  totalScore = totalScore * 0.7 + consistencia * 0.3;

  return Math.max(0, Math.min(100, Math.round(totalScore)));
};

// ─── Función principal ────────────────────────────────────────────────────────

export function calcularIkigai(
  answers: Record<string, number>,
  questions: Question[],
  includeAllCareers: boolean = false,
): IkigaiCalculatorResult {
  // Calcular scores por pilar
  const pasion = scorePilar("PASION", answers, questions);
  const vocacion = scorePilar("VOCACION", answers, questions);
  const profesion = scorePilar("PROFESION", answers, questions);
  const mision = scorePilar("MISION", answers, questions);

  const scores: IkigaiScores = { pasion, vocacion, profesion, mision };
  const scoreGlobal = calcularIkigaiScore(scores);
  const zonaIkigai = identificarZona(scores);

  // Perfil vocacional
  const profile: VocationalProfile = {
    tecnologico: Math.round(pasion * 0.4 + vocacion * 0.4 + profesion * 0.2),
    cientifico: Math.round(vocacion * 0.5 + mision * 0.3 + pasion * 0.2),
    salud: Math.round(pasion * 0.3 + mision * 0.4 + vocacion * 0.3),
    administrativo: Math.round(profesion * 0.5 + mision * 0.3 + vocacion * 0.2),
    social: Math.round(pasion * 0.4 + profesion * 0.3 + mision * 0.3),
  };

  const resultadosCompletos: CareerResult[] = CAREERS.map((career) => ({
    id: career.id.toString(), // ✅ Convertir number a string
    name: career.nombre,
    area: career.area,
    compatibility: calcularCompatibilidad(career, scores, answers, questions),
    scores: {
      pasion: Math.round(pasion * 0.4),
      vocacion: Math.round(vocacion * 0.3),
      profesion: Math.round(profesion * 0.2),
      mision: Math.round(mision * 0.1),
    },
    zonaIkigai: zonaIkigai,
  }));
  // Ordenar por puntaje y tomar top 10
  const ordenados = [...resultadosCompletos].sort(
    (a, b) => b.compatibility - a.compatibility,
  );
  const topCareers = ordenados.slice(0, 10);

  return {
    profile,
    topCareers,
    resultadosCompletos: includeAllCareers ? ordenados : topCareers,
    scoreGlobal,
    zonaIkigai,
  };
}

// ─── Helper para descripción del perfil ───────────────────────────────────────

function generarDescripcionPerfil(
  pasion: number,
  vocacion: number,
  profesion: number,
  mision: number,
): string {
  const fortalezas: string[] = [];
  const areasMejora: string[] = [];

  if (pasion >= 70) fortalezas.push("tienes claros tus intereses y pasiones");
  else if (pasion <= 40) areasMejora.push("explorar más tus intereses");

  if (vocacion >= 70) fortalezas.push("tienes habilidades académicas sólidas");
  else if (vocacion <= 40) areasMejora.push("desarrollar habilidades técnicas");

  if (profesion >= 70)
    fortalezas.push("tienes expectativas profesionales claras");
  else if (profesion <= 40)
    areasMejora.push("investigar más sobre el mercado laboral");

  if (mision >= 70) fortalezas.push("tienes un fuerte sentido de propósito");
  else if (mision <= 40)
    areasMejora.push("reflexionar sobre el impacto que quieres tener");

  if (fortalezas.length === 0)
    fortalezas.push("estás en proceso de descubrir tu camino");

  return `Tus fortalezas: ${fortalezas.join(", ")}. ${areasMejora.length ? `Áreas a explorar: ${areasMejora.join(", ")}.` : ""}`;
}
