import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, code: string) => {
  await resend.emails.send({
    from: "Rumbo <onboarding@resend.dev>",
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
};

export const sendResetEmail = async (email: string, token: string) => {
  const url = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  await resend.emails.send({
    from: "Rumbo <onboarding@resend.dev>",
    to: email,
    subject: "Recupera tu contraseña en Rumbo",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
        <h2 style="color: #5a1236;">Recuperar contraseña</h2>
        <p>Haz clic en el botón para restablecer tu contraseña:</p>
        <a href="${url}" style="display: inline-block; margin: 16px 0; padding: 12px 24px; background: #5a1236; color: white; border-radius: 8px; text-decoration: none; font-weight: bold;">
          Restablecer contraseña
        </a>
        <p style="color: #888; font-size: 13px;">El link expira en 1 hora. Si no solicitaste esto, ignora este mensaje.</p>
      </div>
    `,
  });
};
