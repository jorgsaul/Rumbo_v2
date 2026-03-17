import "dotenv/config";
import prisma from "../../src/lib/prisma";

async function seedForums() {
  // Busca un admin para asignar como creador
  const admin = await prisma.user.findFirst({
    where: { role: "ADMIN" },
  });

  if (!admin) {
    console.log("❌ No hay usuario admin — crea uno primero");
    return;
  }

  await prisma.forum.deleteMany();

  const forums = [
    {
      name: "Ingeniería",
      description: "Discusiones sobre carreras de ingeniería en el IPN",
    },
    {
      name: "Ciencias de la Salud",
      description: "Todo sobre medicina, enfermería, nutrición y más",
    },
    {
      name: "Ciencias Sociales",
      description: "Psicología, trabajo social, comunicación y humanidades",
    },
    {
      name: "Ciencias Exactas",
      description: "Matemáticas, física, química y carreras afines",
    },
    {
      name: "Administración y Negocios",
      description: "Contaduría, administración, economía y finanzas",
    },
    {
      name: "Tecnología e Informática",
      description: "Sistemas, cibernética, inteligencia artificial",
    },
    {
      name: "Dudas y Orientación",
      description: "Pregunta lo que quieras sobre tu futuro académico",
    },
    {
      name: "Experiencias Escolares",
      description: "Comparte tu experiencia en el IPN y ayuda a otros",
    },
  ];

  for (const forum of forums) {
    await prisma.forum.create({
      data: {
        name: forum.name,
        description: forum.description,
        createdById: admin.id,
      },
    });
  }

  console.log("✅ Foros seeded");
}

seedForums()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
