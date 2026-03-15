import "dotenv/config";
import prisma from "../../src/lib/prisma";

async function seedTags() {
  await prisma.postTag.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.tagCategory.deleteMany();

  await prisma.tagCategory.create({
    data: {
      name: "Experiencias",
      color: "#6366f1",
      tags: {
        create: [
          { name: "Mi historia" },
          { name: "Consejo" },
          { name: "Reflexión" },
        ],
      },
    },
  });
  await prisma.tagCategory.create({
    data: {
      name: "Académico",
      color: "#0ea5e9",
      tags: {
        create: [
          { name: "Tarea" },
          { name: "Proyecto" },
          { name: "Examen" },
          { name: "Beca" },
        ],
      },
    },
  });
  await prisma.tagCategory.create({
    data: {
      name: "Carreras",
      color: "#10b981",
      tags: {
        create: [
          { name: "IPN" },
          { name: "Ingeniería" },
          { name: "Ciencias de la salud" },
          { name: "Ciencias sociales" },
          { name: "Administración" },
          { name: "Tecnología" },
        ],
      },
    },
  });
  await prisma.tagCategory.create({
    data: {
      name: "Orientación",
      color: "#f59e0b",
      tags: {
        create: [
          { name: "Duda" },
          { name: "Recomendación" },
          { name: "Recursos" },
        ],
      },
    },
  });
  await prisma.tagCategory.create({
    data: {
      name: "Comunidad",
      color: "#ec4899",
      tags: {
        create: [
          { name: "Evento" },
          { name: "Oportunidad" },
          { name: "Noticias" },
        ],
      },
    },
  });

  console.log("Tags, seeded");
}

seedTags()
  .catch(console.error)
  .finally(() => prisma.$disconnect);
