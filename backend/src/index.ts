import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import authRoutes from "./routes/auth.routes";
import feedRoutes from "./routes/feed.routes";
import userRoutes from "./routes/user.routes";
import testsRoutes from "./routes/tests.routes";

const app = express();
const PORT = process.env.PORT || 3001;
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/tests", testsRoutes);
app.use("/auth", authRoutes);
app.use("/feed", feedRoutes);
app.use("/users", userRoutes);

app.get("/health", (req, res) => {
  res.json({ ok: true, message: "API funcionando" });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
