const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTPEmail = async (toEmail, otp, type) => {
  const subjectMap = {
    login: 'SK Group - Admin Login OTP',
    register: 'SK Group - Registration OTP',
    forgot: 'SK Group - Reset Password OTP',
  };

  const bodyMap = {
    login: `Your one-time login code for SK Group admin panel is: <b>${otp}</b>. This code is valid for 10 minutes. If you didn't request this, please ignore this email.`,
    register: `Your registration verification code for SK Group is: <b>${otp}</b>. This code is valid for 10 minutes.`,
    forgot: `Your password reset code for SK Group is: <b>${otp}</b>. This code is valid for 10 minutes. If you didn't request this, please ignore this email.`,
  };

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <div style="text-align: center; border-bottom: 2px solid #f5b51b; padding-bottom: 15px; margin-bottom: 20px;">
        <h1 style="color: #071a33; margin: 0;">SK Group</h1>
        <p style="color: #667085; margin: 5px 0;">Trusted Service • Quality Commitment • Customer First</p>
      </div>
      <div style="padding: 10px 0;">
        <p style="color: #172033; font-size: 16px;">Hello,</p>
        <p style="color: #172033; font-size: 16px;">${bodyMap[type] || bodyMap.login}</p>
        <div style="background-color: #f5f7fa; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0;">
          <span style="font-size: 32px; font-weight: bold; color: #071a33; letter-spacing: 5px;">${otp}</span>
        </div>
        <p style="color: #667085; font-size: 14px;">This OTP will expire in 10 minutes.</p>
        <p style="color: #667085; font-size: 14px;">For any assistance, contact us at our office or email.</p>
      </div>
      <div style="border-top: 1px solid #e0e0e0; padding-top: 15px; text-align: center; color: #667085; font-size: 12px;">
        <p>© ${new Date().getFullYear()} SK Group. All rights reserved.</p>
        <p>Shanti Kunj Cyber Cafe, B-14 Patrakar Nagar, Sector-14, Kankarbagh Patna-20</p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"SK Group" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: subjectMap[type] || 'SK Group OTP Verification',
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP email sent to ${toEmail}`);
    return true;
  } catch (error) {
    console.error('❌ Email send error:', error.message);
    return false;
  }
};

module.exports = { sendOTPEmail };