import type {
  Question,
  VocationalProfile,
  CareerResult,
  IkigaiZone,
} from "@/features/tests/types/tests.types";

import { CAREERS } from "./careersData";

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
  unidades: string[]; // ✅ Agregar
  area: string;
  pasion: {
    palabras_clave: string[];
    actividades: string[];
    nivel_creatividad: number;
    ambientes: string[];
    naturaleza?: string; // ✅ Opcional
  };
  vocacion: {
    materias: {
      matematicas: number;
      fisica: number;
      quimica: number;
      biologia: number;
      expresion: number;
    };
    habilidades_tecnicas?: string[]; // ✅ Opcional
    habilidades_blandas?: string[]; // ✅ Opcional
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
    sectores_impacto?: string[]; // ✅ Opcional
    ods?: number[]; // ✅ Opcional
  };
}

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
  const todos = [s.pasion, s.vocacion, s.profesion, s.mision];
  const promedio = todos.reduce((a, b) => a + b, 0) / 4;
  const minimo = Math.min(...todos);

  if (promedio >= 72 && minimo >= 55) return "PROPOSITO_FUERTE";
  if (promedio >= 55 && s.vocacion >= 55 && s.profesion >= 55)
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

// ─── Perfil vocacional basado en las materias que le gustan al usuario ────────
// En lugar de mezclar pilares genéricamente, usamos las respuestas de vocación
// (Q11-Q20) para calcular afinidad real por área

const calcularPerfil = (
  answers: Record<string, number>,
  questions: Question[],
): VocationalProfile => {
  const get = (i: number) => norm(answers[questions[i]?.id] ?? 3);

  // Intereses (Q1-Q10)
  const q1 = get(0); // tecnología
  const q2 = get(1); // salud
  const q3 = get(2); // construcción
  const q4 = get(3); // negocios
  const q5 = get(4); // química
  const q6 = get(5); // investigación
  const q7 = get(6); // diseño
  const q8 = get(7); // análisis datos
  const q9 = get(8); // naturaleza
  const q10 = get(9); // impacto sociedad

  // Materias (Q11-Q15)
  const q11 = get(10); // matemáticas
  const q12 = get(11); // física
  const q13 = get(12); // química
  const q14 = get(13); // biología
  const q15 = get(14); // expresión/comunicación

  // Misión (Q31-Q40)
  const q31 = get(30); // medio ambiente
  const q32 = get(31); // salud pública
  const q35 = get(34); // desigualdad social
  const q39 = get(38); // impacto social visible

  return {
    tecnologico: Math.round(q1 * 0.35 + q11 * 0.25 + q12 * 0.25 + q8 * 0.15),
    cientifico: Math.round(
      q6 * 0.3 + q11 * 0.2 + q12 * 0.2 + q13 * 0.15 + q9 * 0.15,
    ),
    salud: Math.round(q2 * 0.4 + q14 * 0.35 + q32 * 0.25),
    administrativo: Math.round(q4 * 0.45 + q15 * 0.25 + q8 * 0.15 + q10 * 0.15),
    social: Math.round(q10 * 0.3 + q35 * 0.25 + q39 * 0.25 + q15 * 0.2),
  };
};
const calcularPasionCarrera = (
  career: Career,
  answers: Record<string, number>,
  questions: Question[],
): number => {
  const kw = career.pasion.palabras_clave.map((k) => k.toLowerCase());
  const acts = career.pasion.actividades.map((a) => a.toLowerCase());

  const q1 = norm(answers[questions[0]?.id] ?? 3); // tecnología
  const q2 = norm(answers[questions[1]?.id] ?? 3); // salud
  const q3 = norm(answers[questions[2]?.id] ?? 3); // construcción
  const q4 = norm(answers[questions[3]?.id] ?? 3); // negocios
  const q5 = norm(answers[questions[4]?.id] ?? 3); // química
  const q6 = norm(answers[questions[5]?.id] ?? 3); // investigación
  const q7 = norm(answers[questions[6]?.id] ?? 3); // diseño/creatividad
  const q8 = norm(answers[questions[7]?.id] ?? 3); // análisis datos
  const q9 = norm(answers[questions[8]?.id] ?? 3); // naturaleza
  const q10 = norm(answers[questions[9]?.id] ?? 3); // impacto sociedad
  const q11 = norm(answers[questions[10]?.id] ?? 3);

  const mapa: Record<string, number> = {
    programación: q1,
    software: q1,
    algoritmos: q1,
    "inteligencia artificial": q1,
    hardware: q1,
    redes: q1,
    electrónica: q1,
    sistemas: q1,
    computación: q1,
    salud: q2,
    medicina: q2,
    biología: q2,
    farmacéutica: q2,
    enfermería: q2,
    construcción: q3,
    infraestructura: q3,
    arquitectura: q3,
    civil: q3,
    negocios: q4,
    administración: q4,
    finanzas: q4,
    marketing: q4,
    economía: q4,
    emprendimiento: q4,
    química: q5,
    "procesos químicos": q5,
    biotecnología: q5,
    materiales: q5,
    investigación: q6,
    ciencia: q6,
    laboratorio: q6,
    diseño: q7,
    creatividad: q7,
    arte: q7,
    datos: q8,
    estadística: q8,
    análisis: q8,
    matemáticas: q8,
    modelado: q8,
    naturaleza: q9,
    "medio ambiente": q9,
    sustentabilidad: q9,
    forestal: q9,
    social: q10,
    educación: q10,
    // Administrativo/económico
    mercados: q4,
    "política económica": q4,
    "gestión empresarial": q4,
    planeación: q4,
    estrategia: q4,
    contabilidad: q4,
    auditoría: q4,
    logística: q4,
    "recursos humanos": q4,
    comercio: q4,
    // Salud adicionales
    nutrición: q2,
    diagnóstico: q2,
    rehabilitación: q2,
    óptica: q2,
    bioquímica: (q2 + q5) / 2,
    // Social
    "trabajo social": q10,
    psicología: q10,
    comunidad: q10,
    // Ciencias
    física: (q6 + q11) / 2,
    geofísica: q6,
    meteorología: q6,
    oceanografía: q9,
  };

  let total = 0;
  let count = 0;
  for (const palabra of kw) {
    const score = mapa[palabra];
    if (score !== undefined) {
      total += score;
      count++;
    }
  }

  // Actividades
  const actMapa: Record<string, number> = {
    "programar y desarrollar software": q1,
    "diseñar sistemas": (q1 + q7) / 2,
    "investigar y experimentar": q6,
    "analizar datos": q8,
    "atender pacientes": q2,
    "diseñar infraestructura": q3,
    "gestionar proyectos": q4,
    "realizar estudios de campo": q9,
    "construir prototipos": (q1 + q7) / 2,
    "calcular y modelar": q8,
    "planificar estrategias": q4,
    "asesorar técnicamente": (q4 + q6) / 2,
    "gestionar recursos": q4,
    "elaborar proyectos": (q4 + q8) / 2,
    "atender personas": q2,
    "orientar y guiar": q10,
    "realizar intervenciones": q10,
    "promover el desarrollo": q10,
    "diagnosticar y tratar": q2,
    "prevenir enfermedades": q2,
    "elaborar estados financieros": q4,
    "auditar procesos": q4,
  };
  for (const act of acts) {
    const score = actMapa[act];
    if (score !== undefined) {
      total += score;
      count++;
    }
  }

  // Afinidad de creatividad
  const creatividadCarrera = career.pasion.nivel_creatividad / 10;
  const creatividadUsuario = q7 / 100;
  total += (1 - Math.abs(creatividadCarrera - creatividadUsuario)) * 100;
  count++;

  return count > 0 ? Math.min(100, Math.round(total / count)) : 50;
};

const calcularVocacionCarrera = (
  career: Career,
  answers: Record<string, number>,
  questions: Question[],
): number => {
  const m = career.vocacion.materias;

  const q11 = answers[questions[10]?.id] ?? 3; // matemáticas (1-5)
  const q12 = answers[questions[11]?.id] ?? 3; // física
  const q13 = answers[questions[12]?.id] ?? 3; // química
  const q14 = answers[questions[13]?.id] ?? 3; // biología
  const q15 = answers[questions[14]?.id] ?? 3; // expresión
  const q17 = answers[questions[16]?.id] ?? 3; // resolución problemas
  const q19 = answers[questions[18]?.id] ?? 3; // aprendizaje

  // Escalar respuesta Likert (1-5) a escala de la carrera (1-10)
  const escalar = (likert: number) => (likert / 5) * 10;

  const diffMat = Math.abs(m.matematicas - escalar(q11));
  const diffFis = Math.abs(m.fisica - escalar(q12));
  const diffQui = Math.abs(m.quimica - escalar(q13));
  const diffBio = Math.abs(m.biologia - escalar(q14));
  const diffExp = Math.abs(m.expresion - escalar(q15));

  // Convertir diferencia (0-10) a score (0-100): menos diferencia = mejor
  const scoreMat = Math.max(0, 100 - diffMat * 10);
  const scoreFis = Math.max(0, 100 - diffFis * 10);
  const scoreQui = Math.max(0, 100 - diffQui * 10);
  const scoreBio = Math.max(0, 100 - diffBio * 10);
  const scoreExp = Math.max(0, 100 - diffExp * 10);

  // Dificultad académica vs disposición al esfuerzo
  const dificultad = career.vocacion.dificultad_academica;
  const esfuerzo = escalar((q17 + q19) / 2);
  const scoreDif = Math.max(0, 100 - Math.abs(dificultad - esfuerzo) * 10);

  return Math.round(
    scoreMat * 0.25 +
      scoreFis * 0.2 +
      scoreQui * 0.15 +
      scoreBio * 0.15 +
      scoreExp * 0.1 +
      scoreDif * 0.15,
  );
};

const calcularProfesionCarrera = (
  career: Career,
  answers: Record<string, number>,
  questions: Question[],
): number => {
  const q21 = answers[questions[20]?.id] ?? 3; // preferencia salarial
  const q22 = answers[questions[21]?.id] ?? 3; // estabilidad laboral
  const q23 = answers[questions[22]?.id] ?? 3; // sector público/privado
  const q25 = answers[questions[24]?.id] ?? 3; // emprendimiento
  const q29 = answers[questions[28]?.id] ?? 3; // presión laboral aceptable

  // Salario normalizado (10k-80k → 0-100)
  const salPromedio =
    (career.profesion.salario_inicial + career.profesion.salario_experiencia) /
    2;
  const salNorm = Math.min(100, Math.max(0, (salPromedio - 10000) / 700));
  const salScore = Math.max(0, 100 - Math.abs(salNorm - norm(q21)));

  // Empleabilidad vs preferencia estabilidad
  const empNorm =
    career.profesion.empleabilidad <= 1
      ? career.profesion.empleabilidad * 100
      : career.profesion.empleabilidad;

  const estScore = Math.max(0, 100 - Math.abs(empNorm - norm(q22)));

  // Demanda
  const demandaMap: Record<string, number> = {
    "Muy Alta": 95,
    Alta: 75,
    Media: 50,
    Baja: 25,
  };
  const demandaNorm = demandaMap[career.profesion.demanda] ?? 50;
  const demandaScore = Math.max(0, 100 - Math.abs(demandaNorm - norm(q22)));

  // Sector público vs privado
  const tienePublico = career.profesion.sectores.some((s) =>
    s.includes("Gobierno"),
  );
  const sectorScore = tienePublico
    ? norm(q23) // le gusta sector público y la carrera lo ofrece
    : 100 - norm(q23); // prefiere privado y la carrera es privada

  // Emprendimiento
  const emprendNorm = career.profesion.emprendimiento * 10;
  const emprendScore = Math.max(0, 100 - Math.abs(emprendNorm - norm(q25)));

  return Math.round(
    salScore * 0.25 +
      estScore * 0.2 +
      demandaScore * 0.2 +
      sectorScore * 0.15 +
      emprendScore * 0.2,
  );
};

const calcularMisionCarrera = (
  career: Career,
  answers: Record<string, number>,
  questions: Question[],
): number => {
  const q31 = norm(answers[questions[30]?.id] ?? 3); // medio ambiente
  const q32 = norm(answers[questions[31]?.id] ?? 3); // salud pública
  const q33 = norm(answers[questions[32]?.id] ?? 3); // desarrollo tecnológico
  const q34 = norm(answers[questions[33]?.id] ?? 3); // infraestructura comunidades
  const q35 = norm(answers[questions[34]?.id] ?? 3); // desigualdad social
  const q36 = norm(answers[questions[35]?.id] ?? 3); // investigación científica
  const q37 = norm(answers[questions[36]?.id] ?? 3); // cambio climático
  const q38 = norm(answers[questions[37]?.id] ?? 3); // innovación industrial
  const q39 = norm(answers[questions[38]?.id] ?? 3); // impacto social visible
  const q40 = norm(answers[questions[39]?.id] ?? 3); // desarrollo económico

  const problemas = career.mision.problemas.map((p) => p.toLowerCase());

  const mapaProblemas: Record<string, number> = {
    "contaminación ambiental": q31,
    "impacto ambiental de industrias": q31,
    "cambio climático": q37,
    "gestión eficiente de recursos": (q31 + q37) / 2,
    "problemas de salud y enfermedades": q32,
    "diagnóstico y tratamiento médico": q32,
    "atención primaria": q32,
    "prevención de riesgos": q32,
    "desarrollo tecnológico": q33,
    "innovación en procesos": q38,
    "automatización de procesos industriales": q38,
    "desarrollo de software y aplicaciones": q33,
    "infraestructura y construcción de obras": q34,
    "problemas de transporte y movilidad": q34,
    "desigualdad social": q35,
    "investigación científica": q36,
    "procesamiento y análisis de información": q33,
    "problemas financieros y económicos": q40,
    "gestión empresarial y administrativa": q40,
    "optimización de la producción": q38,
    "calidad de productos y servicios": q38,
    "diseño y desarrollo de productos innovadores": q33,
    "escasez de energía": q37,
    "desarrollo de energías renovables": q37,
  };

  let total = 0;
  let count = 0;
  for (const p of problemas) {
    const key = Object.keys(mapaProblemas).find(
      (k) => p.includes(k) || k.includes(p),
    );
    if (key) {
      total += mapaProblemas[key];
      count++;
    }
  }

  // Impacto social de la carrera vs qué tanto le importa al usuario
  const impactoNorm = career.mision.impacto_social * 10;
  total += Math.max(0, 100 - Math.abs(impactoNorm - q39));
  count++;

  return count > 0 ? Math.min(100, Math.round(total / count)) : 50;
};

// ─── Función principal ────────────────────────────────────────────────────────

export function calcularIkigai(
  answers: Record<string, number>,
  questions: Question[],
  includeAllCareers: boolean = false,
): IkigaiCalculatorResult {
  console.log("Total questions:", questions.length);
  console.log("Answers:", answers);
  console.log(
    "Q11 id:",
    questions[10]?.id,
    "answer:",
    answers[questions[10]?.id],
  );
  console.log(
    "Q14 bio id:",
    questions[13]?.id,
    "answer:",
    answers[questions[13]?.id],
  );
  console.log(
    "Q15 exp id:",
    questions[14]?.id,
    "answer:",
    answers[questions[14]?.id],
  );
  const pasion = scorePilar("PASION", answers, questions);
  const vocacion = scorePilar("VOCACION", answers, questions);
  const profesion = scorePilar("PROFESION", answers, questions);
  const mision = scorePilar("MISION", answers, questions);

  const scores: IkigaiScores = { pasion, vocacion, profesion, mision };
  const scoreGlobal = calcularIkigaiScore(scores);
  const zonaIkigai = identificarZona(scores);
  const profile = calcularPerfil(answers, questions);

  const resultadosCompletos: CareerResult[] = CAREERS.map((career) => {
    const careerPasionScore = calcularPasionCarrera(career, answers, questions);
    const careerVocacionScore = calcularVocacionCarrera(
      career,
      answers,
      questions,
    );
    const careerProfesionScore = calcularProfesionCarrera(
      career,
      answers,
      questions,
    );
    const careerMisionScore = calcularMisionCarrera(career, answers, questions);

    // Usar promedio ponderado de los 4 pilares como compatibility
    const compatibility = Math.round(
      careerPasionScore * 0.35 +
        careerVocacionScore * 0.3 +
        careerProfesionScore * 0.2 +
        careerMisionScore * 0.15,
    );

    return {
      id: career.id.toString(),
      name: career.nombre,
      compatibility,
      zonaIkigai: identificarZona({
        pasion: careerPasionScore,
        vocacion: careerVocacionScore,
        profesion: careerProfesionScore,
        mision: careerMisionScore,
      }),
      scores: {
        pasion: Math.round(careerPasionScore),
        vocacion: Math.round(careerVocacionScore),
        profesion: Math.round(careerProfesionScore),
        mision: Math.round(careerMisionScore),
      },
    };
  });
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
