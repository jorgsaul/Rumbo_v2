import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const sendVerificationEmail = async (email: string, code: string) => {
  const msg = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL!,
    subject: "Verifica tu cuenta en Rumbo",
    text: `Tu código de verificación es: ${code}. Expira en 15 minutos.`,
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
  };
  try {
    await sgMail.send(msg);
  } catch (error: any) {
    console.error("❌ Error sendVerificationEmail:", error);
    throw error;
  }
};

export const sendResetEmail = async (email: string, token: string) => {
  const url = `${process.env.FRONTEND_URL}/recovery?token=${token}`;
  try {
    await sgMail.send({
      from: process.env.SENDGRID_FROM_EMAIL!,
      to: email,
      subject: "Recupera tu contraseña en Rumbo",
      text: `Recupera tu contraseña en Rumbo con el siguiente link: ${url}`,
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
  } catch (error: any) {
    console.error("❌ Error sendResetEmail:", error.message);
    throw error;
  }
};
