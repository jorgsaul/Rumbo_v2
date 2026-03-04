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

// ─── Perfil vocacional basado en las materias que le gustan al usuario ────────
// En lugar de mezclar pilares genéricamente, usamos las respuestas de vocación
// (Q11-Q20) para calcular afinidad real por área

const calcularPerfil = (
  answers: Record<string, number>,
  questions: Question[],
): VocationalProfile => {
  // Q11=matemáticas, Q12=física, Q13=química, Q14=biología, Q15=expresión
  const q11 = norm(answers[questions[10]?.id] ?? 3);
  const q12 = norm(answers[questions[11]?.id] ?? 3);
  const q13 = norm(answers[questions[12]?.id] ?? 3);
  const q14 = norm(answers[questions[13]?.id] ?? 3);
  const q15 = norm(answers[questions[14]?.id] ?? 3);

  // Q1=tecnología, Q2=salud, Q3=construcción, Q4=negocios, Q6=investigación
  const q1 = norm(answers[questions[0]?.id] ?? 3);
  const q2 = norm(answers[questions[1]?.id] ?? 3);
  const q4 = norm(answers[questions[3]?.id] ?? 3);
  const q6 = norm(answers[questions[5]?.id] ?? 3);

  // Q31=impacto social, Q32=salud pública, Q35=desigualdad
  const q31 = norm(answers[questions[30]?.id] ?? 3);
  const q32 = norm(answers[questions[31]?.id] ?? 3);
  const q35 = norm(answers[questions[34]?.id] ?? 3);

  return {
    tecnologico: Math.round(q1 * 0.4 + q11 * 0.3 + q12 * 0.3),
    cientifico: Math.round(q6 * 0.3 + q11 * 0.3 + q12 * 0.2 + q13 * 0.2),
    salud: Math.round(q2 * 0.4 + q14 * 0.3 + q32 * 0.3),
    administrativo: Math.round(q4 * 0.5 + q15 * 0.3 + q31 * 0.2),
    social: Math.round(q31 * 0.4 + q35 * 0.3 + q15 * 0.3),
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
    career.profesion.empleabilidad > 1
      ? career.profesion.empleabilidad
      : career.profesion.empleabilidad * 100;
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
  const pasion = scorePilar("PASION", answers, questions);
  const vocacion = scorePilar("VOCACION", answers, questions);
  const profesion = scorePilar("PROFESION", answers, questions);
  const mision = scorePilar("MISION", answers, questions);

  const scores: IkigaiScores = { pasion, vocacion, profesion, mision };
  const scoreGlobal = calcularIkigaiScore(scores);
  const zonaIkigai = identificarZona(scores);
  const profile = calcularPerfil(answers, questions);

  const resultadosCompletos: CareerResult[] = CAREERS.map((career) => {
    const compatibility = calcularCompatibilidad(
      career,
      scores,
      answers,
      questions,
    );

    // Scores por pilar específicos de esta carrera
    // No son los scores globales del usuario — son qué tan bien encaja
    // el usuario en cada dimensión Ikigai DE ESA CARRERA
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
