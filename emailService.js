import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: { rejectUnauthorized: false },
  connectionTimeout: 10000,
  socketTimeout: 20000,
});

export async function sendDeploymentNotification(authorEmail, message) {
  try {
    await transporter.sendMail({
      from: '"Safemystuff" <ssr911999@gmail.com>',
      to: authorEmail,
      subject: 'Deployment Status for Your Recent Push',
      html: message,
    });

    return {
      success: true,
      message: `Deployment notification has been sent to this email: ${authorEmail}.`,
    };
  } catch (error) {
    console.error('Error Occur for recent push:', error);

    if (error.code === 'EENVELOPE') {
      return { success: false, message: 'Invalid email address provided.' };
    }
    return {
      success: false,
      message: 'Failed to send message during deployment. Please try again later.',
    };
  }
}
