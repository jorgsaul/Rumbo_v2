import prisma from "./prisma";

async function main() {
  await prisma.knowledgeTestResult.deleteMany();
  await prisma.vocalTestResult.deleteMany();
  await prisma.option.deleteMany();
  await prisma.question.deleteMany();
  await prisma.test.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.tagCategory.deleteMany();
  // Crear tags y categorías
  const category = await prisma.tagCategory.create({
    data: {
      name: "General",
      description: "Tags generales",
      color: "#5a1236",
      tags: {
        create: [
          { name: "Mi experiencia" },
          { name: "Pregunta" },
          { name: "Orientación" },
          { name: "Recursos" },
          { name: "Carreras" },
          { name: "Test vocacional" },
        ],
      },
    },
    include: { tags: true },
  });

  // Crear usuario autor
  const author = await prisma.user.create({
    data: {
      username: "carlos_autor",
      fullName: "Carlos Mendoza",
      email: "carlos@rumbo.com",
      password: "hasheado123",
      role: "AUTHOR",
    },
  });

  // Crear posts
  const tag1 = category.tags.find((t) => t.name === "Mi experiencia")!;
  const tag2 = category.tags.find((t) => t.name === "Orientación")!;

  await prisma.post.create({
    data: {
      authorId: author.id,
      title: "Mi camino a ingeniería",
      content:
        "Cuando estaba en preparatoria no sabía qué estudiar, pero después de hacer el test vocacional todo cambió. Les comparto mi experiencia para que no se sientan solos en este proceso.",
      moderation: "APPROVED",
      tags: {
        create: [{ tagId: tag1.id }, { tagId: tag2.id }],
      },
    },
  });

  await prisma.post.create({
    data: {
      authorId: author.id,
      title: "¿Cómo elegir carrera sin morir en el intento?",
      content:
        "Tres preguntas que me hubiera gustado hacerme antes de elegir: ¿Qué se me da bien? ¿Qué me apasiona? ¿Qué necesita el mundo? Si respondes las tres, el resto se acomoda.",
      moderation: "APPROVED",
      tags: {
        create: [{ tagId: tag2.id }],
      },
    },
  });

  const testsData = [
    {
      title: "Habilidades Matemáticas",
      preguntas: [
        {
          pregunta: "Relaciona cada enunciado con su expresión algebraica:",
          tabla: {
            columnas: ["Enunciado", "Expresión"],
            filas: [
              [
                "1. El cuadrado de la mitad de un número",
                "A. $\\frac{m^2}{2}$",
              ],
              ["2. La mitad del cuadrado de un número", "B. $(2m)^2$"],
              ["3. El doble del cuadrado de un número", "C. $2m^2$"],
              [
                "4. El cuadrado del doble de un número",
                "D. $(\\frac{m}{2})^2$",
              ],
            ],
          },
          opciones: {
            a: "1A, 2D, 3C, 4B",
            b: "1D, 2A, 3B, 4C",
            c: "1A, 2D, 3B, 4C",
            d: "1D, 2A, 3C, 4B",
          },
          respuesta_correcta: "d",
        },
        {
          pregunta:
            "Identifica cuáles de los siguientes enunciados sobre desigualdades son verdaderos:",
          enunciados: [
            "1. Si $x < y$ y $y < z$, entonces $x < z$",
            "2. Si $a < b$, entonces $a - c < b - c$",
            "3. Si $a > 0$ y $b < 0$, entonces $ab < 0$",
            "4. Si $x < y$ y $c < 0$, entonces $xc < yc$",
          ],
          opciones: { a: "1, 2", b: "2, 4", c: "1, 2, 3", d: "2, 3, 4" },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "Selecciona el orden correcto de los resultados de los siguientes logaritmos:",
          enunciados: [
            "1. $\\log_4 24 - \\log_4 6 + \\log_4 1$",
            "2. $\\frac{1}{2}\\log_3 81 + \\log_{10} 100$",
            "3. $\\log_2 48 - \\log_2 3 \\times (\\log_2 8)^{-1}$",
            "4. $\\log_{\\frac{1}{3}} \\frac{1}{27}$",
          ],
          opciones: {
            a: "1, 3, 2, 4",
            b: "3, 1, 4, 2",
            c: "1, 4, 3, 2",
            d: "4, 2, 1, 3",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "El ángulo $\\theta$ pertenece al __________ cuadrante, si $\\cos\\theta < 0$ y $\\tan\\theta > 0$.",
          opciones: { a: "primer", b: "segundo", c: "tercero", d: "cuarto" },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "La condición necesaria y suficiente para que dos rectas, con pendientes $m_1$ y $m_2$ definidas, sean paralelas entre sí es que _______________ de sus pendientes sea igual a cero.",
          opciones: {
            a: "la suma",
            b: "el producto",
            c: "la diferencia",
            d: "el cociente",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "Una parábola con vértice en el origen pasa por el punto $(1, -3)$ y su eje coincide con el eje $x$. ¿Cuál es la ecuación de la parábola?",
          opciones: {
            a: "$3y^2 + x = 0$",
            b: "$3y^2 - x = 0$",
            c: "$3x^2 + y = 0$",
            d: "$3x^2 - y = 0$",
          },
          respuesta_correcta: "a",
        },
        {
          pregunta:
            "Calcular el valor del límite: $\\lim_{x \\to 0}\\frac{\\tan(\\pi\\sin^2(x))}{x^2}$",
          opciones: { a: "0", b: "1", c: "$\\pi$", d: "$2\\pi$" },
          respuesta_correcta: "c",
        },
        {
          pregunta: "Derivar la siguiente función: $Y = \\arccos(3x^2)$",
          opciones: {
            a: "$y' = \\frac{-6x}{\\sqrt{1-9x^4}}$",
            b: "$y' = \\frac{6x}{\\sqrt{1-9x^4}}$",
            c: "$y' = -\\frac{1}{\\sqrt{1-9x^4}}$",
            d: "$y' = \\frac{3x}{\\sqrt{1-9x^4}}$",
          },
          respuesta_correcta: "a",
        },
        {
          pregunta:
            "Resuelve la siguiente integral indefinida: $\\int \\frac{dx}{x^2-1}$",
          opciones: {
            a: "$\\frac{1}{2}\\ln|x-1| - \\frac{1}{2}\\ln|x+1| + C$",
            b: "$\\frac{1}{2}\\ln|x+1| - \\frac{1}{2}\\ln|x-1| + C$",
            c: "$\\frac{1}{2}\\ln|x+1| + C$",
            d: "$\\frac{1}{2}\\ln\\left|\\frac{x-1}{x+1}\\right| + C$",
          },
          respuesta_correcta: "d",
        },
        {
          pregunta:
            "E y F son dos eventos independientes con probabilidades $P(E)=\\frac{1}{4}$ y $P(F)=\\frac{1}{5}$. Identificar cuál de los siguientes resultados es verdadero.",
          opciones: {
            a: "$P(E \\cap F)=\\frac{1}{20}$",
            b: "$P(F|E)=\\frac{1}{4}$",
            c: "$P(E^e)=\\frac{1}{5}$",
            d: "$P(E \\cup F)=\\frac{9}{20}$",
          },
          respuesta_correcta: "a",
        },
        {
          pregunta:
            "Una fuente de luz genera una intensidad $I$ a una distancia $d$. Si se mide la intensidad lumínica a la distancia $4d$, la nueva intensidad en términos de $I$ es:",
          opciones: { a: "$I/16$", b: "$I/4$", c: "$4I$", d: "$16I$" },
          respuesta_correcta: "a",
        },
        {
          pregunta:
            "Se suelta una pelota desde una altura de 20 m. ¿Cuánto tiempo tarda en caer al suelo? ($g = 10$ m/s²)",
          opciones: { a: "1.5 s", b: "2.0 s", c: "3.0 s", d: "4.0 s" },
          respuesta_correcta: "b",
        },
        {
          pregunta:
            "Relacionar el concepto de la física con la expresión matemática que lo representa:",
          tabla: {
            columnas: ["Concepto", "Expresión matemática"],
            filas: [
              ["1. Ley de Gravitación Universal", "A. $V = IR$"],
              ["2. Fuerza centrípeta", "B. $F = G\\frac{m_1 m_2}{r^2}$"],
              ["3. Segunda Ley de Newton", "C. $F = ma$"],
              ["4. Ley de Ohm", "D. $F = m\\frac{v^2}{r}$"],
            ],
          },
          opciones: {
            a: "1B, 2D, 3C, 4A",
            b: "1A, 2C, 3D, 4B",
            c: "1C, 2A, 3B, 4D",
            d: "1D, 2B, 3A, 4C",
          },
          respuesta_correcta: "a",
        },
        {
          pregunta: "Relacionar el concepto de ondas con su definición:",
          tabla: {
            columnas: ["Concepto", "Definición"],
            filas: [
              [
                "1. Refracción",
                "A. La propiedad de una onda de rodear obstáculos y desviarse después de pasar por una abertura.",
              ],
              [
                "2. Reflexión",
                "B. El fenómeno que ocurre cuando una onda cambia de dirección y velocidad al pasar de un medio a otro.",
              ],
              [
                "3. Difracción",
                "C. La magnitud de la energía que transporta una onda luminosa por unidad de área y por unidad de tiempo.",
              ],
              [
                "4. Intensidad lumínica",
                "D. El cambio de dirección de una onda que, al incidir sobre la superficie de separación de dos medios, regresa al medio inicial.",
              ],
            ],
          },
          opciones: {
            a: "1A, 2B, 3D, 4C",
            b: "1B, 2D, 3A, 4C",
            c: "1C, 2A, 3B, 4D",
            d: "1D, 2C, 3A, 4B",
          },
          respuesta_correcta: "b",
        },
        {
          pregunta:
            "Identificar el coeficiente de expansión volumétrica ($\\beta$) de un gas ideal si se expande de acuerdo a la expresión $\\frac{P}{T^2} =$ constante.",
          opciones: { a: "$1/T$", b: "$2/T$", c: "$3/T$", d: "$4/T$" },
          respuesta_correcta: "c",
        },
      ],
    },
    {
      title: "Habilidades Médico-Biológicas",
      preguntas: [
        {
          pregunta:
            "Relacionar las leyes de la Herencia de Mendel con su descripción:",
          tabla: {
            columnas: ["Ley de Mendel", "Postulado"],
            filas: [
              [
                "1. Ley de la uniformidad",
                "A. Establece que los caracteres se heredan de forma independiente unos de otros, y que los alelos para diferentes rasgos se segregan de manera independiente.",
              ],
              [
                "2. Ley de la segregación",
                "B. Postula que, al cruzar dos razas puras, la primera generación filial (F1) estará compuesta por individuos idénticos entre sí.",
              ],
              [
                "3. Ley de la segregación independiente",
                "C. Indica que los dos alelos de un gen (uno materno y otro paterno) deben separarse (segregar) durante la formación de gametos.",
              ],
            ],
          },
          opciones: {
            a: "1A, 2B, 3C",
            b: "1B, 2C, 3A",
            c: "1C, 2A, 3B",
            d: "1A, 2C, 3B",
          },
          respuesta_correcta: "b",
        },
        {
          pregunta: "Relacionar el organelo celular con su función principal:",
          tabla: {
            columnas: ["Organelo", "Función"],
            filas: [
              [
                "1. Mitocondria",
                "A. Síntesis de proteínas a partir de la información genética.",
              ],
              [
                "2. Ribosoma",
                "B. Encargada de dirigir la división celular y contener el material genético (ADN).",
              ],
              [
                "3. Núcleo",
                "C. Producción de energía (ATP) mediante la respiración celular.",
              ],
              [
                "4. Membrana celular",
                "D. Regula el paso de sustancias hacia el interior y exterior de la célula.",
              ],
            ],
          },
          opciones: {
            a: "1A, 2B, 3C, 4D",
            b: "1B, 2C, 3D, 4A",
            c: "1C, 2A, 3B, 4D",
            d: "1D, 2A, 3C, 4B",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "Seleccionar la biomolécula que es la principal fuente de energía inmediata para las células del cuerpo.",
          opciones: {
            a: "Grasas",
            b: "Proteínas",
            c: "Vitaminas",
            d: "Carbohidratos",
          },
          respuesta_correcta: "d",
        },
        {
          pregunta:
            "¿Qué sucede con la imagen observada a través del microscopio óptico compuesto cuando se pasa de usar el objetivo de 10X al objetivo de 40X?",
          opciones: {
            a: "La imagen se ve más borrosa, pero la profundidad de campo aumenta.",
            b: "El campo visual se hace más grande y brillante.",
            c: "La imagen se ve invertida y se requiere ajustar el enfoque fino.",
            d: "El campo visual se reduce y la imagen se ve menos brillante.",
          },
          respuesta_correcta: "d",
        },
        {
          pregunta:
            "Identificar la principal vía metabólica que ocurre en el citoplasma y que es común tanto a la respiración aeróbica como a la anaeróbica.",
          opciones: {
            a: "Fermentación",
            b: "Glucólisis",
            c: "Ciclo de Krebs",
            d: "Cadena de transporte de electrones",
          },
          respuesta_correcta: "b",
        },
        {
          pregunta:
            "Identificar el síndrome que está relacionado con una trisomía de los cromosomas sexuales, específicamente el cariotipo XXY.",
          opciones: { a: "Patau", b: "Turner", c: "Down", d: "Klinefelter" },
          respuesta_correcta: "d",
        },
        {
          pregunta:
            "Ordenar de principio a fin los pasos clave del proceso de síntesis de proteínas en una célula eucariota:",
          tabla: {
            columnas: ["Paso", "Proceso"],
            filas: [
              ["1", "Traducción del ARNm a proteína en los ribosomas"],
              [
                "2",
                "Maduración del ARNm (eliminación de intrones y empalme de exones)",
              ],
              ["3", "Transcripción del ADN a ARNm en el núcleo"],
              [
                "4",
                "Plegamiento y modificación postraduccional de la proteína",
              ],
              ["5", "El ARNm maduro sale del núcleo hacia el citoplasma"],
            ],
          },
          opciones: {
            a: "3, 2, 5, 1, 4",
            b: "2, 3, 5, 1, 4",
            c: "3, 5, 2, 1, 4",
            d: "1, 3, 2, 5, 4",
          },
          respuesta_correcta: "a",
        },
        {
          pregunta:
            "Relacionar la hormona con su función fisiológica principal:",
          tabla: {
            columnas: ["Hormona", "Función"],
            filas: [
              [
                "1. Adrenalina",
                "A. Regula el metabolismo basal, el crecimiento y la temperatura corporal",
              ],
              [
                "2. Melatonina",
                "B. Actúa como neurotransmisor y hormona, preparando al cuerpo para la respuesta de 'lucha o huida'",
              ],
              [
                "3. Prolactina",
                "C. Sincroniza el ciclo circadiano (ritmo de sueño-vigilia)",
              ],
              [
                "4. Testosterona",
                "D. Estimula la producción de leche en las glándulas mamarias",
              ],
            ],
          },
          opciones: {
            a: "1B, 2C, 3D, 4A",
            b: "1A, 2C, 3B, 4D",
            c: "1B, 2D, 3C, 4A",
            d: "1D, 2C, 3B, 4A",
          },
          respuesta_correcta: "a",
        },
        {
          pregunta:
            "Determinar el porcentaje en peso de Azufre ($\\text{S}$) presente en un mol de Sulfato de Aluminio (Al = 27.0, S = 32.1, O = 16.0)",
          opciones: { a: "15.8%", b: "28.1%", c: "47.0%", d: "34.5%" },
          respuesta_correcta: "b",
        },
        {
          pregunta:
            "Determinar la máxima cantidad de electrones que puede albergar el subnivel d",
          opciones: { a: "2", b: "6", c: "8", d: "10" },
          respuesta_correcta: "d",
        },
        {
          pregunta:
            "Relacionar el elemento con la familia a la que pertenece en la tabla periódica:",
          tabla: {
            columnas: ["Familia", "Elemento"],
            filas: [
              ["1. Metales alcalinotérreos", "A. Br"],
              ["2. Halógenos", "B. Se"],
              ["3. Metales de transición", "C. Au"],
              ["4. No Metales", "D. Mg"],
            ],
          },
          opciones: {
            a: "1D, 2A, 3C, 4B",
            b: "1B, 2C, 3D, 4A",
            c: "1A, 2B, 3C, 4D",
            d: "1D, 2C, 3A, 4B",
          },
          respuesta_correcta: "a",
        },
        {
          pregunta:
            "Seleccionar el nombre del radical alquilo representado por la siguiente estructura:",
          imagen_secuencia: "cadena.png",
          opciones: {
            a: "n-Butil",
            b: "Secpropil",
            c: "Isobutil",
            d: "Secbutil",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "Identificar la ecuación general que representa una reacción de doble desplazamiento (o metátesis).",
          opciones: {
            a: "A + B → AB",
            b: "AB → A + B",
            c: "A + BC → AC + B",
            d: "AB + CD → AD + CB",
          },
          respuesta_correcta: "d",
        },
        {
          pregunta:
            "Determinar cuál de las siguientes sustancias tiene el pH más ácido (el más bajo), basándose en su valor de pOH.",
          tabla: {
            columnas: ["Sustancia", "pOH"],
            filas: [
              ["a) Leche", "7.8"],
              ["b) Jugo de tomate", "10.1"],
              ["c) Blanqueador doméstico", "1.5"],
              ["d) Amoníaco", "3.3"],
            ],
          },
          opciones: {
            a: "Leche",
            b: "Jugo de tomate",
            c: "Blanqueador doméstico",
            d: "Amoníaco",
          },
          respuesta_correcta: "b",
        },
        {
          pregunta:
            "Sistema termodinámico que solo permite el intercambio de energía pero no de materia con su entorno es:",
          opciones: { a: "cerrado", b: "abierto", c: "aislado", d: "mixto" },
          respuesta_correcta: "a",
        },
      ],
    },
    {
      title: "Ingeniería y Tecnología",
      preguntas: [
        {
          pregunta:
            "¿Cuál de las siguientes opciones describe la característica esencial y fundamental de un algoritmo?",
          opciones: {
            a: "Un dispositivo físico que almacena grandes cantidades de datos no estructurados",
            b: "Una secuencia finita y ordenada de pasos o instrucciones para resolver un problema específico",
            c: "Un tipo de lenguaje de programación diseñado exclusivamente para la inteligencia artificial",
            d: "La capacidad de una computadora para ejecutar múltiples tareas al mismo tiempo",
          },
          respuesta_correcta: "b",
        },
        {
          pregunta:
            "Relaciona el tipo de dato fundamental en tecnología con su uso o característica principal:",
          tabla: {
            columnas: ["Tipo de Dato", "Uso o Característica Principal"],
            filas: [
              [
                "1. Integer (Entero)",
                "A. Se utiliza para representar números con decimales (ej: 3.14159)",
              ],
              [
                "2. Boolean (Booleano)",
                "B. Se utiliza para representar texto o secuencias de caracteres alfanuméricos",
              ],
              [
                "3. String (Cadena)",
                "C. Se utiliza para representar solo dos valores posibles: verdadero (True) o falso (False)",
              ],
              [
                "4. Float (Flotante)",
                "D. Se utiliza para representar números sin componentes fraccionarios o decimales (ej: 5, -100, 0)",
              ],
            ],
          },
          opciones: {
            a: "1-A, 2-B, 3-C, 4-D",
            b: "1-D, 2-C, 3-B, 4-A",
            c: "1-C, 2-D, 3-A, 4-B",
            d: "1-D, 2-A, 3-B, 4-C",
          },
          respuesta_correcta: "b",
        },
        {
          pregunta:
            "C1 presenta la misma corriente a través de cada resistencia. C2 presenta el mismo voltaje. C3 combina ambas. ¿Cuáles son los tipos de circuitos C1, C2 y C3?",
          opciones: {
            a: "C1: Paralelo, C2: Serie, C3: Mixto",
            b: "C1: Mixto, C2: Serie, C3: Paralelo",
            c: "C1: Serie, C2: Paralelo, C3: Mixto",
            d: "C1: Paralelo, C2: Mixto, C3: Serie",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "¿Cuál de los siguientes dispositivos convierte predominantemente la energía lumínica en energía eléctrica mediante el efecto fotovoltaico?",
          opciones: {
            a: "Un motor de corriente continua (DC)",
            b: "Una batería recargable de iones de litio",
            c: "Un panel solar fotovoltaico",
            d: "Un generador eólico",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "¿Qué componente de una computadora es responsable de realizar la mayoría de las operaciones lógicas, de cálculo y de control?",
          opciones: {
            a: "El Disco Duro (HDD/SSD)",
            b: "La Memoria RAM",
            c: "La Unidad Central de Procesamiento (CPU)",
            d: "La Tarjeta Madre (Motherboard)",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta: "¿Qué son las normas ISO?",
          opciones: {
            a: "Documentos legales obligatorios creados por la OMC",
            b: "Guías técnicas y estándares de gestión de aplicación voluntaria, desarrollados por la Organización Internacional de Normalización",
            c: "Un conjunto de protocolos de comunicación diseñados exclusivamente por la IEEE",
            d: "Regulaciones emitidas por agencias nacionales para proteger el mercado interno",
          },
          respuesta_correcta: "b",
        },
        {
          pregunta:
            "¿Cuál es el resultado de la expresión lógica ¬P ∧ (Q ∨ P) si P es Falso y Q es Verdadero?",
          opciones: {
            a: "Verdadero (V)",
            b: "Falso (F)",
            c: "El resultado es Indeterminado",
            d: "Depende de una tercera variable",
          },
          respuesta_correcta: "a",
        },
        {
          pregunta:
            "Un transformador ideal eleva el voltaje de 120 V a 480 V. Si la corriente secundaria es de 5A, ¿cuál es la corriente primaria?",
          opciones: { a: "5 A", b: "10 A", c: "20 A", d: "40 A" },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "Si N=5, Resultado=0, y el bucle ejecuta Resultado=Resultado+N, N=N-2 mientras N>0, ¿cuál es el valor final de Resultado?",
          opciones: { a: "5", b: "7", c: "9", d: "15" },
          respuesta_correcta: "c",
        },
        {
          pregunta: "Encuentra el número que falta en el siguiente patrón:",
          tabla: {
            columnas: ["Columna 1", "Columna 2", "Columna 3"],
            filas: [
              ["7", "11", "4"],
              ["15", "24", "9"],
              ["31", "?", "15"],
            ],
          },
          opciones: { a: "46", b: "47", c: "53", d: "35" },
          respuesta_correcta: "a",
        },
        {
          pregunta: "¿Qué figura complementa la secuencia?",
          imagen_secuencia: "secuencia.png",
          opciones_imagenes: {
            a: "opcion_a.png",
            b: "opcion_b.png",
            c: "opcion_c.png",
            d: "opcion_d.png",
          },
          respuesta_correcta: "b",
        },
        {
          pregunta:
            "¿Cuál es el enunciado fundamental de la Primera Ley de la Termodinámica?",
          opciones: {
            a: "El calor no puede fluir espontáneamente de un cuerpo frío a uno caliente",
            b: "La energía interna se mantiene constante ya que Q y W son iguales en magnitud pero de signo contrario",
            c: "La energía no se crea ni se destruye; el cambio en la energía interna (ΔU) es igual a Q - W",
            d: "La entropía de un sistema aislado siempre aumenta en los procesos irreversibles",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "Ana fue al Museo un día después que Carlos. Beto no fue al Cine y asistió antes que la persona del Taller. Diana fue al Parque y no fue la última. ¿Quién fue el último y con qué actividad?",
          opciones: {
            a: "Carlos, y fue al Cine",
            b: "Ana, y fue al Taller",
            c: "Diana, y fue al Parque",
            d: "Beto, y fue al Museo",
          },
          respuesta_correcta: "b",
        },
        {
          pregunta:
            "En una encuesta a 100 estudiantes: 45 Python, 40 Java, 35 C++, 10 los tres, 5 ninguno, 15 exactamente Python y Java, 12 exactamente Java y C++. ¿Cuántos manejan solamente C++?",
          opciones: { a: "12", b: "13", c: "15", d: "18" },
          respuesta_correcta: "b",
        },
        {
          pregunta:
            "¿Cuál es la secuencia más eficiente para liberar espacio eliminando archivos grandes en Windows/macOS?",
          opciones: {
            a: "Arrastrar a Papelera y luego desfragmentar el disco",
            b: "Enviar a Papelera y luego vaciarla",
            c: "Ejecutar Restaurar Sistema a un punto anterior",
            d: "Finalizar el proceso del explorador en el Administrador de Tareas",
          },
          respuesta_correcta: "b",
        },
      ],
    },
    {
      title: "Ciencias Sociales y Humanidades",
      preguntas: [
        {
          pregunta:
            'Selecciona la afirmación congruente con los elementos del enunciado:\n"La mayoría de los atletas mexicanos, después de la competencia, regresó triunfante a su país."',
          opciones: {
            a: "Presenta un error de concordancia entre el sujeto y el verbo",
            b: "Contiene una doble negación que lo hace incoherente",
            c: "Presenta concordancia entre todos los elementos gramaticales",
            d: "Integra un pronombre personal incorrecto en la oración",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "Completa la oración con las palabras correctas:\nEl astrónomo observó el cielo con un telescopio __________ y una linterna de pilas __________, a pesar de las __________ nubes y los vientos __________.",
          opciones: {
            a: "excelente - agotadas - abundantes - feroces",
            b: "excelentes - agotadas - abundantes - feroz",
            c: "excelente - agotada - abundantes - feroces",
            d: "excelente - agotada - abundante - feroces",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "Completa la oración con las palabras opuestas a 'superfluos':\nLos comentarios eran superfluos, pues el mensaje era en realidad __________, la actuación fue __________ y la producción, __________ en todos sus aspectos.",
          opciones: {
            a: "banal - mala - escasa",
            b: "fundamental - inmejorable - abundante",
            c: "esencial - excelente - abundante",
            d: "trivial - mediocre - excesiva",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "Identifica el elemento del reporte final de investigación donde el autor expone de manera sintética el objetivo, la metodología, los resultados y las conclusiones.",
          opciones: {
            a: "Índice",
            b: "Marco Teórico",
            c: "Resumen (Abstract)",
            d: "Apéndices",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "¿Cuál fue la causa principal que llevó a la Revolución Mexicana de 1910?",
          opciones: {
            a: "La expropiación petrolera y la disputa con Estados Unidos",
            b: "La imposición de una monarquía por fuerzas extranjeras",
            c: "La crisis económica mundial de 1907",
            d: "La prolongada dictadura de Porfirio Díaz, la falta de democracia y la profunda desigualdad social",
          },
          respuesta_correcta: "d",
        },
        {
          pregunta:
            "Filósofo griego que usaba la mayéutica y la ironía para que sus interlocutores alcanzaran la verdad por sí mismos:",
          opciones: {
            a: "Platón",
            b: "Aristóteles",
            c: "Sócrates",
            d: "Parménides",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            'Identifica el tipo de falacia:\n"No podemos confiar en las conclusiones de la bióloga porque ella es una ecologista radical que solo busca dañar a las empresas petroleras."',
          opciones: {
            a: "Ad Baculum (Apelación a la fuerza)",
            b: "Ad Populum (Apelación al pueblo)",
            c: "Ad Hominem (Ataque personal)",
            d: "Ad Misericordiam (Apelación a la piedad)",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "El principio de Kant que establece que una acción es moralmente correcta si su máxima puede universalizarse sin contradicción se llama:",
          opciones: {
            a: "El imperativo hipotético",
            b: "El principio de utilidad",
            c: "El imperativo categórico",
            d: "La voluntad de poder",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "Si un texto tiene como objetivo influir en las decisiones del receptor (anuncio publicitario), su principal intención comunicativa es:",
          opciones: {
            a: "Referencial o informativa",
            b: "Poética o estética",
            c: "Apelativa o conativa",
            d: "Metalingüística",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "¿Cuál de los siguientes elementos del proceso de comunicación se define como el sistema de signos que el emisor y el receptor deben compartir?",
          opciones: { a: "Canal", b: "Contexto", c: "Mensaje", d: "Código" },
          respuesta_correcta: "d",
        },
        {
          pregunta:
            "El concepto de 'alienación' (Hegel y Marx) se refiere a la condición en que:",
          opciones: {
            a: "Un individuo establece relaciones con personas extranjeras",
            b: "Se logra la completa libertad individual",
            c: "El sujeto se siente extraño a su esencia, al producto de su trabajo o a la sociedad en la que vive",
            d: "El gobierno aplica leyes para mantener el orden social",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "El 'Mundo de las Ideas' de Platón intenta explicar la existencia de:",
          opciones: {
            a: "La perfección artística que solo se logra a través de la técnica",
            b: "El conocimiento obtenido únicamente mediante la experiencia sensorial",
            c: "Esencias inmutables, perfectas y eternas que son la causa de las cosas sensibles y materiales",
            d: "La realidad práctica y política de una sociedad ideal",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "¿Cuál es la función principal de una evaluación diagnóstica aplicada al inicio de un ciclo escolar?",
          opciones: {
            a: "Determinar la calificación final del estudiante",
            b: "Certificar si el estudiante ha logrado los aprendizajes esperados",
            c: "Identificar los conocimientos previos y posibles lagunas del estudiante para adaptar la enseñanza",
            d: "Calificar la eficacia del docente",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "La estratificación social se refiere al sistema por el cual la sociedad clasifica a las personas basándose principalmente en:",
          opciones: {
            a: "Diferencias biológicas o geográficas",
            b: "Coeficientes intelectuales",
            c: "La distribución desigual de recursos, poder y prestigio",
            d: "La afinidad religiosa o política",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta: "La sociología puede ser definida como:",
          opciones: {
            a: "La disciplina que estudia cómo los individuos ajustan sus esquemas mentales",
            b: "El estudio de la acción social y la distinción entre acción racional y emocional",
            c: "La ciencia social que estudia sistemáticamente la vida social humana, los grupos y las sociedades",
            d: "La tendencia a juzgar otras culturas con base en los estándares de la propia sociedad",
          },
          respuesta_correcta: "c",
        },
      ],
    },
    {
      title: "Arte y Diseño",
      preguntas: [
        {
          pregunta:
            "A diferencia del Neoclasicismo, ¿cuál característica define mejor el movimiento Romántico en la pintura?",
          opciones: {
            a: "El interés en la vida cotidiana y la luz instantánea.",
            b: "La búsqueda de la armonía y la proporción clásica.",
            c: "La exaltación del sentimiento, la emoción, la naturaleza salvaje y lo irracional.",
            d: "La estricta aplicación del color puro directamente sobre el lienzo.",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "En la escultura griega clásica, la creación del 'canon' de Policleto se orientó principalmente a:",
          opciones: {
            a: "La representación del dolor y el sufrimiento humano.",
            b: "Establecer reglas matemáticas de proporción y simetría para alcanzar el ideal de belleza.",
            c: "Crear figuras distorsionadas para generar impacto emocional.",
            d: "Representar la vida cotidiana y los defectos humanos sin idealización.",
          },
          respuesta_correcta: "b",
        },
        {
          pregunta:
            "¿Cuál es la función principal de la Sombra Proyectada en el modelado de un objeto mediante el claroscuro?",
          opciones: {
            a: "Definir la forma tridimensional del objeto en sí mismo (Sombra propia).",
            b: "Anclar el objeto a la superficie, indicando su posición espacial y la dirección de la fuente de luz.",
            c: "Mostrar la intensidad de la luz reflejada sobre la superficie del objeto (Brillo).",
            d: "Separar el objeto del fondo mediante una línea de contorno oscura.",
          },
          respuesta_correcta: "b",
        },
        {
          pregunta:
            "Para que un objeto parezca estar más cerca y tenga mayor volumen, ¿qué combinación de valores es más efectiva?",
          opciones: {
            a: "Usar tonos medios uniformes y evitar el contraste.",
            b: "Usar solo valores claros y luminosos.",
            c: "Aumentar el contraste entre los valores más oscuros (sombras) y los más claros (luces y brillos).",
            d: "Reducir la escala de valores únicamente a los grises intermedios.",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "¿Cuál es la manera más efectiva de aplicar el ritmo visual progresivo en un mural con aves volando?",
          opciones: {
            a: "Dibujar todas las aves del mismo tamaño y color.",
            b: "Dibujar tres aves en la esquina superior izquierda.",
            c: "Dibujar las aves de forma que gradualmente se hagan más pequeñas hacia el fondo.",
            d: "Usar solo colores complementarios sin relación de tamaño.",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "Según la Regla de los Tercios, ¿dónde debería ubicarse idealmente el elemento principal de una fotografía?",
          opciones: {
            a: "Justo en el centro geométrico del encuadre.",
            b: "A lo largo de los bordes del marco.",
            c: "Sobre una de las cuatro intersecciones de las líneas que dividen el encuadre en nueve partes iguales.",
            d: "En la zona de sombra proyectada.",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "Una pintura abstracta con colores análogos (rojo, naranja, amarillo) y formas redondeadas busca transmitir:",
          opciones: {
            a: "Conflicto, tensión y dramatismo.",
            b: "Caos, desorden y desequilibrio.",
            c: "Frialdad, melancolía y quietud.",
            d: "Calidez, tranquilidad y unidad visual.",
          },
          respuesta_correcta: "d",
        },
        {
          pregunta:
            "Para crear un modelo 3D de figura orgánica con superficies curvas y lisas, ¿qué software es más adecuado?",
          opciones: {
            a: "Adobe Illustrator (vectores).",
            b: "Adobe Photoshop (rasterizado).",
            c: "Software de escultura digital como ZBrush o Blender.",
            d: "Una hoja de cálculo.",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "Para unir piezas de arcilla firmemente antes de cocerlas, ¿qué dos pasos son críticos?",
          opciones: {
            a: "Humedecer la pieza y aplicar barniz de sellado.",
            b: "Secar completamente ambas piezas y unirlas por presión.",
            c: "Hacer un rayado en las zonas de unión y usar arcilla líquida como 'pegamento'.",
            d: "Aplicar silicona industrial y esperar 24 horas.",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "Al diseñar un logotipo, ¿cuál es el beneficio primario de integrar creativamente el espacio negativo?",
          opciones: {
            a: "Lograr que el logotipo se vea más pequeño.",
            b: "Reducir los costos de producción.",
            c: "Crear una forma oculta o un segundo significado visual, añadiendo profundidad e ingenio.",
            d: "Aumentar la cantidad de líneas de contorno en la figura principal.",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "Para inyectar innovación en una propuesta visual convencional, el diseñador debería:",
          opciones: {
            a: "Mantener la propuesta original por ser segura.",
            b: "Consultar con más personas para validarla.",
            c: "Explorar deliberadamente soluciones que mezclen estéticas opuestas o subviertan la función esperada.",
            d: "Aumentar la saturación de los colores.",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta: "Relaciona cada obra literaria con su autor:",
          tabla: {
            columnas: ["Obra", "Autor"],
            filas: [
              ["1. El Principito", "A. George Orwell"],
              ["2. 1984", "B. J.R.R. Tolkien"],
              ["3. Cien años de soledad", "C. Antoine de Saint-Exupéry"],
              ["4. El Señor de los Anillos", "D. Gabriel García Márquez"],
            ],
          },
          opciones: {
            a: "1-B, 2-C, 3-D, 4-A",
            b: "1-A, 2-D, 3-C, 4-B",
            c: "1-D, 2-C, 3-B, 4-A",
            d: "1-C, 2-A, 3-D, 4-B",
          },
          respuesta_correcta: "d",
        },
        {
          pregunta:
            "¿Cuál define más completamente el concepto de Patrimonio Cultural según la UNESCO?",
          opciones: {
            a: "Todos los objetos de arte moderno que se encuentran en museos.",
            b: "Los monumentos históricos y sitios arqueológicos protegidos por el gobierno.",
            c: "El conjunto de bienes materiales e inmateriales, heredados del pasado, que una comunidad reconoce como propios y valiosos.",
            d: "Únicamente las costumbres ancestrales, los idiomas y las tradiciones populares.",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta: "¿Cuál es la lista correcta de las 7 Bellas Artes?",
          opciones: {
            a: "Literatura, Pintura, Fotografía, Moda, Arquitectura, Danza y Cine.",
            b: "Arquitectura, Escultura, Pintura, Música, Literatura, Danza y Cine.",
            c: "Artesanía, Dibujo, Diseño Gráfico, Poesía, Teatro, Cine y Escultura.",
            d: "Gastronomía, Música, Pintura, Escultura, Danza, Literatura y Teatro.",
          },
          respuesta_correcta: "b",
        },
        {
          pregunta:
            "¿Cuál describe mejor el concepto de Diseño en la creatividad aplicada?",
          opciones: {
            a: "El proceso de dibujar o bocetar ideas antes de ejecutarlas.",
            b: "La producción de objetos visualmente atractivos, independientemente de su función.",
            c: "Una disciplina que busca solucionar problemas específicos mediante la concepción, planificación y creación.",
            d: "La mera decoración o el embellecimiento de un producto o espacio ya existente.",
          },
          respuesta_correcta: "c",
        },
      ],
    },
    {
      title: "Ciencias Económico-Administrativas",
      preguntas: [
        {
          pregunta:
            "La principal diferencia conceptual entre el interés simple y el interés compuesto radica en:",
          opciones: {
            a: "El interés simple solo se aplica a préstamos, y el compuesto solo a inversiones.",
            b: "El interés compuesto utiliza una tasa nominal, mientras que el simple utiliza una tasa efectiva.",
            c: "El interés compuesto capitaliza los intereses ganados al principal en cada periodo, mientras que el simple no lo hace.",
            d: "El interés simple se calcula sobre el valor futuro, y el compuesto sobre el valor presente.",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "Un contador invierte $10,000 USD al 8% anual con capitalización semestral. ¿Cuál será el valor futuro aproximado después de 5 años?",
          opciones: {
            a: "$14,000.00",
            b: "$14,693.28",
            c: "$14,802.44",
            d: "$15,106.87",
          },
          respuesta_correcta: "b",
        },
        {
          pregunta:
            "¿Por qué la mediana es más robusta que la media aritmética?",
          opciones: {
            a: "Es más fácil de calcular.",
            b: "Representa el valor más frecuente en la distribución.",
            c: "No es afectada por los valores atípicos o extremos de la distribución.",
            d: "Requiere el cálculo de la desviación estándar para su interpretación.",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "La moda es la única medida de tendencia central aplicable a:",
          opciones: {
            a: "Variables cuantitativas continuas (ej. peso o altura).",
            b: "Variables cuantitativas discretas (ej. número de hijos).",
            c: "Variables cualitativas nominales (ej. color favorito).",
            d: "Variables de razón (ej. ingresos).",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "Una tienda vendió 12, 18, 15, 10, 20 unidades en 5 días. ¿Cuál fue la venta promedio diaria?",
          opciones: {
            a: "14 unidades",
            b: "15.5 unidades",
            c: "15 unidades",
            d: "16 unidades",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "¿Cuál par representa las fases cruciales del proceso de Planeación?",
          opciones: {
            a: "Delegación y Liderazgo.",
            b: "Liderazgo y Motivación.",
            c: "Establecimiento de Objetivos y Desarrollo de Estrategias.",
            d: "Reclutamiento y Selección de personal.",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "La Misión de una organización se diferencia de la Visión en que la Misión se enfoca en:",
          opciones: {
            a: "El futuro ideal que se desea alcanzar en el largo plazo.",
            b: "El análisis de la competencia y el entorno externo.",
            c: "La razón de ser actual de la empresa, su propósito central y a qué clientes sirve.",
            d: "Las utilidades financieras que se esperan generar en el siguiente año.",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "Relaciona cada modelo económico aplicado en México con la característica principal que lo definió:",
          tabla: {
            columnas: ["Modelo Económico", "Característica Principal"],
            filas: [
              [
                "1. Modelo Neoliberal (1980s - Actualidad)",
                "A. Énfasis en la industrialización y crecimiento del gasto público mediante endeudamiento.",
              ],
              [
                "2. Modelo de Desarrollo Estabilizador (1950s - 1970s)",
                "B. Inversión extranjera masiva en infraestructura con fuerte desigualdad social y latifundismo.",
              ],
              [
                "3. Modelo de Sustitución de Importaciones (1940s - 1970s)",
                "C. Apertura comercial acelerada, privatización de empresas paraestatales y estabilidad macroeconómica.",
              ],
              [
                "4. Modelo de Desarrollo Compartido (1970s)",
                "D. Crecimiento del PIB sostenido con tasas de inflación bajas y estabilidad del tipo de cambio.",
              ],
              [
                "5. Modelo Económico del Porfiriato (1876-1911)",
                "E. Fuerte intervención estatal, proteccionismo industrial y crecimiento basado en el mercado interno.",
              ],
            ],
          },
          opciones: {
            a: "1-C, 2-D, 3-E, 4-A, 5-B",
            b: "1-A, 2-C, 3-E, 4-D, 5-B",
            c: "1-C, 2-A, 3-B, 4-E, 5-D",
            d: "1-B, 2-D, 3-A, 4-E, 5-C",
          },
          respuesta_correcta: "a",
        },
        {
          pregunta:
            "Relaciona cada variable económica con su definición más precisa:",
          tabla: {
            columnas: ["Variable", "Definición"],
            filas: [
              [
                "1. PIB",
                "A. Indicador que mide el progreso de un país en términos de vida larga, acceso a conocimientos y nivel de vida.",
              ],
              [
                "2. PNB",
                "B. Aumento sostenido y generalizado del nivel de precios de bienes y servicios.",
              ],
              [
                "3. IDH",
                "C. Valor monetario de los bienes producidos por los residentes de un país, sin importar su ubicación geográfica.",
              ],
              [
                "4. Inflación",
                "D. Valor total de los bienes producidos dentro de las fronteras geográficas de un país en un periodo determinado.",
              ],
            ],
          },
          opciones: {
            a: "1-C, 2-D, 3-A, 4-B",
            b: "1-D, 2-A, 3-C, 4-B",
            c: "1-D, 2-C, 3-A, 4-B",
            d: "1-A, 2-B, 3-D, 4-C",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "¿Cuál es el concepto que representa a la persona obligada a contribuir al gasto público (pagar impuestos)?",
          opciones: {
            a: "Sujeto activo (la autoridad fiscal).",
            b: "Sujeto pasivo de la relación tributaria.",
            c: "Exención de impuestos.",
            d: "Gasto social.",
          },
          respuesta_correcta: "b",
        },
        {
          pregunta:
            "Relaciona cada artículo constitucional con su principio clave:",
          tabla: {
            columnas: ["Derecho Constitucional", "Principio Clave"],
            filas: [
              [
                "1. Artículo 3°",
                "A. Derecho a la libertad de imprenta, expresión y asociación, sujeto a la ley.",
              ],
              [
                "2. Artículo 5°",
                "B. El derecho a una educación laica, gratuita, obligatoria y de calidad.",
              ],
              [
                "3. Artículo 14°",
                "C. El derecho de toda persona a dedicarse a la profesión o trabajo lícito.",
              ],
              [
                "4. Artículo 6° y 7°",
                "D. Principio de legalidad y debido proceso: nadie puede ser privado de sus derechos sin juicio previo.",
              ],
            ],
          },
          opciones: {
            a: "1-A, 2-C, 3-B, 4-D",
            b: "1-B, 2-C, 3-D, 4-A",
            c: "1-D, 2-A, 3-B, 4-C",
            d: "1-C, 2-D, 3-A, 4-B",
          },
          respuesta_correcta: "b",
        },
        {
          pregunta: "¿Qué característica principal define el término PyME?",
          opciones: {
            a: "Empresas que cotizan en la bolsa con alto endeudamiento.",
            b: "Empresas con objetivo de expansión internacional y más de 1000 empleados.",
            c: "Organizaciones con un número limitado de empleados definido por legislación específica.",
            d: "Entidades sin fines de lucro dedicadas exclusivamente a la artesanía.",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "¿Cuál describe mejor el fenómeno de la Globalización en el ámbito económico?",
          opciones: {
            a: "El proceso de protección de economías nacionales mediante altas barreras arancelarias.",
            b: "La tendencia de empresas locales a vender solo en su mercado doméstico.",
            c: "Un proceso de creciente interdependencia e integración económica, tecnológica, política y cultural a escala mundial.",
            d: "Un acuerdo bilateral entre dos países para eliminar impuestos.",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta: "¿Qué significa ONG y cuál es su naturaleza?",
          opciones: {
            a: "Organizaciones Generales de Negocios; maximizan rentabilidad de accionistas.",
            b: "Oficinas de Negocios Gubernamentales; gestionan fondos públicos.",
            c: "Organización No Gubernamental; entidad sin fines de lucro con objetivos sociales, humanitarios o ambientales.",
            d: "Organismos Nacionales de Garantía; aseguran préstamos bancarios.",
          },
          respuesta_correcta: "c",
        },
        {
          pregunta:
            "En la gestión empresarial, ¿qué se entiende por Análisis de Riesgos?",
          opciones: {
            a: "El proceso de invertir todo el capital en proyectos de alta volatilidad.",
            b: "La simple eliminación de todas las amenazas identificadas.",
            c: "El proceso sistemático de identificar las amenazas que podrían afectar negativamente los objetivos de un proyecto.",
            d: "Un informe de auditoría anual para certificar estados financieros.",
          },
          respuesta_correcta: "c",
        },
      ],
    },
  ];

  const buildStatements = (p: any): { type: string; data: any } | {} => {
    if (p.enunciados) return { type: "enunciados", data: p.enunciados };
    if (p.tabla) return { type: "tabla", data: p.tabla };
    return {};
  };

  const buildOptions = (
    opciones: Record<string, string>,
    opcionesImagenes: Record<string, string> | undefined,
    respuesta: string,
  ) => {
    const source = opcionesImagenes ?? opciones;
    const isImageOption = !!opcionesImagenes;
    return Object.entries(source).map(([key, value], index) => ({
      label: key.toUpperCase(),
      text: isImageOption ? "" : value,
      imageUrl: isImageOption ? `/tests/images/${value}` : null,
      isCorrect: key.toLowerCase() === respuesta.toLowerCase(),
      order: index + 1,
    }));
  };

  for (const testData of testsData) {
    const test = await prisma.test.create({
      data: {
        title: testData.title,
        description: `Test de conocimientos: ${testData.title}`,
        type: "KNOWLEDGE",
        status: "ACTIVE",
        estimatedMinutes: 20,
        questions: {
          create: testData.preguntas.map((p: any, index: number) => ({
            text: p.pregunta,
            order: index + 1,
            imageUrl: p.imagen_secuencia
              ? `/tests/images/${p.imagen_secuencia}`
              : null,
            statements: buildStatements(p),
            options: {
              create: buildOptions(
                p.opciones ?? {},
                p.opciones_imagenes,
                p.respuesta_correcta,
              ),
            },
          })),
        },
      },
    });
    console.log(`✅ ${test.title} — ${testData.preguntas.length} preguntas`);
  }

  console.log("🎉 Tests de conocimientos insertados");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
