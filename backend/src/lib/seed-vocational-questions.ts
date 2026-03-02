import { PrismaClient, IkigaiPilar } from "@prisma/client";
import { questions } from "./data/testData";

const prisma = new PrismaClient();

async function seedVocationalTest() {
  try {
    console.log("🌱 Iniciando seed...");

    // Ver los valores del enum en Prisma
    console.log("Valores del enum IkigaiPilar:", Object.values(IkigaiPilar));

    // Ver los valores de tus preguntas
    const uniquePilars = [...new Set(questions.map((q) => q.pilar))];
    console.log("Pilares en tus datos:", uniquePilars);

    // Ver primera pregunta
    console.log("Primera pregunta:", {
      pilar: questions[0].pilar,
      tipo: typeof questions[0].pilar,
      texto: questions[0].texto,
    });

    // Mapeo explícito
    const pilarMap = {
      PASION: IkigaiPilar.PASION,
      VOCACION: IkigaiPilar.VOCACION,
      PROFESION: IkigaiPilar.PROFESION,
      MISION: IkigaiPilar.MISION,
    };

    // Preparar datos
    const questionsData = questions.map((q, index) => {
      const pilarValue = pilarMap[q.pilar as keyof typeof pilarMap];

      console.log(`Pregunta ${index + 1}: ${q.pilar} -> ${pilarValue}`);

      if (!pilarValue) {
        throw new Error(
          `Pilar inválido: ${q.pilar}. Valores permitidos: ${Object.keys(pilarMap).join(", ")}`,
        );
      }

      return {
        text: q.texto,
        order: q.id,
        pilar: pilarValue,
        statements: {
          palabras_clave: q.palabras_clave || [],
          categoria: q.categoria,
          tipo: q.tipo,
        },
        options: {
          create: [
            { label: "A", text: "Nada", order: 1, isCorrect: false },
            { label: "B", text: "Poco", order: 2, isCorrect: false },
            { label: "C", text: "Regular", order: 3, isCorrect: false },
            { label: "D", text: "Bastante", order: 4, isCorrect: false },
            { label: "E", text: "Mucho", order: 5, isCorrect: false },
          ],
        },
      };
    });

    // Crear test
    const test = await prisma.test.create({
      data: {
        title: "Test de Ikigai - Orientación Vocacional IPN",
        type: "VOCATIONAL",
        status: "ACTIVE",
        estimatedMinutes: 30,
        questions: { create: questionsData },
      },
    });

    console.log("✅ Test creado:", test.id);
  } catch (error) {
    console.error("❌ Error detallado:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedVocationalTest();
