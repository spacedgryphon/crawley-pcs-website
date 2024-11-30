import sgMail from '@sendgrid/mail';

const apiKey = import.meta.env.VITE_SENDGRID_API_KEY;

if (!apiKey) {
  throw new Error('Missing SendGrid API key');
}

sgMail.setApiKey(apiKey);

export const sendConsultationEmail = async (to: string, name: string, date: string, time: string) => {
  const msg = {
    to,
    from: 'support@nexusrig.com',
    subject: 'Your NexusRig Consultation Confirmation',
    text: `Hi ${name},\n\nYour consultation is scheduled for ${date} at ${time}.\n\nBest regards,\nNexusRig Team`,
    html: `
      <div>
        <h2>Hi ${name},</h2>
        <p>Your consultation is scheduled for <strong>${date}</strong> at <strong>${time}</strong>.</p>
        <p>Best regards,<br>NexusRig Team</p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send confirmation email');
  }
};