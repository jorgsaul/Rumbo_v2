import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  connectionTimeout: 5000,
  greetingTimeout: 5000,
  socketTimeout: 5000,
});

export const sendVerificationEmail = async (email: string, code: string) => {
  try {
    await transporter.sendMail({
      from: `"Rumbo" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Verifica tu cuenta en Rumbo",
      html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
        <h2 style="color: #5a1236;">Bienvenido a Rumbo 🎓</h2>
        <p>Tu código de verificación es:</p>
        <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #5a1236; padding: 16px 0;">
          ${code}
        </div>
        <p style="color: #888; font-size: 13px;">Expira en 15 minutos.</p>
      </div>
    `,
    });
    console.log("Email enviado");
  } catch (error) {
    console.log("Error enviando email, ", error);
  }
};

export const sendResetEmail = async (email: string, token: string) => {
  const url = `${process.env.FRONTEND_URL}/recovery?token=${token}`;
  await transporter.sendMail({
    from: `"Rumbo" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Recupera tu contraseña en Rumbo",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
        <h2 style="color: #5a1236;">Recuperar contraseña</h2>
        <p>Haz clic en el botón para restablecer tu contraseña:</p>
        <a href="${url}" style="display: inline-block; margin: 16px 0; padding: 12px 24px; background: #5a1236; color: white; border-radius: 8px; text-decoration: none; font-weight: bold;">
          Restablecer contraseña
        </a>
        <p style="color: #888; font-size: 13px;">El link expira en 1 hora.</p>
      </div>
    `,
  });
};
