// utils/sendEmail.js
import { emailQueue } from "../Jobs/Queues/email.queues.js";
import {
    accountCreationEmail,
    accountVerifiedEmail,
    loginAlertEmail,
    resendOtpVerificationEmail,
    sendResetPasswordLinkEmail,
} from "../templates/emailTemplates.js";

// Account creation
export const sendAccountCreationEmail = async (user, otp) => {
    await emailQueue.add("accountCreation", {
        to: user.email,
        subject: "Account created successfully",
        html: accountCreationEmail(user),
    });
};

// Account verified
export const sendAccountVerificationEmail = async (user) => {
    await emailQueue.add("accountVerified", {
        to: user.email,
        subject: "🎉 Your PATHLEARN Account Has Been Verified!",
        html: accountVerifiedEmail(user),
    });
};

// Resend OTP
export const sendResendOtp = async (user, code) => {
    await emailQueue.add("resendOtp", {
        to: user.email,
        subject: "PATHLEARN - OTP Verification",
        html: resendOtpVerificationEmail(user, code),
    });
};

// Reset password
export const sendResetPasswordLink = async (user, resetLink) => {
    await emailQueue.add("resetPassword", {
        to: user.email,
        subject: "PATHLEARN - Reset Password",
        html: sendResetPasswordLinkEmail(user, resetLink),
    });
};

// Login alert
export const sendLoginAlertEmail = async (email, loginDetails) => {
    await emailQueue.add("loginAlert", {
        to: email,
        subject: "New Login Detected",
        html: loginAlertEmail(loginDetails),
    });
};
