import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import "dotenv/config";
import authRoutes from "./routes/auth.routes";
import feedRoutes from "./routes/feed.routes";
import userRoutes from "./routes/user.routes";
import testsRoutes from "./routes/tests.routes";
import ticketRoutes from "./routes/ticket.routes";
import forumRoutes from "./routes/forum.routes";
import notificatonRoutes from "./routes/notifications.routes";

// Rate limit general — 100 requests por 15 minutos por IP
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { ok: false, message: "Demasiadas solicitudes, intenta más tarde" },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limit estricto para auth — 10 intentos por 15 minutos
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { ok: false, message: "Demasiados intentos, intenta más tarde" },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limit para creación de contenido — 20 por 15 minutos
const createLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    ok: false,
    message: "Límite de creación alcanzado, intenta más tarde",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();
const PORT = process.env.PORT || 3001;
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);

//limites de solicitudes
app.use(generalLimiter);
app.use("/auth/login", authLimiter);
app.use("/auth/register", authLimiter);
app.use("/auth/forgot-password", authLimiter);
app.use("/feed", createLimiter);
app.use("/tickets", createLimiter);
app.use("/forums/requests", createLimiter);

//rutas y parseadores
app.use(express.json());
app.use(cookieParser());
app.use("/tests", testsRoutes);
app.use("/auth", authRoutes);
app.use("/feed", feedRoutes);
app.use("/users", userRoutes);
app.use("/tickets", ticketRoutes);
app.use("/forums", forumRoutes);
app.use("/notifications", notificatonRoutes);

app.get("/health", (req, res) => {
  res.json({ ok: true, message: "API funcionando" });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo `);
});
